// src/app/page.tsx
'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Progress} from '@/components/ui/progress';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {useEffect, useState, useRef} from 'react';
import {getPersonalizedFinancialTips} from '@/ai/flows/personalized-financial-tips';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {
  CheckCircle,
  CreditCard,
  DollarSign,
  Globe,
  HelpCircle,
  PiggyBank,
  Send,
  Smartphone,
  TrendingUp,
  Wallet,
  Zap,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Gift,
  MessageSquare,
  Lock,
  Banknote,
  FileText,
  Clock,
  Sparkles,
  Gauge,
  Receipt,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import {cn} from '@/lib/utils';
import {getExchangeRate} from '@/services/exchange-rate';
import { InteractiveAppShowcaseSVG, InteractiveCreditScoreSVG, InteractiveGlobalTransferSVG } from '@/components/interactive-svgs';
import AppShowcaseLottie from '@/components/animations/AppShowcaseLottie';
import CreditScoreLottie from '@/components/animations/CreditScoreLottie';
import WorldTransferLottie from '@/components/animations/WorldTransferLottie';
import Link from 'next/link';
import { FeatureCardModern } from '@/components/FeatureCardModern';


const TestimonialCard = ({userName, userRole, testimonialText, rating, imageUrl, imageAlt, dataAiHint}: {userName: string, userRole: string, testimonialText: string, rating: number, imageUrl: string, imageAlt: string, dataAiHint?: string }) => (
  <Card className="w-full md:w-[380px] p-6 rounded-xl shadow-xl bg-card flex-shrink-0">
    <CardHeader className="flex flex-row items-center space-y-0 pb-3">
      <Avatar className="h-12 w-12">
        <AvatarImage src={imageUrl} alt={imageAlt} data-ai-hint={dataAiHint}/>
        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="space-y-0.5 ml-4">
        <CardTitle className="text-md font-semibold">{userName}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{userRole}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground leading-relaxed">&quot;{testimonialText}&quot;</p>
      <div className="flex items-center mt-4">
        {Array.from({length: 5}, (_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < rating ? "hsl(var(--primary))" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("w-5 h-5", i < rating ? "text-primary" : "text-muted-foreground/50")}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    </CardContent>
  </Card>
);

const FAQItem = ({question, answer}: { question: string, answer: string}) => (
  <AccordionItem value={question} className="border-b border-border/50">
    <AccordionTrigger className="py-5 text-lg font-medium hover:text-primary transition-colors text-left">{question}</AccordionTrigger>
    <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">{answer}</AccordionContent>
  </AccordionItem>
);

const FeatureCard = ({ icon, title, description, dataAiHint }: { icon: React.ReactNode, title: string, description: string, dataAiHint?: string }) => (
  <Card className="shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 bg-card">
    <CardHeader className="pb-4">
      <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
        {icon}
      </div>
      <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-muted-foreground leading-relaxed">{description}</CardDescription>
    </CardContent>
  </Card>
);

// Simplified Quick Boost Card for the "Coming Soon" section
const ComingSoonCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
 <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 shadow-lg rounded-xl p-6 border border-primary/20 flex flex-col items-center text-center h-full">
    <div className="bg-gradient-to-br from-secondary to-primary text-primary-foreground p-3 rounded-full mb-4 w-fit">
      {icon}
    </div>
    <CardTitle className="text-xl font-semibold text-foreground mb-2">{title}</CardTitle>
    <CardDescription className="text-muted-foreground leading-relaxed flex-grow">{description}</CardDescription>
    <Button variant="outline" className="mt-4 w-full border-primary text-primary hover:bg-primary/10 cursor-not-allowed">
      Join Waitlist
    </Button>
  </Card>
);

// Logo SVG Component
const FoloLogo = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    default: 'w-16 h-16',
    large: 'w-32 h-32'
  };
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className={sizeClasses[size]}
    >
      {/* Background Circle */}
      <circle cx="100" cy="100" r="95" fill="white"/>
      {/* Outer Ring */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#007AFF" strokeWidth="10"/>

      {/* Text "folo" */}
      <text
         x="50%"
         y="46%" 
         fontFamily="'Open Sans', Arial, sans-serif"
         fontSize="72" 
         fontWeight="700"
         fill="#007AFF"
         textAnchor="middle"
         dominantBaseline="central"> 
         folo
      </text>

      {/* Text "MONEY" */}
      <text
         x="50%"
         y="68%" 
         fontFamily="'Open Sans', Arial, sans-serif"
         fontSize="22" 
         fontWeight="400" 
         fill="#007AFF"
         textAnchor="middle"
         letterSpacing="1.5" 
         dominantBaseline="central">
         MONEY
      </text>
    </svg>
  );
};

export default function Home() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [calculatedAmount, setCalculatedAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amountToSend, setAmountToSend] = useState('100');
  const [financialTips, setFinancialTips] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll for header animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Example spending data (replace with actual user data fetching if applicable)
  const spendingData = `
    Date: 2024-05-15, Category: Transport, Amount: KES 500
    Date: 2024-05-18, Category: Food & Drinks, Amount: KES 1200
    Date: 2024-05-20, Category: Airtime, Amount: KES 300
    Date: 2024-05-22, Category: Entertainment, Amount: KES 800
    Date: 2024-05-25, Category: Groceries, Amount: KES 2500
    Date: 2024-05-28, Category: Bills, Amount: KES 3000
    Date: 2024-06-01, Category: Food & Drinks, Amount: KES 1500
    Date: 2024-06-03, Category: Shopping, Amount: KES 1800
  `;

  // Fetch exchange rate (simplified example)
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rateData = await getExchangeRate(fromCurrency, toCurrency);
        setExchangeRate(rateData.rate);
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        setExchangeRate(0.85); // Fallback rate
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Calculate received amount when dependencies change
   useEffect(() => {
    handleCalculate();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountToSend, exchangeRate]);


  const handleCalculate = () => {
    if (exchangeRate && amountToSend) {
      const amount = parseFloat(amountToSend);
      if (!isNaN(amount) && amount > 0) {
        setCalculatedAmount(amount * exchangeRate);
      } else {
        setCalculatedAmount(null);
      }
    } else {
      setCalculatedAmount(null);
    }
  };


  // Fetch personalized financial tips
  useEffect(() => {
    const fetchFinancialTips = async () => {
      try {
        if (spendingData.trim()) {
          const tips = await getPersonalizedFinancialTips({spendingData});
          setFinancialTips(tips.tips);
        } else {
          setFinancialTips("Start transacting to get personalized financial tips!");
        }
      } catch (error)
 {
        console.error("Failed to fetch financial tips:", error);
        setFinancialTips("Could not load financial tips at this time. Please try again later.");
      }
    };
    fetchFinancialTips();
    // No dependency array needed if spendingData is static within the component scope
    // If spendingData were dynamic state, add it to dependency array: [spendingData]
  }, [spendingData]); // Rerun if spendingData changes

  return (
    <div className="font-sans antialiased bg-background text-foreground">
      {/* Modern Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 will-change-transform",
          isScrolled 
            ? "py-3 bg-white/95 shadow-sm backdrop-blur-md border-b border-border/10" 
            : "py-5 bg-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center transition-transform duration-300">
              <div className={cn(
                "transition-all duration-300 ease-in-out transform",
                isScrolled ? "scale-75" : "scale-100"
              )}>
                <FoloLogo size={isScrolled ? "small" : "default"} />
              </div>
              <span className={cn(
                "ml-3 font-semibold text-primary transition-all duration-300",
                isScrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
              )}>
                FoloMoney
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className={cn(
              "hidden md:flex items-center",
              !isScrolled && "opacity-0 pointer-events-none"
            )}>
              <ul className="flex space-x-10">
                {['Features', 'Transfers', 'Security', 'Testimonials', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className={cn(
                        "text-sm font-medium transition-colors relative px-1 py-2",
                        "text-foreground hover:text-primary",
                        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      )}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* CTA Button */}
            <div className="flex items-center">
              <Button 
                className={cn(
                  "rounded-full px-6 font-medium transition-all duration-300 shadow-sm",
                  isScrolled 
                    ? "bg-primary hover:bg-primary-dark text-white" 
                    : "bg-white hover:bg-white/90 text-primary hover:shadow-md"
                )}
              >
                <span className="flex items-center">
                  Download Now 
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M12 17V3" />
                    <path d="m6 11 6 6 6-6" />
                    <path d="M19 21H5" />
                  </svg>
                </span>
              </Button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "md:hidden ml-4 p-2 rounded-md transition-colors", 
                  isScrolled 
                    ? "text-foreground hover:bg-muted" 
                    : "text-foreground/90 hover:bg-white/10"
                )}
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen 
              ? "max-h-[300px] opacity-100 mt-4" 
              : "max-h-0 opacity-0",
            !isScrolled && "hidden"
          )}>
            <div className={cn(
              "rounded-xl p-4 mb-2 transition-all duration-300",
              isScrolled ? "bg-muted/50" : "bg-white/10 backdrop-blur-sm"
            )}>
              <ul className="flex flex-col space-y-3">
                {['Features', 'Transfers', 'Security', 'Testimonials', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-base font-medium text-foreground hover:text-primary transition-colors block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-border/30">
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                    <span className="flex items-center justify-center">
                      Download Now 
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="ml-2 h-4 w-4"
                      >
                        <path d="M12 17V3" />
                        <path d="m6 11 6 6 6-6" />
                        <path d="M19 21H5" />
                      </svg>
                    </span>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section - Modern Redesign */}
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
                      
                      {/* Dynamic Grid Background */}
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-4 p-4">
                        {Array.from({ length: 48 }).map((_, i) => (
                          <div 
                            key={i}
                            className="relative overflow-hidden"
                            style={{ 
                              opacity: Math.random() * 0.07 + 0.03,
                              animationDelay: `${Math.random() * 5}s`,
                              animationDuration: `${Math.random() * 3 + 4}s`
                            }}
                          >
                            <div className="absolute inset-0 bg-primary rounded-md animate-pulse-slow"></div>
                          </div>
                        ))}
                      </div>
                      
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
                            { title: "INSTANT", desc: "Real-time transfers", icon: <Zap className="h-3.5 w-3.5 text-foreground/70 group-hover:text-primary transition-colors" />, color: "bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200" },
                            { title: "GLOBAL", desc: "40+ countries", icon: <Globe className="h-3.5 w-3.5 text-foreground/70 group-hover:text-primary transition-colors" />, color: "bg-gradient-to-br from-amber-50 to-orange-100 border-orange-200" }
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
                        <DollarSign className="h-8 w-8" />
                      </div>
                      
                      <div className="absolute bottom-20 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg transform -rotate-12 animate-float" style={{ animationDelay: '2s' }}>
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Decorative Accent */}
                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-glow-primary animate-subtle-pulse">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Key Offerings Section */}
      <section className="py-20 md:py-28" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5 rounded-full border-primary text-primary bg-primary/5 font-medium">Why FoloMoney?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your All-In-One Financial Hub</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">Experience a complete financial solution designed for today's digital lifestyle. All with <span className="font-semibold text-primary">ZERO transfer fees</span> and ultimate security.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Digital Wallet - Fixed hover animation */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
              <Card className="h-full border border-border/40 bg-white hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover rounded-2xl overflow-hidden backdrop-blur-sm glass will-change-transform">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4">
                  <div className="mb-4 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Wallet className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Smart Digital Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Send and receive money instantly. Top up from your bank account or mobile money. Track all your transactions in real-time with detailed analytics.
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-primary font-medium hover:text-primary-dark hover:bg-transparent group">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Card 2: Bill Payments - Fixed hover animation */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
              <Card className="h-full border border-border/40 bg-white hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover rounded-2xl overflow-hidden backdrop-blur-sm glass will-change-transform">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4">
                  <div className="mb-4 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Receipt className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Effortless Bill Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Pay all your bills from one place - utilities, airtime, subscriptions and more. Set up recurring payments and never miss a due date again.
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-primary font-medium hover:text-primary-dark hover:bg-transparent group">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Card 3: Zero-Fee Global Transfers - Fixed hover animation */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
              <Card className="h-full border border-border/40 bg-white hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover rounded-2xl overflow-hidden backdrop-blur-sm glass will-change-transform">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4">
                  <div className="mb-4 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Globe className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Zero-Fee Global Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Send money worldwide with competitive exchange rates and absolutely NO transfer fees. Fast, secure, and completely transparent.
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-primary font-medium hover:text-primary-dark hover:bg-transparent group">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Card 4: Credit Score Insights - Fixed hover animation */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
              <Card className="h-full border border-border/40 bg-white hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover rounded-2xl overflow-hidden backdrop-blur-sm glass will-change-transform">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4">
                  <div className="mb-4 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Gauge className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Credit Score Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Monitor your credit score in real-time. Get personalized insights and actionable tips to improve your financial health and creditworthiness.
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-primary font-medium hover:text-primary-dark hover:bg-transparent group">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Overview Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5 rounded-full border-primary text-primary bg-primary/5 font-medium">Core Features</Badge>
            
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Smart Money for <span className="text-primary">Smart People</span>
            </h2>
            
              <p className="text-muted-foreground md:text-lg mb-10">
                FoloMoney integrates your entire financial life. Designed for digital natives who want simple, transparent, and fee-free financial tools.
            </p>
              
              <div className="space-y-4">
                {/* Feature 1 */}
                <div className="group">
                  <div className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-xl border border-border/20 bg-white/70 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <div className="w-12 h-12 bg-primary/10 text-primary p-3 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Wallet className="h-6 w-6" />
          </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">Your Secure Wallet</h3>
                      <p className="text-muted-foreground mt-2">Top-up instantly via mobile money or bank transfer. Send money to anyone with a phone number or email.</p>
                      
                      <div className="flex flex-wrap mt-3 gap-2">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">Instant Transfers</Badge>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">Mobile Money</Badge>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">Bank Accounts</Badge>
                      </div>
                    </div>
                  </div>
                </div>
            
                {/* Feature 2 */}
                <div className="group">
                  <div className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-xl border border-border/20 bg-white/70 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <div className="w-12 h-12 bg-primary/10 text-primary p-3 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">Simplified Bill Payments</h3>
                      <p className="text-muted-foreground mt-2">Pay utilities, airtime, and subscriptions from our growing list of billers. Schedule recurring payments.</p>
                      
                      <div className="flex flex-wrap mt-3 gap-2">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">Auto-Pay</Badge>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">Reminders</Badge>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">Payment History</Badge>
                      </div>
                    </div>
                  </div>
          </div>
          
                {/* Feature 3 */}
                <div className="group">
                  <div className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-xl border border-border/20 bg-white/70 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <div className="w-12 h-12 bg-primary/10 text-primary p-3 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Globe className="h-6 w-6" />
              </div>
                <div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">Truly Free Global Transfers</h3>
                      <p className="text-muted-foreground mt-2">Send money internationally with competitive exchange rates and absolutely ZERO transfer fees.</p>
                  
                      <div className="flex flex-wrap mt-3 gap-2">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">Fee-Free</Badge>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">40+ Countries</Badge>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1">Competitive Rates</Badge>
                      </div>
                    </div>
                      </div>
                    </div>
                      </div>
              
              <Button className="mt-10 bg-primary hover:bg-primary-dark text-white rounded-xl px-7 py-6 text-base font-medium transition-all duration-300 hover:shadow-glow-primary hover:-translate-y-1">
                Explore All Features <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
                    </div>
            
            <div className="order-1 md:order-2 relative mb-12 md:mb-0">
              {/* Interactive features visualization - NEW IMPROVED VERSION */}
              <div className="relative max-w-[500px] mx-auto">
                {/* Central hub element */}
                <div className="relative z-20 w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-xl flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <FoloLogo size="small" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse opacity-70"></div>
                </div>
                
                {/* Feature icons in circular arrangement */}
                <div className="relative mx-auto mt-8">
                  <div className="relative h-[400px] w-[400px] mx-auto">
                    {/* Circular connector line */}
                    <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/20"></div>
                    
                    {/* Feature icons positioned around circle */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110">
                      <div className="bg-blue-100 w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:rotate-12 hover:shadow-xl group">
                        <Wallet className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 text-blue-600" />
                        <div className="absolute top-full mt-2 bg-white px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium text-slate-700 border border-slate-200">Smart Wallet</div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110">
                      <div className="bg-indigo-100 w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:rotate-12 hover:shadow-xl group">
                        <Globe className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 text-indigo-600" />
                        <div className="absolute left-auto right-full mr-2 bg-white px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium text-slate-700 border border-slate-200">Global Transfers</div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transition-all duration-500 hover:scale-110">
                      <div className="bg-teal-100 w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:rotate-12 hover:shadow-xl group">
                        <Receipt className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 text-teal-600" />
                        <div className="absolute bottom-full mb-2 bg-white px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium text-slate-700 border border-slate-200">Bill Payments</div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110">
                      <div className="bg-slate-100 w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:rotate-12 hover:shadow-xl group">
                        <Gauge className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 text-slate-600" />
                        <div className="absolute left-full ml-2 bg-white px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium text-slate-700 border border-slate-200">Credit Insights</div>
                      </div>
                    </div>
                    
                    {/* Connector lines from center to each icon */}
                    <div className="absolute top-1/2 left-1/2 w-[150px] h-1.5 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 w-[150px] h-1.5 -translate-y-1/2 bg-gradient-to-l from-indigo-500 to-transparent rotate-180" style={{transformOrigin: 'left center'}}></div>
                    <div className="absolute top-1/2 left-1/2 w-[150px] h-1.5 -translate-y-1/2 bg-gradient-to-r from-teal-500 to-transparent rotate-90" style={{transformOrigin: 'left center'}}></div>
                    <div className="absolute top-1/2 left-1/2 w-[150px] h-1.5 -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent -rotate-90" style={{transformOrigin: 'left center'}}></div>
                    
                    {/* Enhanced animated elements */}
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-slate-200 opacity-60"></div>
                    
                    {/* Data flow dots */}
                    <div className="absolute top-[25%] left-[65%] w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="absolute top-[50%] right-[25%] w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    <div className="absolute bottom-[35%] right-[55%] w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                    <div className="absolute bottom-[50%] left-[25%] w-2 h-2 rounded-full bg-slate-500 animate-pulse"></div>
                    
                    {/* Moving dots from center to features */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full opacity-75 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 rounded-full opacity-75 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-teal-500 rounded-full opacity-75 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-slate-500 rounded-full opacity-75 animate-ping"></div>
                  </div>
                  
                  {/* Info badges */}
                  <div className="absolute top-0 right-0 bg-white border border-gray-200 p-3 rounded-xl shadow-md animate-pulse">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-slate-800">AI Powered</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 bg-white border border-gray-200 p-3 rounded-xl shadow-md animate-pulse">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-teal-500" />
                      <span className="text-sm font-medium text-slate-800">100% Secure</span>
                    </div>
                  </div>
                  
                  {/* Background decoration */}
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-indigo-100/50 to-slate-100/30 rounded-full blur-3xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Score Monitoring Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -left-10 top-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-10 bottom-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Interactive Credit Score Visualization */}
            <div className="relative order-2 md:order-1">
              <div className="relative mx-auto w-full max-w-lg">
                {/* Animated Card */}
                <div className="group relative rounded-3xl p-1 bg-primary/50 animate-border-pulse">
                  <div className="absolute inset-0 bg-primary/20 blur-xl opacity-40 rounded-3xl group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  <Card className="rounded-[calc(1.5rem-1px)] bg-white backdrop-blur-sm overflow-hidden border-0 relative">
                    <CardHeader className="pb-0 pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-6 w-6 text-primary" />
                          <CardTitle className="text-2xl font-bold text-primary">Credit Score</CardTitle>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 py-1">Updated Today</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-6">
                      <div className="flex flex-col items-center">
                        {/* Circular Progress */}
                        <div className="relative mt-4 mb-6">
                          <div className="w-48 h-48 rounded-full bg-muted/60 relative flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="10" 
                                className="text-muted/30" 
                              />
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                fill="none" 
                                stroke="url(#gradientScore)" 
                                strokeWidth="10" 
                                strokeDasharray="283" 
                                strokeDashoffset="71" 
                                className="rotate-90 origin-center transform transition-all duration-1000" 
                              />
                              <defs>
                                <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#0070EA" />
                                  <stop offset="100%" stopColor="#0F61CE" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-5xl font-bold text-primary">750</span>
                              <span className="text-sm text-muted-foreground mt-1">Good</span>
                            </div>
                          </div>
                          
                          {/* Info tooltips around the circle */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 animate-float">
                            <TrendingUp className="h-5 w-5 text-primary" />
                          </div>
                          <div className="absolute bottom-4 right-0 bg-white shadow-lg rounded-full p-2 animate-float" style={{animationDelay: '0.5s'}}>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                        
                        {/* Score details */}
                        <div className="w-full mt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-2">
                            <span>300</span>
                            <span>500</span>
                            <span>700</span>
                            <span>850</span>
                          </div>
                          <Progress value={75} aria-label="Credit score progress indicator: 75%" className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-primary-dark" />
                          <div className="flex justify-between text-xs font-medium mt-2">
                            <span className="text-rose-500">Needs Work</span>
                            <span className="text-amber-500">Fair</span>
                            <span className="text-emerald-500">Good</span>
                            <span className="text-blue-500">Excellent</span>
                          </div>
                        </div>
                        
                        {/* Quick insights */}
                        <div className="grid grid-cols-3 gap-3 w-full mt-8">
                          <div className="bg-primary/5 rounded-lg p-3 text-center hover:bg-primary/10 transition-colors">
                            <div className="text-2xl font-bold text-primary">+15</div>
                            <div className="text-xs text-muted-foreground mt-1">Points Up</div>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-3 text-center hover:bg-primary/10 transition-colors">
                            <div className="text-2xl font-bold text-primary">92%</div>
                            <div className="text-xs text-muted-foreground mt-1">On-time</div>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-3 text-center hover:bg-primary/10 transition-colors">
                            <div className="text-2xl font-bold text-primary">23%</div>
                            <div className="text-xs text-muted-foreground mt-1">Credit Used</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Floating explanation bubbles */}
              <div className="absolute top-0 right-0 bg-white shadow-lg rounded-xl p-3 text-sm border border-primary/20 animate-float">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Updated monthly</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 left-0 bg-white shadow-lg rounded-xl p-3 text-sm border border-primary/20 animate-float" style={{animationDelay: '1.2s'}}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Secure insights</span>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 md:order-2">
              <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5 rounded-full border-primary text-primary bg-primary/5 font-medium">Boost Your Score</Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                <span className="text-primary">Unlock</span> Your Credit Potential
              </h2>
              
              <p className="text-muted-foreground md:text-lg mb-8">
                Your credit score affects your financial future. FoloMoney helps you understand, monitor, and actively improve your score with personalized insights and recommendations.
              </p>
              
              <div className="space-y-5">
                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="bg-primary text-white p-3 rounded-xl">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Real-Time Monitoring</h3>
                    <p className="text-muted-foreground mt-1">Get regular score updates and alerts for significant changes. Know where you stand at all times.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="bg-primary text-white p-3 rounded-xl">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Factor Analysis</h3>
                    <p className="text-muted-foreground mt-1">Understand exactly what's affecting your score with detailed breakdown of key credit factors.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="bg-primary text-white p-3 rounded-xl">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Improvement Tips</h3>
                    <p className="text-muted-foreground mt-1">Get personalized recommendations to boost your score based on your specific credit profile.</p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-10 bg-primary hover:bg-primary-dark text-white rounded-xl px-7 py-6 text-base font-medium transition-all duration-300 hover:shadow-glow-primary hover:-translate-y-1 group">
                Check Your Score <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* International Transfers Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-muted/30" id="transfers">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5 rounded-full border-primary text-primary bg-primary/5 font-medium">Go Global - Fee Free!</Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Send Money Worldwide, <span className="text-primary">Zero Fees</span>
              </h2>
              
              <p className="text-muted-foreground md:text-lg mb-8">
                Why pay fees to send money abroad? FoloMoney offers fast, secure international transfers with competitive rates and <span className="font-semibold text-primary">absolutely NO transfer fees!</span>
              </p>
              
              {/* Interactive Currency Exchange Calculator */}
              <div className="relative p-[1px] rounded-2xl bg-primary/30 animate-border-pulse shadow-lg">
                <Card className="rounded-[calc(1rem-1px)] glass backdrop-blur-sm border-0">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-6 w-6 text-primary" /> 
                      <CardTitle className="text-xl text-foreground">Quick Transfer Calculator</CardTitle>
                    </div>
                    <CardDescription>Calculate rates with 0% transfer fees</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="relative group">
                      <Label htmlFor="amount" className="text-sm font-medium mb-1.5 block text-foreground">You Send</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          id="amount" 
                          value={amountToSend} 
                          onChange={(e) => setAmountToSend(e.target.value)} 
                          placeholder="e.g., 10000" 
                          className="pr-20 h-14 text-lg rounded-xl border-primary/20 focus:border-primary focus:ring-primary/20 transition-all duration-300" 
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Select value={fromCurrency} onValueChange={setFromCurrency}>
                            <SelectTrigger id="fromCurrency" className="border-0 bg-transparent w-16 h-8 p-0 text-base font-medium hover:text-primary focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="KES"><span className="mr-2 text-lg" role="img" aria-label="Kenyan flag">🇰🇪</span> KES</SelectItem>
                              <SelectItem value="USD"><span className="mr-2 text-lg" role="img" aria-label="United States flag">🇺🇸</span> USD</SelectItem>
                              <SelectItem value="GBP"><span className="mr-2 text-lg" role="img" aria-label="United Kingdom flag">🇬🇧</span> GBP</SelectItem>
                              <SelectItem value="UGX"><span className="mr-2 text-lg" role="img" aria-label="Ugandan flag">🇺🇬</span> UGX</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="h-[2px] w-0 group-hover:w-full bg-primary transition-all duration-500 mt-0.5"></div>
                    </div>
                    
                    {/* Currency swap button */}
                    <div className="relative flex justify-center">
                      <div className="absolute left-1/2 -translate-x-1/2 -mt-3 z-10">
                        <button 
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-md" 
                          onClick={() => {
                            const temp = fromCurrency;
                            setFromCurrency(toCurrency);
                            setToCurrency(temp);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 10l5 5 5-5"/>
                            <path d="M17 4l-5-5-5 5"/>
                          </svg>
                        </button>
                      </div>
                      <div className="w-full h-px bg-border/50"></div>
                    </div>
                    
                    <div className="relative group">
                      <Label htmlFor="toCurrency" className="text-sm font-medium mb-1.5 block text-foreground">Recipient Gets</Label>
                      <div className="relative bg-muted/30 rounded-xl p-4">
                        <div className="text-2xl font-bold text-primary">
                          {calculatedAmount !== null ? calculatedAmount.toFixed(2) : '0.00'} {toCurrency}
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Select value={toCurrency} onValueChange={setToCurrency}>
                            <SelectTrigger id="toCurrency" className="border-0 bg-transparent w-16 h-8 p-0 text-base font-medium hover:text-primary focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="EUR"><span className="mr-2 text-lg" role="img" aria-label="European Union flag">🇪🇺</span> EUR</SelectItem>
                              <SelectItem value="USD"><span className="mr-2 text-lg" role="img" aria-label="United States flag">🇺🇸</span> USD</SelectItem>
                              <SelectItem value="CAD"><span className="mr-2 text-lg" role="img" aria-label="Canadian flag">🇨🇦</span> CAD</SelectItem>
                              <SelectItem value="GBP"><span className="mr-2 text-lg" role="img" aria-label="United Kingdom flag">🇬🇧</span> GBP</SelectItem>
                              <SelectItem value="KES"><span className="mr-2 text-lg" role="img" aria-label="Kenyan flag">🇰🇪</span> KES</SelectItem>
                              <SelectItem value="UGX"><span className="mr-2 text-lg" role="img" aria-label="Ugandan flag">🇺🇬</span> UGX</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Exchange rate and fee information */}
                    {exchangeRate !== null && (
                      <div className="p-4 bg-primary/5 rounded-xl">
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                          <span>Exchange Rate</span>
                          <span className="font-semibold text-foreground">1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                          <span>Transfer Fee</span>
                          <span className="font-semibold text-primary">FREE</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>Delivery Time</span>
                          <span className="font-semibold text-foreground">Instant Transfers</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <Button 
                      disabled={!calculatedAmount} 
                      className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl h-14 text-base font-medium transition-all duration-300 hover:shadow-glow-primary hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none group"
                    >
                      Initiate Transfer <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            {/* Right side - Illustration and animations */}
            <div className="order-1 md:order-2 relative">
              <div className="relative mx-auto">
                {/* Main illustration/animation */}
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className="animate-float">
                    <WorldTransferLottie className="w-full h-full scale-110" />
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 left-10 bg-white shadow-lg rounded-full p-3 animate-float">
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="absolute top-1/4 right-0 bg-white shadow-lg rounded-xl p-3 text-sm border border-primary/20 animate-float" style={{animationDelay: '0.8s'}}>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">40+ Countries</span>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/4 bottom-10 bg-white shadow-lg rounded-xl p-3 text-sm border border-primary/20 animate-float" style={{animationDelay: '1.5s'}}>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span className="font-medium text-foreground">Instant Transfers</span>
                    </div>
                  </div>
                  
                  {/* "0% Fee" badge */}
                  <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-6 rounded-full shadow-glow-primary animate-pulse-slow">
                    <div className="text-center">
                      <div className="text-2xl font-bold">0%</div>
                      <div className="text-xs font-medium">FEES</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Countries supported */}
          <div className="mt-16 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-6">SUPPORTED COUNTRIES INCLUDE</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="rounded-full px-4 py-2 text-sm bg-white border-primary/20 hover:border-primary/40 transition-colors">
                <span className="mr-2" role="img" aria-label="Kenya flag">🇰🇪</span> Kenya
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 text-sm bg-white border-primary/20 hover:border-primary/40 transition-colors">
                <span className="mr-2" role="img" aria-label="USA flag">🇺🇸</span> USA
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 text-sm bg-white border-primary/20 hover:border-primary/40 transition-colors">
                <span className="mr-2" role="img" aria-label="UK flag">🇬🇧</span> UK
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 text-sm bg-white border-primary/20 hover:border-primary/40 transition-colors">
                <span className="mr-2" role="img" aria-label="Uganda flag">🇺🇬</span> Uganda
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 text-sm bg-white border-primary/20 hover:border-primary/40 transition-colors">
                <span className="mr-2" role="img" aria-label="EU flag">🇪🇺</span> Europe
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 text-sm bg-white border-primary/20 hover:border-primary/40 transition-colors">
                <span className="mr-2" role="img" aria-label="Canada flag">🇨🇦</span> Canada
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 text-sm bg-white border-primary/20 hover:border-primary/40 transition-colors">
                <span className="mr-2" role="img" aria-label="Australia flag">🇦🇺</span> Australia
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 text-sm bg-white border-primary/20 hover:border-primary/40 transition-colors">
                <span className="mr-2" role="img" aria-label="More">+</span> 30+ more
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 md:py-28 relative overflow-hidden" id="security">
        <div className="absolute inset-0 bg-primary/5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5 rounded-full border-primary text-primary bg-primary/5 font-medium">Bank-Grade Security</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Your Security, <span className="text-primary">Our Priority</span>
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              We implement industry-leading security measures to protect your funds and personal data. Powered by our partnership with DTB Bank.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="group relative">
              <div className="h-full relative p-[1px] rounded-2xl bg-primary/5">
                <div className="bg-white rounded-2xl glass p-8 h-full flex flex-col items-center text-center group-hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-border/50">
                  <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    <Lock className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">End-to-End Encryption</h3>
                  <p className="text-muted-foreground">Your data is encrypted in transit and at rest. We use industry-standard protocols to protect your information from unauthorized access.</p>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="group relative">
              <div className="h-full relative p-[1px] rounded-2xl bg-primary/5">
                <div className="bg-white rounded-2xl glass p-8 h-full flex flex-col items-center text-center group-hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-border/50">
                  <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">Banking Standards</h3>
                  <p className="text-muted-foreground">We adhere to strict banking security protocols and industry best practices to ensure the integrity of our platform.</p>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="group relative">
              <div className="h-full relative p-[1px] rounded-2xl bg-primary/5">
                <div className="bg-white rounded-2xl glass p-8 h-full flex flex-col items-center text-center group-hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-border/50">
                  <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    <Banknote className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">Powered by DTB Bank</h3>
                  <p className="text-muted-foreground">Our infrastructure is built on the reliable and secure framework of DTB Bank, providing enterprise-level security for all users.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Extra security features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white shadow-sm rounded-xl p-6 border border-border/40 flex items-start gap-4 hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <div className="bg-primary/10 text-primary p-3 rounded-xl">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Biometric Authentication</h4>
                <p className="text-muted-foreground">Use face recognition or fingerprint scanning to access your account safely and quickly.</p>
              </div>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl p-6 border border-border/40 flex items-start gap-4 hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <div className="bg-primary/10 text-primary p-3 rounded-xl">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Transaction Alerts</h4>
                <p className="text-muted-foreground">Receive instant notifications for all account activities so you're always in control.</p>
              </div>
            </div>
          </div>
          
          {/* Security badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full py-3 px-6 shadow-lg border border-primary/20 animate-subtle-pulse">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-medium">PCI DSS Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Financial Tips Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5 rounded-full border-primary text-primary bg-primary/5 font-medium">AI-Powered Insights</Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Your Personal <span className="text-primary">Finance Coach</span>
              </h2>
              
              <p className="text-muted-foreground md:text-lg mb-8">
                FoloMoney's AI analyzes your spending patterns to provide personalized recommendations. Save more, spend wisely, and reach your financial goals faster.
              </p>
              
              {/* Key benefits */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Spending Analysis</h3>
                    <p className="text-muted-foreground">Get a clear breakdown of where your money goes and identify spending patterns.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <PiggyBank className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Smart Saving Recommendations</h3>
                    <p className="text-muted-foreground">Receive personalized tips on how to save money based on your unique spending habits.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Financial Goal Planning</h3>
                    <p className="text-muted-foreground">Set and track your financial goals with AI-guided steps to achieve them faster.</p>
                  </div>
                </div>
              </div>
              
              <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-glow-primary hover:-translate-y-1 group">
                Get Personalized Insights <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* AI Insights Visualization */}
            <div className="relative">
              {/* Card with mock AI insights - Using simplified styling */}
              <div className="relative p-[1px] rounded-3xl bg-primary/30 shadow-xl hidden md:block">
                <Card className="rounded-[calc(1.5rem-1px)] glass backdrop-blur-sm border-0 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                  
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-gradient p-2 rounded-lg text-white">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <CardTitle>Smart Insights</CardTitle>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Updated Today</Badge>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-8">
                      {/* Spending breakdown */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <span>This Month's Spending</span>
                          <Badge variant="outline" className="ml-2">
                            <TrendingUp className="h-3.5 w-3.5 mr-1 text-emerald-500" /> 
                            <span className="text-xs">15% saved</span>
                          </Badge>
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white shadow-sm rounded-lg p-4 border border-border/30">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                <span className="text-sm font-medium">Food & Dining</span>
                              </div>
                              <span className="text-sm font-bold">KES 2,700</span>
                            </div>
                            <Progress value={32} className="h-1.5 [&>div]:bg-primary" />
                            <p className="text-xs text-muted-foreground mt-2">32% of total</p>
                          </div>
                          
                          <div className="bg-white shadow-sm rounded-lg p-4 border border-border/30">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                <span className="text-sm font-medium">Transport</span>
                              </div>
                              <span className="text-sm font-bold">KES 1,800</span>
                            </div>
                            <Progress value={21} className="h-1.5 [&>div]:bg-blue-400" />
                            <p className="text-xs text-muted-foreground mt-2">21% of total</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* AI tips */}
                      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary p-2 rounded-lg text-white flex-shrink-0 mt-1">
                            <PiggyBank className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-primary mb-1">Money-Saving Opportunity</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              Based on your spending, switching to our discounted airtime bundle could save you ~KES 90 monthly. Your entertainment costs are up 15% from last month - consider using our "Goals" feature to budget this category.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional insight */}
                      <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-border/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Your consistent bill payments are helping your credit score</p>
                            <p className="text-xs text-muted-foreground">Check your improved score in the Credit Insights tab</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 bg-white shadow-lg rounded-full p-3 animate-float">
                <div className="bg-primary-gradient p-1.5 rounded-full text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-full p-3 animate-float" style={{animationDelay: '1s'}}>
                <div className="bg-primary-gradient p-1.5 rounded-full text-white">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
       <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
             <Badge variant="outline" className="mb-3 text-sm px-3 py-1 rounded-full border-secondary text-secondary bg-secondary/10 font-medium">Coming Soon</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Exciting Features on the Horizon</h2>
            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">We're always working to make FoloMoney even better. Here's a sneak peek at what's next!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
             {/* Quick Boost Card */}
            <ComingSoonCard
              icon={<Sparkles className="h-8 w-8" />}
              title="Quick Boost"
              description="Need a small, short-term financial boost? Access funds quickly based on your activity. Transparent terms, easy repayment."
            />
             {/* Add other planned features here if needed */}
            <ComingSoonCard
              icon={<PiggyBank className="h-8 w-8" />}
              title="Savings Goals"
              description="Set and track your savings goals directly within the app. Visualize your progress and stay motivated."
            />
             <ComingSoonCard
              icon={<FileText className="h-8 w-8" />}
              title="Budgeting Tools"
              description="Take control of your spending with intuitive budgeting features. Categorize expenses and monitor your cash flow."
            />
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-16 md:py-24" id="testimonials"> {/* Changed ID from pricing to testimonials */}
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
             <Badge variant="secondary" className="mb-3 text-sm px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-medium">Community Love</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Hear From Nairobi's GenZ</h2>
            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">See why young Nairobians are choosing FoloMoney for smarter, simpler finance.</p>
          </div>
          <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted">
            <TestimonialCard
              userName="Wanjiru K."
              userRole="Graphic Design Intern"
              testimonialText="FoloMoney is perfect! Managing my small cash and sending money to family is so easy and FREE. Love the simple design."
              rating={5}
              imageUrl="https://picsum.photos/seed/wanjiru/100/100"
              imageAlt="Wanjiru K."
              dataAiHint="young kenyan woman"
            />
            <TestimonialCard
              userName="Brian O."
              userRole="Tech Support Analyst"
              testimonialText="Finally, a finance app that gets it. The credit score feature actually makes sense. And zero fees on transfers? Unbeatable."
              rating={5}
              imageUrl="https://picsum.photos/seed/brian/100/100"
              imageAlt="Brian O."
              dataAiHint="young kenyan man"
            />
            <TestimonialCard
              userName="Fatuma A."
              userRole="Online Store Owner"
              testimonialText="Getting payments from clients abroad used to cost me so much. FoloMoney is a game-changer - seamless and actually free!"
              rating={4}
              imageUrl="https://picsum.photos/seed/fatuma/100/100"
              imageAlt="Fatuma A."
              dataAiHint="woman entrepreneur"
            />
             <TestimonialCard
              userName="Sammy G."
              userRole="Content Creator"
              testimonialText="Easy to manage my earnings and pay for stuff online. The app is quick, looks cool, and the zero fees are clutch."
              rating={5}
              imageUrl="https://picsum.photos/seed/sammy/100/100"
              imageAlt="Sammy G."
              dataAiHint="man creative"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
           <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-3 text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-medium">Got Questions?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">We've Got Answers</h2>
            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">Find quick answers to common questions about FoloMoney.</p>
          </div>
          <Accordion type="single" collapsible className="w-full bg-card p-4 md:p-6 rounded-xl shadow-md border border-border/30">
            <FAQItem
              question="Is FoloMoney secure to use?"
              answer="Yes! Security is fundamental. We use bank-grade encryption (like DTB Bank), secure protocols, and continuous monitoring to protect your account and data. Your trust is our priority."
            />
             <FAQItem
              question="How do I add money (top-up) my wallet?"
              answer="It's easy! You can securely link your DTB bank account for direct top-ups, or use popular mobile money services. We're always working on adding more convenient options."
            />
            <FAQItem
              question="Are international money transfers really FREE?"
              answer="Absolutely! FoloMoney charges ZERO transfer fees for sending money globally. You benefit from competitive exchange rates without hidden costs. It's that simple."
            />
            <FAQItem
              question="How does the Credit Score Monitoring work?"
              answer="We partner to provide regular updates to your credit score directly in the app. You'll see key factors influencing your score and get personalized, practical tips to help improve it over time."
            />
            <FAQItem
              question="Can I pay all my bills with FoloMoney?"
              answer="We have a growing directory of billers, starting with DTB-related payments and expanding to include major utilities, airtime providers, and more. You can manage, pay, and even schedule payments all within the app."
            />

          </Accordion>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-lg border-primary text-primary hover:bg-primary/10 transform hover:scale-105 transition-transform">
              <MessageSquare className="mr-2 h-5 w-5" /> Need More Help? Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Updated with light background */}
      <section className="py-20 md:py-32 bg-white border-t border-border/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Ready to Simplify<br/>Your Finances?
              </h2>
              <p className="text-lg mb-10 text-muted-foreground max-w-lg">
                Download FoloMoney today and join the growing community managing their money the smart way – with zero transfer fees and powerful tools at their fingertips!
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10 max-w-md">
                <div className="flex items-center gap-3">
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
                  <span className="text-sm md:text-base font-medium text-foreground">Zero-Fee Transfers</span>
                </div>
                <div className="flex items-center gap-3">
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
                  <span className="text-sm md:text-base font-medium text-foreground">Credit Insights</span>
                </div>
                <div className="flex items-center gap-3">
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
                  <span className="text-sm md:text-base font-medium text-foreground">Smart Wallet</span>
                </div>
                <div className="flex items-center gap-3">
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
                  <span className="text-sm md:text-base font-medium text-foreground">Bill Payments</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href="#" className="inline-block no-underline">
                  <img 
                    src="/badge-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-12 w-auto"
                  />
                </a>
                <a href="#" className="inline-block no-underline">
                  <img 
                    src="/badge-google-play.svg" 
                    alt="Get it on Google Play" 
                    className="h-12 w-auto"
                  />
                </a>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Available on iOS and Android.
              </p>
            </div>
            
            {/* Phone mockup - now with darker phone for contrast */}
            <div className="flex-1 flex justify-end">
              <div className="relative w-72 md:w-80 lg:w-96 mx-auto md:mx-0">
                {/* Phone frame */}
                <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-[14px] border-[#121212] bg-[#121212] shadow-xl">
                  {/* Phone screen */}
                  <div className="aspect-[9/19] overflow-hidden rounded-[2rem] bg-white">
                    {/* App UI - Security shield mockup */}
                    <div className="relative h-full w-full bg-gradient-to-b from-white to-primary/5 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 opacity-80"></div>
                      <div className="relative z-10 flex flex-col items-center justify-center p-6">
                        <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-lg">
                          <FoloLogo size="default" />
                        </div>
                        <div className="w-full bg-white rounded-lg p-4 shadow-lg mb-6">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              <Banknote className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium text-foreground">Folo Wallet</span>
                          </div>
                          <div className="h-2 bg-primary/20 rounded-full w-3/4 mb-2"></div>
                          <div className="h-2 bg-primary/20 rounded-full w-1/2"></div>
                        </div>
                        <div className="w-full bg-white shadow-lg rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">Send Money</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-600">Secure</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-1/4 -left-6 w-12 h-12 bg-primary rounded-full shadow-lg"></div>
                <div className="absolute bottom-1/3 -right-4 w-20 h-20 bg-primary rounded-full shadow-lg opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Footer */}
      <footer className="py-12 bg-foreground text-background/70" id="about">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-semibold text-background/90 mb-3">Product</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#transfers" className="hover:text-primary transition-colors">Global Transfers</a></li>
                <li><a href="#security" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Download App</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-background/90 mb-3">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-primary transition-colors">About FoloMoney</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-background/90 mb-3">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-background/90 mb-3">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} FoloMoney Technologies Ltd. All rights reserved.</p>
             <p className="mt-2 md:mt-0 text-xs opacity-80">Powered in partnership with DTB Bank.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {/* Add social media links here if available */}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
