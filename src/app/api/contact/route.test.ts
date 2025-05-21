import { POST } from './route'; // Adjust path as needed
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Mock nodemailer
const mockSendMail = jest.fn().mockResolvedValue({}); // Mock successful email send
const mockCreateTransport = jest.fn().mockReturnValue({
  sendMail: mockSendMail,
});
nodemailer.createTransport = mockCreateTransport;

// Mock DOMPurify and JSDOM (if not handled globally or if specific mocks are needed)
// In jest.setup.js or here, you might need to mock JSDOM if 'dompurify' uses it directly in a way Jest doesn't like
// For this example, assuming basic DOMPurify mock or it works in JSDOM env.
jest.mock('dompurify', () => ({
    __esModule: true, // This is important for modules with default exports
    default: (window: any) => ({ // Mock the factory function
        sanitize: (input: string) => input, // Simplistic sanitize mock
    }),
}));


describe('/api/contact POST endpoint', () => {
  // Mock environment variables
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    mockSendMail.mockClear();
    mockCreateTransport.mockClear();

    // Set up required env vars for successful email sending
    process.env.EMAIL_HOST = 'smtp.example.com';
    process.env.EMAIL_PORT = '587';
    process.env.EMAIL_USER = 'testuser';
    process.env.EMAIL_PASS = 'testpass';
    process.env.CONTACT_FORM_RECIPIENT_EMAIL = 'recipient@example.com';
    process.env.EMAIL_FROM_ADDRESS = 'noreply@example.com';
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('should return 200 and send email for a valid submission', async () => {
    const validData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a valid test message with enough characters.',
    };
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Form submitted successfully! Your message has been sent.');
    expect(mockCreateTransport).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: `"Contact Form" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: process.env.CONTACT_FORM_RECIPIENT_EMAIL,
        replyTo: validData.email,
        subject: `New Contact Form Submission from ${validData.name}`,
        text: expect.stringContaining(validData.message),
        html: expect.stringContaining(validData.message.replace(/\n/g, '<br>')),
      })
    );
  });

  it('should return 200 but not send email if email env vars are missing (fallback)', async () => {
    // Unset a required env var for email sending
    delete process.env.EMAIL_HOST;

    const validData = {
      name: 'Test User Fallback',
      email: 'test-fallback@example.com',
      message: 'This is a message for fallback scenario.',
    };
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: { 'Content-Type': 'application/json' },
    });

    const consoleWarnSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error for this test

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Form submitted successfully! (Admin notification pending email setup)');
    expect(mockSendMail).not.toHaveBeenCalled();
    
    consoleWarnSpy.mockRestore();
  });


  const invalidSubmissions = [
    {
      payload: { email: 'test@example.com', message: 'Valid message' },
      expectedErrorField: 'name',
      case: 'missing name',
    },
    {
      payload: { name: 'Test', message: 'Valid message' },
      expectedErrorField: 'email',
      case: 'missing email',
    },
    {
      payload: { name: 'Test', email: 'invalid-email', message: 'Valid message' },
      expectedErrorField: 'email',
      case: 'invalid email format',
    },
    {
      payload: { name: 'Test', email: 'test@example.com', message: 'Short' },
      expectedErrorField: 'message',
      case: 'message too short',
    },
     {
      payload: { name: 'Test', email: 'test@example.com' }, // Missing message
      expectedErrorField: 'message',
      case: 'missing message',
    },
  ];

  invalidSubmissions.forEach(({ payload, expectedErrorField, case: testCase }) => {
    it(`should return 400 for invalid submission: ${testCase}`, async () => {
      const req = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.errors).toBeDefined();
      expect(body.errors[expectedErrorField]).toBeDefined();
      expect(mockSendMail).not.toHaveBeenCalled();
    });
  });

  it('should return 400 for malformed JSON', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: "{malformed json'", // Invalid JSON string
      headers: { 'Content-Type': 'application/json' },
    });
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe('Invalid request body: Malformed JSON.');
    expect(mockSendMail).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should return 500 if email sending fails', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP Error')); // Simulate email sending failure

    const validData = {
      name: 'Test User Error',
      email: 'test-error@example.com',
      message: 'This is a message that should cause an email error.',
    };
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: { 'Content-Type': 'application/json' },
    });
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});


    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.message).toBe('Form submitted, but failed to send email notification. Please contact support.');
    expect(mockSendMail).toHaveBeenCalledTimes(1); // It was called, but it failed
    
    consoleErrorSpy.mockRestore();
  });
});
