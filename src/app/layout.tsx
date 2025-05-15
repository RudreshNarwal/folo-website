import type {Metadata} from 'next';
import './globals.css';
// import Header from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";
import { Inter as GeistSans } from 'next/font/google';
import { Roboto_Mono as GeistMono } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Open_Sans } from 'next/font/google';

const geistSans = GeistSans({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = GeistMono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'FoloMoney - Your Money, Your Way',
  description: 'Manage Your Finances Seamlessly with FoloMoney. Digital wallet, credit score monitoring, bill payments, and zero-fee global money transfers—all in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(openSans.variable, geistSans.variable, geistMono.variable, "scroll-smooth")} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* <Header /> */}
          <main>{children}</main>
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
