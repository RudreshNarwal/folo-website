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
import {useEffect, useState} from 'react';
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
} from 'lucide-react';
import {cn} from '@/lib/utils';
import {getExchangeRate} from '@/services/exchange-rate';
import { InteractiveAppShowcaseSVG, InteractiveCreditScoreSVG, InteractiveGlobalTransferSVG } from '@/components/interactive-svgs';
import AppShowcaseLottie from '@/components/animations/AppShowcaseLottie';
import CreditScoreLottie from '@/components/animations/CreditScoreLottie';
import WorldTransferLottie from '@/components/animations/WorldTransferLottie';
import Link from 'next/link';


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
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < rating ? "hsl(var(--accent))" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("w-5 h-5", i < rating ? "text-accent" : "text-muted-foreground/50")}>
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


export default function Home() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [calculatedAmount, setCalculatedAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amountToSend, setAmountToSend] = useState('100');
  const [financialTips, setFinancialTips] = useState('');

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
      {/* Hero Section */}
      <section className="relative py-28 md:py-40 bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
            Your Money, <span className="text-accent">Your Way.</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Manage your finances effortlessly with FoloMoney. Your secure digital wallet for instant payments, bill management, <span className="font-bold text-accent">ZERO-FEE</span> global transfers, and credit insights - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get FoloMoney <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent/10 font-semibold rounded-lg px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-1/3 left-0 w-full h-2/3 bg-background rounded-t-full_to_flat_bottom opacity-20" style={{ borderRadius: '50% 50% 0 0 / 100px 100px 0 0' }}></div>
         <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30 w-[400px] h-[400px] rounded-full bg-accent/30 animate-pulse-slow"></div>
          <div className="absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2 blur-3xl opacity-30 w-[350px] h-[350px] rounded-full bg-primary-foreground/30 animate-pulse-slower"></div>
        </div>
      </section>

      {/* Why Choose Us / Key Offerings Section */}
      <section className="py-16 md:py-24" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="secondary" className="mb-3 text-sm px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-medium">Why FoloMoney?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your All-In-One Financial Hub</h2>
            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">Simplify your life. FoloMoney brings your essential financial tools together with transparency and <span className="font-semibold text-accent">ZERO transfer fees</span>.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Wallet className="h-7 w-7" />} title="Smart Digital Wallet" description="Securely store funds, top-up easily, and send money instantly to other users." dataAiHint="digital payment" />
            <FeatureCard icon={<Receipt className="h-7 w-7" />} title="Effortless Bill Pay" description="Manage and pay bills from utilities to airtime in one place. Schedule payments & get reminders." dataAiHint="utility payment" />
            <FeatureCard icon={<Globe className="h-7 w-7" />} title="Zero-Fee Global Reach" description="Send money worldwide with competitive rates and absolutely NO transfer fees." dataAiHint="international money" />
            <FeatureCard icon={<Gauge className="h-7 w-7" />} title="Credit Score Insights" description="Monitor your score, understand key factors, and get tips to improve your financial health." dataAiHint="credit check" />
          </div>
        </div>
      </section>

      {/* Detailed Features Overview Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-3 text-sm px-3 py-1 rounded-full border-primary text-primary bg-primary/10 font-medium">Core Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Manage Everything Seamlessly</h2>
              <p className="text-muted-foreground md:text-lg mb-8">
                FoloMoney integrates your financial life. Top up, transfer, pay bills, and track your credit – all with intuitive design and zero friction.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full mt-1 flex-shrink-0"><Wallet className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Your Secure Wallet</h3>
                    <p className="text-muted-foreground text-sm">Store funds safely. Top-up via DTB bank accounts or mobile money. Send instant P2P transfers to friends on FoloMoney. View detailed transaction history.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                   <div className="bg-primary text-primary-foreground p-2 rounded-full mt-1 flex-shrink-0"><FileText className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Simplified Bill Payments</h3>
                    <p className="text-muted-foreground text-sm">Pay utilities, airtime, and more from our growing list of billers. Schedule payments, get reminders, and track payment history easily.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full mt-1 flex-shrink-0"><Send className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Truly Free Global Transfers</h3>
                    <p className="text-muted-foreground text-sm">Send money internationally with competitive exchange rates and absolutely ZERO transfer fees. Fast, secure, and transparent.</p>
                  </div>
                </div>
              </div>
              <Button className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-7 py-3 transform hover:scale-105 transition-transform">
                Explore FoloMoney <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden flex items-center justify-center group">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-gradient-slow"></div>
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
              
              {/* Glowing accent borders */}
              <div className="absolute inset-0 rounded-3xl border border-primary/20 shadow-[0_0_15px_rgba(0,91,192,0.15)] group-hover:shadow-[0_0_25px_rgba(0,91,192,0.25)] transition-all duration-700"></div>
              
              {/* Floating animation wrapper */}
              <div className="transform transition-transform duration-1000 ease-in-out animate-float">
                <AppShowcaseLottie className="w-full h-full scale-110 md:scale-125" />
              </div>
              
              {/* Interactive floating elements */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20px] transition-all duration-500 shadow-lg text-sm font-medium">
                Explore the app
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Score Monitoring Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden flex items-center justify-center group order-last md:order-first">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/5 animate-gradient-slow"></div>
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
            
            {/* Glowing accent borders */}
            <div className="absolute inset-0 rounded-3xl border border-secondary/20 shadow-[0_0_15px_rgba(123,54,206,0.15)] group-hover:shadow-[0_0_25px_rgba(123,54,206,0.25)] transition-all duration-700"></div>
            
            {/* Floating animation wrapper */}
            <div className="transform transition-transform duration-1000 ease-in-out animate-float">
              <CreditScoreLottie className="w-full h-full scale-110 md:scale-125" />
            </div>
          </div>
          <div className="md:pl-8">
            <Badge variant="outline" className="mb-3 text-sm px-3 py-1 rounded-full border-secondary text-secondary bg-secondary/10 font-medium">Boost Your Score</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Unlock Your Credit Potential</h2>
            <p className="text-muted-foreground md:text-lg mb-8">
             Stay informed with regular credit score updates. Understand the factors impacting your score and get actionable tips to improve your financial standing with FoloMoney.
            </p>
            <Card className="shadow-xl rounded-xl bg-card border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-foreground">
                  <TrendingUp className="mr-2 h-6 w-6 text-secondary" /> Your Credit Journey
                </CardTitle>
                <CardDescription>Monitor, understand, and improve.</CardDescription>
              </CardHeader>
              <CardContent>
                <Label className="text-sm text-muted-foreground">Your Current Score</Label>
                <div className="text-5xl font-bold text-secondary mb-3">750</div> {/* Example Score */}
                <Progress value={75} aria-label="Credit score progress indicator: 75%" className="mb-4 h-3 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-secondary [&>div]:to-purple-400" />
                <div className="flex justify-between text-xs text-muted-foreground mb-4">
                  <span>Needs Work</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-muted-foreground"><CheckCircle className="h-4 w-4 mr-2 text-secondary flex-shrink-0" /> Regular score updates & alerts</li>
                  <li className="flex items-center text-muted-foreground"><CheckCircle className="h-4 w-4 mr-2 text-secondary flex-shrink-0" /> Personalized improvement tips</li>
                  <li className="flex items-center text-muted-foreground"><CheckCircle className="h-4 w-4 mr-2 text-secondary flex-shrink-0" /> Clear credit factor analysis</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg transform hover:scale-105 transition-transform">Check Your Score Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* International Transfers Section */}
      <section className="py-16 md:py-24 bg-muted" id="transfers">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
             <Badge variant="outline" className="mb-3 text-sm px-3 py-1 rounded-full border-accent text-accent bg-accent/10 font-medium">Go Global - Fee Free!</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Send Money Worldwide, <span className="text-accent">Zero Fees</span></h2>
            <p className="text-muted-foreground md:text-lg mb-8">
              Why pay fees to send money abroad? FoloMoney offers fast, secure international transfers with competitive rates and <span className="font-semibold text-accent uppercase">absolutely no transfer fees!</span> Use our calculator to see how much you save.
            </p>
            <Card className="shadow-xl rounded-xl bg-card border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-foreground">
                  <Globe className="mr-2 h-6 w-6 text-accent" /> Quick Transfer Calculator
                </CardTitle>
                <CardDescription>Estimate your transfer instantly.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-foreground">You Send</Label>
                  <Input type="number" id="amount" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} placeholder="e.g., 10000" className="mt-1 text-base" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromCurrency" className="text-sm font-medium text-foreground">From</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger id="fromCurrency" className="mt-1 text-base"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KES"><span className="mr-2 text-lg" role="img" aria-label="Kenyan flag">🇰🇪</span> KES</SelectItem>
                        <SelectItem value="USD"><span className="mr-2 text-lg" role="img" aria-label="United States flag">🇺🇸</span> USD</SelectItem>
                        <SelectItem value="GBP"><span className="mr-2 text-lg" role="img" aria-label="United Kingdom flag">🇬🇧</span> GBP</SelectItem>
                        <SelectItem value="UGX"><span className="mr-2 text-lg" role="img" aria-label="Ugandan flag">🇺🇬</span> UGX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="toCurrency" className="text-sm font-medium text-foreground">To</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger id="toCurrency" className="mt-1 text-base"><SelectValue /></SelectTrigger>
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
                {exchangeRate !== null && (
                  <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
                    <p>Exchange Rate: <span className="font-semibold text-foreground">1 {fromCurrency} ≈ {exchangeRate.toFixed(4)} {toCurrency}</span></p>
                    <p>Transfer Fee: <span className="font-semibold text-accent">KES 0.00 (FREE!)</span></p>
                  </div>
                )}
                {calculatedAmount !== null && amountToSend && parseFloat(amountToSend) > 0 ? (
                   <Alert variant="default" className="border-accent bg-accent/5">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <AlertTitle className="font-semibold text-accent">Recipient Gets (Approx.)</AlertTitle>
                    <AlertDescription className="text-xl font-bold text-accent-foreground">
                      {calculatedAmount.toFixed(2)} {toCurrency}
                    </AlertDescription>
                  </Alert>
                ) : amountToSend && parseFloat(amountToSend) <= 0 ? (
                   <Alert variant="destructive" className="border-destructive/50 bg-destructive/5">
                     <AlertDescription className="text-sm text-destructive">
                      Please enter a positive amount to send.
                    </AlertDescription>
                   </Alert>
                ) : null}
              </CardContent>
              <CardFooter>
                 {/* Button is now primarily for display/interaction trigger, calculation happens onChange */}
                <Button disabled={!calculatedAmount} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg py-3 transform hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
                 {calculatedAmount ? 'Initiate Transfer' : 'Enter Amount to Calculate'}
                </Button>
              </CardFooter>
            </Card>
          </div>
           <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden flex items-center justify-center">
            <WorldTransferLottie className="w-full h-full"/>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 md:py-24 bg-[#0a1629] text-white" id="security">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-3 text-sm px-4 py-1.5 rounded-full border-primary/60 text-blue-300 bg-blue-900/30 font-medium">Bank-Grade Security</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Your Security, Our Priority</h2>
            <p className="text-blue-100/80 md:text-lg max-w-xl mx-auto">We employ robust security measures, powered by our partnership with DTB Bank, to keep your funds and data safe.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border border-white/10 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
              <div className="bg-blue-100/10 text-blue-300 p-4 rounded-full mb-5">
                <Lock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0a1629]">End-to-End Encryption</h3>
              <p className="text-gray-600 text-sm">Your sensitive information is encrypted both in transit and at rest, protecting it from unauthorized access.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border border-white/10 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
              <div className="bg-blue-100/10 text-blue-300 p-4 rounded-full mb-5">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0a1629]">Banking Standards</h3>
              <p className="text-gray-600 text-sm">We adhere to strict banking security protocols and industry best practices to ensure the integrity of our platform.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border border-white/10 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
              <div className="bg-blue-100/10 text-blue-300 p-4 rounded-full mb-5">
                <Banknote className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0a1629]">Powered by DTB Bank</h3>
              <p className="text-gray-600 text-sm">Our core infrastructure benefits from the reliability and established security framework of DTB Bank.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Personalized Financial Tips Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
           <Badge variant="default" className="mb-3 text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-medium">AI-Powered Insights</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Your Personal Finance Coach</h2>
          <p className="text-muted-foreground md:text-lg max-w-xl mx-auto mb-10">
           FoloMoney's AI analyzes your spending habits (securely and privately) to offer smart, actionable tips for saving money and reaching your financial goals faster.
          </p>
          {financialTips ? (
            <Alert className="text-left max-w-2xl mx-auto shadow-lg rounded-xl p-6 bg-card border-primary/30">
              <PiggyBank className="h-6 w-6 text-primary" />
              <AlertTitle className="text-xl font-semibold text-primary mt-2">Smart Savings Tips For You:</AlertTitle>
              <AlertDescription className="mt-3 text-muted-foreground leading-relaxed whitespace-pre-line">
                Based on your spending this month, I've noticed a few opportunities:

                ▸ Your Food & Drinks spending (KES 2,700) is about 23% of your monthly expenses. Try the Folo budget tracker to set a 20% target and save approximately KES 350/month.

                ▸ Entertainment costs are trending upward (+15% from last month). Consider using Folo's "Goals" feature to set aside entertainment funds at the start of each month.

                ▸ You could save ~KES 90 on airtime purchases by using Folo's discounted bill payment options instead of direct purchases.

                ▸ Your consistent bill payments are helping build a positive credit profile. Keep it up! Check your improved credit score in the "Credit Insights" tab.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="text-left max-w-2xl mx-auto shadow-lg rounded-xl p-6 bg-card border-primary/30">
              <Zap className="h-6 w-6 text-primary animate-pulse" />
              <AlertTitle className="text-xl font-semibold text-primary mt-2">Generating Insights...</AlertTitle>
              <AlertDescription className="mt-3 text-muted-foreground">
                Our AI is analyzing your recent activity to provide personalized tips. This usually takes just a moment. If you're new, start transacting to unlock insights!
              </AlertDescription>
            </Alert>
          )}
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

      {/* Call to Action Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-accent via-accent/90 to-primary">
        <div className="container mx-auto px-6 text-center text-accent-foreground">
          <Smartphone className="h-16 w-16 mx-auto mb-6 opacity-80 drop-shadow-lg" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-md">Ready to Simplify Your Finances?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto opacity-90">
            Download FoloMoney today and join the growing community managing their money the smart way – with zero transfer fees and powerful tools at their fingertips!
          </p>
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold rounded-lg px-10 py-4 text-xl shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Get Started - It's Free!
          </Button>
           <p className="mt-6 text-sm opacity-70">Available on iOS and Android.</p>
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
