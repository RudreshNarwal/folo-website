'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUpRight, PiggyBank, Send, CreditCard, TrendingUp, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  FoloLogo: React.ComponentType<{ size?: 'small' | 'default' | 'large' }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ FoloLogo }) => {
  return (
    <section className="relative pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
      
      {/* Abstract shapes for visual appeal */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-10 animate-pulse-slower"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content - Optimized */}
          <div className="flex-1 text-center lg:text-left animate-slide-up pt-10 lg:pt-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your Money, <span className="text-primary font-bold">Your Way.</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-xl">
              Download FoloMoney today and join thousands managing their money the smart way – with zero fees and powerful tools.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8 max-w-md">
              {['Zero-Fee Transfers', 'Credit Insights', 'Smart Wallet', 'Bill Payments'].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-6 py-6 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-glow-primary hover:-translate-y-1">
                Get Started <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 px-6 py-6 rounded-xl font-medium text-lg transition-all">
                See How It Works
              </Button>
            </div>
            
            {/* Social Proof - Streamlined */}
            <div className="flex items-center mt-8 gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(img => (
                  <Avatar key={img} className="border-2 border-white h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/100?img=${img}`} alt="User" />
                    <AvatarFallback>{img}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-xs">
                <p className="font-medium">25,000+ users</p>
                <div className="flex text-primary text-[10px]">★★★★★ <span className="text-muted-foreground ml-1">4.9</span></div>
              </div>
            </div>
          </div>
          
          {/* Hero Image - Futuristic SVG */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative">
              {/* Stylized background card */}
              <div className="absolute inset-0 bg-card rounded-3xl border border-border/30 shadow-xl transform rotate-3 scale-95 -z-10"></div>
              
              {/* Main card with modern financial UI */}
              <Card className="relative overflow-hidden rounded-3xl border border-primary/20 shadow-2xl animate-float glass">
                <CardContent className="p-8 flex items-center justify-center">
                  {/* Modern Code-Based Financial UI */}
                  <div className="relative w-full h-[420px] overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-30"></div>
                    <div className="absolute top-10 left-10 w-60 h-60 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl animate-pulse-slower"></div>
                    
                    {/* Static Grid Background - CSS only solution */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0070f320_1px,transparent_1px),linear-gradient(to_bottom,#0070f320_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                    
                    {/* Main Content */}
                    <div className="relative h-full flex flex-col justify-center p-6">
                      {/* Main Balance Card */}
                      <div className="w-full max-w-[300px] mx-auto bg-white rounded-2xl shadow-lg p-6 mb-6 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
                        <div className="text-sm text-muted-foreground mb-2">Available Balance</div>
                        <div className="flex items-baseline mb-6">
                          <span className="text-3xl font-bold text-foreground">KES 14,235</span>
                          <span className="text-xl font-medium text-muted-foreground ml-1">.34</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-between">
                          {[
                            { icon: <PiggyBank className="h-4 w-4" />, color: "bg-primary/10 text-primary" },
                            { icon: <Send className="h-4 w-4" />, color: "bg-green-500/10 text-green-500" },
                            { icon: <CreditCard className="h-4 w-4" />, color: "bg-orange-500/10 text-orange-500" },
                            { icon: <TrendingUp className="h-4 w-4" />, color: "bg-purple-500/10 text-purple-500" }
                          ].map((item, i) => (
                            <div 
                              key={i} 
                              className={`w-[65px] h-[65px] rounded-xl ${item.color} flex items-center justify-center cursor-pointer transition-transform hover:scale-105`}
                            >
                              {item.icon}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Feature Cards */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {[
                          { title: "ZERO FEES", desc: "Global transfers", icon: <Send className="h-3.5 w-3.5 text-foreground/70 group-hover:text-primary transition-colors" />, color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200" },
                          { title: "SECURE", desc: "Bank-grade protection", icon: <ShieldCheck className="h-3.5 w-3.5 text-foreground/70 group-hover:text-primary transition-colors" />, color: "bg-gradient-to-br from-purple-50 to-indigo-100 border-indigo-200" },
                          { title: "INSTANT", desc: "Real-time transfers", icon: <TrendingUp className="h-3.5 w-3.5 text-foreground/70 group-hover:text-primary transition-colors" />, color: "bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200" },
                          { title: "GLOBAL", desc: "40+ countries", icon: <TrendingUp className="h-3.5 w-3.5 text-foreground/70 group-hover:text-primary transition-colors" />, color: "bg-gradient-to-br from-amber-50 to-orange-100 border-orange-200" }
                        ].map((item, i) => (
                          <div 
                            key={i} 
                            className={`${item.color} p-4 rounded-xl border shadow-sm backdrop-blur-sm glass transform transition-all duration-300 hover:scale-105 hover:shadow-md group`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 rounded-full bg-white/80 shadow-inner">
                                {item.icon}
                              </div>
                              <div className="font-bold text-xs tracking-wider text-foreground/90 group-hover:text-primary transition-colors">{item.title}</div>
                            </div>
                            <div className="text-xs text-foreground/70 font-medium pl-1">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Activity Animation */}
                      <div className="relative h-[60px] bg-white bg-opacity-50 rounded-xl p-4 flex items-center overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                        <div className="mr-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Activity Feed</div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full animate-pulse-slow" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div className="ml-3 text-xs text-primary font-medium">
                          Live
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-20 -right-6 w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white shadow-glow-primary transform rotate-12 animate-float">
                      <Send className="h-8 w-8" />
                    </div>
                    
                    <div className="absolute bottom-20 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg transform -rotate-12 animate-float" style={{ animationDelay: '2s' }}>
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Decorative Accent */}
              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-glow-primary animate-subtle-pulse">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-16 text-center">
          <p className="text-sm uppercase font-medium text-muted-foreground tracking-wider mb-6">TRUSTED BY LEADING FINANCIAL INSTITUTIONS</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-red-600 font-bold mr-1">DTB</span> 
              <span className="font-medium">Bank</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-medium">VISA</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-medium">Mastercard</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-medium">MPESA</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-medium">TransUnion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 