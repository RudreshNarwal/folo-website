// Optional: extend Jest matchers with jest-dom
require('@testing-library/jest-dom');

// Mock environment variables if your tests depend on them
// process.env.YOUR_VARIABLE = 'your_value';

// Mock Next.js router if needed
// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       route: '/',
//       pathname: '',
//       query: '',
//       asPath: '',
//       push: jest.fn(),
//       events: {
//         on: jest.fn(),
//         off: jest.fn()
//       },
//       beforePopState: jest.fn(() => null),
//       prefetch: jest.fn(() => null)
//     };
//   },
// }));

// Mock Next.js Link component if needed (basic mock)
// jest.mock('next/link', () => {
//   return ({children, href}) => {
//     return <a href={href}>{children}</a>;
//   }
// });

// Mock useToast hook from the application
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(), // Mock the toast function
  }),
}));

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Success' }),
  })
);

// Mock NextRequest and NextResponse
global.Request = class Request {
    constructor(input, init) {
        this.url = input;
        this.method = init?.method || 'GET';
        this.headers = new Headers(init?.headers);
        this.body = init?.body;
        this.json = () => Promise.resolve(this.body ? JSON.parse(this.body) : {});
        // Add other properties/methods as needed by your tests
    }
};

global.Response = class Response {
    constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = new Headers(init?.headers);
        this.ok = this.status >= 200 && this.status < 300;
        // Add other properties/methods as needed by your tests
    }
    async json() { // Instance method to parse the body
      if (this.body === null || typeof this.body === 'undefined') {
        return Promise.resolve({});
      }
      try {
        return Promise.resolve(JSON.parse(this.body));
      } catch (e) {
        return Promise.reject(new Error("Failed to parse JSON body"));
      }
    }
    static json(data, init) {
        const body = JSON.stringify(data);
        const headers = new Headers(init?.headers);
        headers.set('Content-Type', 'application/json');
        return new Response(body, { ...init, headers });
    }
};

// Since NextRequest and NextResponse might extend Request/Response or have static methods
// we can alias them or provide more specific mocks if necessary.
// For now, let's assume NextRequest can be treated as a Request for basic tests.
// If specific Next.js functionalities are used (like `req.nextUrl`), these mocks would need to be more detailed.
const { NextRequest: ActualNextRequest, NextResponse: ActualNextResponse } = require('next/server');

jest.mock('next/server', () => ({
    ...jest.requireActual('next/server'), // Import and retain default exports
    NextRequest: jest.fn().mockImplementation((input, init) => {
        const req = new global.Request(input, init);
        // Add any specific NextRequest properties or methods your tests might use
        // For example, if you use req.nextUrl.searchParams:
        req.nextUrl = {
            searchParams: new URLSearchParams(typeof input === 'string' && input.includes('?') ? input.substring(input.indexOf('?')) : '')
        };
        return req;
    }),
    NextResponse: {
        json: jest.fn().mockImplementation((body, init) => {
            return global.Response.json(body, init);
        }),
        // Add other static methods of NextResponse if needed (e.g., redirect, rewrite)
    },
}));
