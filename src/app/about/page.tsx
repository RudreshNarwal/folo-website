'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Building, Users2, Clock, Heart, Globe, Send, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Header/Navigation */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">FoloMoney</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link href="/about" className="text-foreground font-medium">About</Link>
            <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/" passHref>
              <Button variant="default" size="sm">Download App</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center">
              <Home className="h-3 w-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-foreground">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 transition-colors">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Reimagining Financial Services for Kenya and Beyond</h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              At FoloMoney, we're building a more accessible, affordable, and user-friendly financial ecosystem for everyone.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30 w-[400px] h-[400px] rounded-full bg-accent/30 animate-pulse-slow"></div>
          <div className="absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2 blur-3xl opacity-30 w-[350px] h-[350px] rounded-full bg-primary-foreground/30 animate-pulse-slower"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-3 border-primary text-primary bg-primary/5">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Building Financial Freedom for All Kenyans</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2023, FoloMoney was born from a simple observation: existing financial services in Kenya were too expensive, difficult to access, and didn't meet the needs of everyday people.
              </p>
              <p className="text-muted-foreground mb-6">
                Our founders, who experienced these challenges firsthand, set out to create a financial platform that eliminates unnecessary fees, simplifies money management, and puts the power back in the hands of users.
              </p>
              <div className="flex items-center space-x-6 text-sm font-medium mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>Founded 2023</span>
                </div>
                <div className="flex items-center">
                  <Users2 className="h-5 w-5 text-primary mr-2" />
                  <span>Team of 20+</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-primary mr-2" />
                  <span>Based in Nairobi</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="FoloMoney Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-3 border-secondary text-secondary bg-secondary/5">Our Mission</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Drives Us Forward</h2>
            <p className="text-muted-foreground">
              We're on a mission to make financial services accessible, affordable, and transparent for everyone. Our values guide every decision we make and feature we build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                  <Users2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-muted-foreground">
                  We design every product and service with our users' needs as the top priority. Your financial well-being is our success metric.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Radical Transparency</h3>
                <p className="text-muted-foreground">
                  No hidden fees, no fine print. We believe in complete honesty about our services, costs, and how we make money.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="bg-secondary/10 text-secondary p-3 rounded-lg w-fit mb-4">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation & Impact</h3>
                <p className="text-muted-foreground">
                  We constantly push boundaries to create financial tools that make a real difference in people's lives and communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Partnership */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3 border-primary text-primary bg-primary/5">Strategic Partnership</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Powered by DTB Bank</h2>
              <p className="text-muted-foreground md:text-lg">
                Our strategic partnership with Diamond Trust Bank (DTB) combines our innovative technology with their established banking infrastructure to deliver secure, reliable financial services.
              </p>
            </div>
            
            <div className="bg-card border border-border/40 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full mr-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">What This Means For You</h3>
                  <p className="text-muted-foreground">Bank-grade security with fintech flexibility</p>
                </div>
              </div>
              
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Your funds are secured by the same infrastructure that protects traditional bank accounts</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Seamless integration with existing banking systems for faster transfers</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Compliance with all regulatory requirements to protect your money and data</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Access to a growing network of financial services and features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent via-accent/90 to-primary">
        <div className="container mx-auto px-6 text-center text-accent-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-md">Ready to Join the Future of Finance?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto opacity-90">
            Experience a financial platform built specifically for you, with zero transfer fees and powerful tools at your fingertips.
          </p>
          <Link href="/" passHref>
            <Button size="lg" className="bg-white text-accent hover:bg-white/90 font-semibold rounded-lg px-8 py-3 text-lg shadow-lg transform hover:scale-105 transition-all">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 