# FoloMoney

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Features

*   **Contact Form:** A functional contact form is available at `/contact-us`. This form allows users to send messages directly to a configured email address.

## Setup

### Environment Variables for Contact Form

To enable the email functionality for the contact form, you need to set up environment variables. These variables include SMTP server details and email addresses for sending and receiving messages.

1.  **Create an environment file:**
    *   Copy the example environment file `.env.example` to a new file named `.env` (or `.env.local`).
    ```bash
    cp .env.example .env
    ```
    (Note: `.env` files are ignored by Git, so your credentials will remain private.)

2.  **Fill in your credentials:**
    *   Open the `.env` (or `.env.local`) file and replace the placeholder values with your actual SMTP server details and email addresses. The required variables are listed in `.env.example`.

    *   `EMAIL_HOST`: Your SMTP server hostname (e.g., `smtp.gmail.com`, `smtp.sendgrid.net`).
    *   `EMAIL_PORT`: The port for your SMTP server (e.g., `587` for TLS, `465` for SSL).
    *   `EMAIL_USER`: Your SMTP username.
    *   `EMAIL_PASS`: Your SMTP password.
    *   `CONTACT_FORM_RECIPIENT_EMAIL`: The email address where contact form submissions should be sent.
    *   `EMAIL_FROM_ADDRESS`: The "From" address that will appear on emails sent by the system (e.g., `noreply@yourdomain.com`).

Once these variables are correctly configured, the contact form will be able to send emails.
