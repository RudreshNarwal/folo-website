import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }).min(1, { message: "Email is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

import nodemailer from 'nodemailer';

// Create a DOMPurify instance using JSDOM window
const window = new JSDOM('').window;
const purify = DOMPurify(window);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, message } = validationResult.data;

    // Sanitize inputs
    const sanitizedName = purify.sanitize(name);
    const sanitizedEmail = purify.sanitize(email); // Email usually doesn't contain HTML, but good practice
    const sanitizedMessage = purify.sanitize(message);

    if (sanitizedName !== name || sanitizedEmail !== email || sanitizedMessage !== message) {
        // If sanitization changed any input, it implies potentially malicious HTML was present.
        // For this basic setup, we can consider it a bad request or handle it more gracefully.
        // Here, we'll just log it and proceed with sanitized data, but in a real app,
        // you might want to reject if, for example, name or email are heavily altered.
        console.warn("Input sanitization altered the original data. Original:", {name, email, message}, "Sanitized:", {sanitizedName, sanitizedEmail, sanitizedMessage});
    }


    // Email sending logic
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, CONTACT_FORM_RECIPIENT_EMAIL, EMAIL_FROM_ADDRESS } = process.env;

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !CONTACT_FORM_RECIPIENT_EMAIL || !EMAIL_FROM_ADDRESS) {
      console.error("Email configuration is incomplete. Please check environment variables.");
      // Fallback: Log to console instead of sending email if not configured for local dev without real SMTP
      // In a production environment, you might want to return an error or have a more robust notification system.
      console.log("Contact form submission (email not sent due to missing config):", {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
      });
      // Return success to the client as the data was processed, but notify admin about email config
      return NextResponse.json({
        message: "Form submitted successfully! (Admin notification pending email setup)",
        data: { name: sanitizedName, email: sanitizedEmail, message: sanitizedMessage }
      }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT, 10),
      secure: parseInt(EMAIL_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${EMAIL_FROM_ADDRESS}>`,
      to: CONTACT_FORM_RECIPIENT_EMAIL,
      replyTo: sanitizedEmail,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      text: `You have received a new message from your website contact form.\n\nHere are the details:\nName: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage:\n${sanitizedMessage}`,
      html: `<p>You have received a new message from your website contact form.</p>
             <p><strong>Name:</strong> ${sanitizedName}</p>
             <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
             <p><strong>Message:</strong></p>
             <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({
        message: "Form submitted successfully! Your message has been sent.",
        data: { name: sanitizedName, email: sanitizedEmail, message: sanitizedMessage }
      }, { status: 200 });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return NextResponse.json({ message: "Form submitted, but failed to send email notification. Please contact support." }, { status: 500 });
    }

  } catch (error) {
    console.error("Error processing contact form:", error);
    if (error instanceof SyntaxError) { // JSON parsing error
        return NextResponse.json({ message: "Invalid request body: Malformed JSON." }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
