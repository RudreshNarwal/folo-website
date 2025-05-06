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
} from 'lucide-react';
import {cn} from '@/lib/utils';
import {getExchangeRate} from '@/services/exchange-rate';
import { InteractiveAppShowcaseSVG, InteractiveCreditScoreSVG, InteractiveGlobalTransferSVG } from '@/components/interactive-svgs';


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
    <AccordionTrigger className="py-5 text-lg font-medium hover:text-primary transition-colors">{question}</AccordionTrigger>
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


export default function Home() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [calculatedAmount, setCalculatedAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amountToSend, setAmountToSend] = useState('100');
  const [financialTips, setFinancialTips] = useState('');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rateData = await getExchangeRate(fromCurrency, toCurrency);
        setExchangeRate(rateData.rate);
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        setExchangeRate(null); // Handle error state
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleCalculate = () => {
    if (exchangeRate && amountToSend) {
      setCalculatedAmount(parseFloat(amountToSend) * exchangeRate);
    } else {
      setCalculatedAmount(null);
    }
  };

  const spendingData = `
    Date: 2024-01-15, Category: Groceries, Amount: $200
    Date: 2024-01-20, Category: Dining, Amount: $150
    Date: 2024-01-25, Category: Entertainment, Amount: $100
    Date: 2024-01-30, Category: Utilities, Amount: $250
    Date: 2024-02-05, Category: Shopping, Amount: $300
    Date: 2024-02-10, Category: Transportation, Amount: $120
    Date: 2024-02-15, Category: Groceries, Amount: $180
    Date: 2024-02-20, Category: Dining, Amount: $130
    Date: 2024-02-25, Category: Entertainment, Amount: $90
    Date: 2024-02-29, Category: Utilities, Amount: $240
  `;

  useEffect(() => {
    const fetchFinancialTips = async () => {
      try {
        const tips = await getPersonalizedFinancialTips({spendingData});
        setFinancialTips(tips.tips);
      } catch (error)
 {
        console.error("Failed to fetch financial tips:", error);
        setFinancialTips("Could not load financial tips at this time."); 
      }
    };
    fetchFinancialTips();
  }, [spendingData]); 

  return (
    <div className="font-sans antialiased bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-28 md:py-40 bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Money, <span className="text-accent">Your Way</span>.
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join FoloMoney and experience banking designed for your generation. Wallet, payments, ZERO-FEE global transfers, credit insights - all in one sleek app.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Download App <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent/10 font-semibold rounded-lg px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
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

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="secondary" className="mb-3 text-sm px-4 py-1.5 rounded-full bg-secondary/10 text-secondary-foreground">Why FoloMoney?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Banking That Gets You</h2>
            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">We&apos;re not your parents&apos; bank. We&apos;re building finance tools for today&apos;s world with ZERO transfer fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Zap className="h-7 w-7" />} title="Instant Transactions" description="Send and receive money in seconds, not days." dataAiHint="fast payment" />
            <FeatureCard icon={<Globe className="h-7 w-7" />} title="Zero-Fee Global Reach" description="Transfer funds worldwide with absolutely NO fees." dataAiHint="international finance" />
            <FeatureCard icon={<BarChart3 className="h-7 w-7" />} title="Credit Insights" description="Understand and build your credit score effortlessly." dataAiHint="credit report" />
            <FeatureCard icon={<ShieldCheck className="h-7 w-7" />} title="Fort Knox Security" description="Your funds and data are protected with top-tier security." dataAiHint="data security" />
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-3 text-sm px-3 py-1 rounded-full border-primary text-primary bg-primary/10">Core Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">All Your Finances, Perfectly Organized</h2>
              <p className="text-muted-foreground md:text-lg mb-8">
                FoloMoney combines everything you need into one intuitive platform. Say goodbye to juggling multiple apps and hidden fees.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full mt-1"><Wallet className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Smart Digital Wallet</h3>
                    <p className="text-muted-foreground text-sm">Store, send, and receive funds with ease. Track your spending habits and get personalized insights.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full mt-1"><CreditCard className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Effortless Bill Payments</h3>
                    <p className="text-muted-foreground text-sm">Automate your bills, avoid late fees, and manage all your recurring payments in one spot.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full mt-1"><Send className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Zero-Fee Global Transfers</h3>
                    <p className="text-muted-foreground text-sm">Send money to friends or businesses globally with competitive rates and absolutely ZERO transfer fees.</p>
                  </div>
                </div>
              </div>
              <Button className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-7 py-3">
                Explore All Features <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-card">
              <InteractiveAppShowcaseSVG className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Credit Score Monitoring Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl order-last md:order-first flex items-center justify-center bg-card">
            <InteractiveCreditScoreSVG className="w-full h-full" />
          </div>
          <div className="md:pl-8">
            <Badge variant="outline" className="mb-3 text-sm px-3 py-1 rounded-full border-secondary text-secondary bg-secondary/10">Boost Your Score</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Unlock Your Credit Potential</h2>
            <p className="text-muted-foreground md:text-lg mb-8">
              Monitor your credit score, understand the factors affecting it, and get personalized tips to improve your financial standing with FoloMoney.
            </p>
            <Card className="shadow-xl rounded-xl bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-foreground">
                  <TrendingUp className="mr-2 h-6 w-6 text-secondary" /> Your Credit Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label className="text-sm text-muted-foreground">Current Score</Label>
                <div className="text-5xl font-bold text-secondary mb-3">750</div>
                <Progress value={75} className="mb-4 h-3 rounded-full [&>div]:bg-secondary" />
                <div className="flex justify-between text-xs text-muted-foreground mb-4">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-muted-foreground"><CheckCircle className="h-4 w-4 mr-2 text-secondary" /> Regular score updates</li>
                  <li className="flex items-center text-muted-foreground"><CheckCircle className="h-4 w-4 mr-2 text-secondary" /> Personalized improvement tips</li>
                  <li className="flex items-center text-muted-foreground"><CheckCircle className="h-4 w-4 mr-2 text-secondary" /> Credit factor analysis</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg">Check Your Score Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* International Transfers Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-3 text-sm px-3 py-1 rounded-full border-accent text-accent bg-accent/10">Go Global For Free</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Send Money Without Borders or Fees</h2>
            <p className="text-muted-foreground md:text-lg mb-8">
              Transfer funds internationally with competitive exchange rates, lightning-fast processing, and best of all: <span className="font-semibold text-accent">ZERO transfer fees!</span> Connect to the world with FoloMoney.
            </p>
            <Card className="shadow-xl rounded-xl bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-foreground">
                  <Globe className="mr-2 h-6 w-6 text-accent" /> Quick Transfer Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-foreground">Amount to Send</Label>
                  <Input type="number" id="amount" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} placeholder="e.g., 100" className="mt-1 text-base" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromCurrency" className="text-sm font-medium text-foreground">From</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="mt-1 text-base"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD 🇺🇸</SelectItem>
                        <SelectItem value="KES">KES 🇰🇪</SelectItem>
                        <SelectItem value="GBP">GBP 🇬🇧</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="toCurrency" className="text-sm font-medium text-foreground">To</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="mt-1 text-base"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR 🇪🇺</SelectItem>
                        <SelectItem value="UGX">UGX 🇺🇬</SelectItem>
                        <SelectItem value="CAD">CAD 🇨🇦</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {exchangeRate !== null && (
                  <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
                    <p>Exchange Rate: <span className="font-semibold text-foreground">1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</span></p>
                    <p>Transfer Fee: <span className="font-semibold text-accent">FREE!</span></p>
                  </div>
                )}
                {calculatedAmount !== null && amountToSend && (
                  <Alert variant="default" className="border-accent bg-accent/5">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <AlertTitle className="font-semibold text-accent">Recipient Gets (Approx.)</AlertTitle>
                    <AlertDescription className="text-xl font-bold text-accent-foreground">
                      {calculatedAmount.toFixed(2)} {toCurrency}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleCalculate} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg py-3">
                  Calculate Transfer
                </Button>
              </CardFooter>
            </Card>
          </div>
           <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-card">
            <InteractiveGlobalTransferSVG className="w-full h-full"/>
          </div>
        </div>
      </section>

      {/* Personalized Financial Tips Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
           <Badge variant="default" className="mb-3 text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-full">AI Powered Insights</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Your Personal Finance Guru</h2>
          <p className="text-muted-foreground md:text-lg max-w-xl mx-auto mb-10">
            Let FoloMoney&apos;s AI analyze your spending and provide tailored tips to help you save more and spend smarter.
          </p>
          {financialTips ? (
            <Alert className="text-left max-w-2xl mx-auto shadow-lg rounded-xl p-6 bg-card border-primary/30">
              <PiggyBank className="h-6 w-6 text-primary" />
              <AlertTitle className="text-xl font-semibold text-primary mt-2">Smart Savings Tips For You:</AlertTitle>
              <AlertDescription className="mt-3 text-muted-foreground leading-relaxed whitespace-pre-line">
                {financialTips}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="text-left max-w-2xl mx-auto shadow-lg rounded-xl p-6 bg-card border-primary/30">
              <Zap className="h-6 w-6 text-primary animate-pulse" />
              <AlertTitle className="text-xl font-semibold text-primary mt-2">Crunching The Numbers...</AlertTitle>
              <AlertDescription className="mt-3 text-muted-foreground">
                Hang tight! Our AI is crafting personalized financial tips just for you. This might take a moment.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted" id="pricing"> {/* Added ID for nav */}
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
             <Badge variant="secondary" className="mb-3 text-sm px-4 py-1.5 rounded-full bg-secondary/10 text-secondary-foreground">Community Love</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Loved by GenZ Users</h2>
            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">Don&apos;t just take our word for it. Here&apos;s what our users are saying about FoloMoney.</p>
          </div>
          <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted">
            <TestimonialCard
              userName="Wanjiku M."
              userRole="Design Student"
              testimonialText="FoloMoney is a lifesaver! Managing my student budget and sending money home with ZERO fees is super easy. The interface is so clean too!"
              rating={5}
              imageUrl="https://picsum.photos/seed/wanjiku/100/100"
              imageAlt="Wanjiku M."
              dataAiHint="young woman"
            />
            <TestimonialCard
              userName="David O."
              userRole="Junior Developer"
              testimonialText="Finally, a banking app that doesn't feel ancient. The credit score tips actually helped me. Plus, global transfers are FREE!"
              rating={5}
              imageUrl="https://picsum.photos/seed/david/100/100"
              imageAlt="David O."
              dataAiHint="young man"
            />
            <TestimonialCard
              userName="Aisha A."
              userRole="Freelance Artist"
              testimonialText="As a freelancer, getting paid from international clients used to be a nightmare. FoloMoney makes it seamless AND free. Love it!"
              rating={4}
              imageUrl="https://picsum.photos/seed/aisha/100/100"
              imageAlt="Aisha A."
              dataAiHint="woman creative"
            />
             <TestimonialCard
              userName="Ken B."
              userRole="Gamer & Streamer"
              testimonialText="Managing my streaming income and paying for subs is way simpler with FoloMoney. The app is fast, and I dig the dark mode! Zero fees on transfers is a game changer."
              rating={5}
              imageUrl="https://picsum.photos/seed/ken/100/100"
              imageAlt="Ken B."
              dataAiHint="man technology"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
           <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-3 text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-full">Got Questions?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">We&apos;ve Got Answers</h2>
            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">Find quick answers to common questions about FoloMoney.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <FAQItem
              question="Is FoloMoney really secure?"
              answer="Absolutely. We use bank-grade encryption, multi-factor authentication, and continuous security monitoring to keep your account and data safe. Your peace of mind is our top priority."
            />
            <FAQItem
              question="How fast can I open an account?"
              answer="Super fast! You can sign up and get your digital wallet set up in minutes. Just download the app, follow a few simple steps, and you're good to go."
            />
            <FAQItem
              question="Are international transfers really free?"
              answer="Yes! FoloMoney offers ZERO transfer fees for international transactions. You get competitive exchange rates without any hidden costs. What you see is what you get."
            />
            <FAQItem
              question="How does the credit score feature work?"
              answer="We provide regular updates to your credit score and show you key factors influencing it. Plus, you get personalized, actionable tips to help you improve your score over time, all within the FoloMoney app."
            />
            <FAQItem
              question="Can I use FoloMoney for my side hustle?"
              answer="Yes! FoloMoney is great for managing personal finances and earnings from side hustles or freelance work. Easily track income, expenses, and transfer funds (with zero fees!) as needed."
            />
          </Accordion>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-lg border-primary text-primary hover:bg-primary/10">
              <MessageSquare className="mr-2 h-5 w-5" /> Still Curious? Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-accent via-accent/90 to-primary">
        <div className="container mx-auto px-6 text-center text-accent-foreground">
          <Smartphone className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Revolutionize Your Finances?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto opacity-90">
            Download FoloMoney today and join thousands of GenZ users managing their money the smart way – with zero transfer fees!
          </p>
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold rounded-lg px-10 py-4 text-xl shadow-2xl hover:shadow-none transition-shadow duration-300">
            Get Started for Free
          </Button>
           <p className="mt-6 text-sm opacity-70">Available on iOS and Android.</p>
        </div>
      </section>

       {/* Footer */}
      <footer className="py-12 bg-foreground text-background/70" id="about"> {/* Added ID for nav */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-semibold text-background/90 mb-3">Product</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-primary">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary">Pricing (It's Free!)</a></li>
                <li><a href="#features" className="hover:text-primary">Security</a></li> {/* Point to relevant section */}
                <li><a href="#" className="hover:text-primary">Download</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-background/90 mb-3">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Press</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-background/90 mb-3">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-primary">Help Center</a></li>
                <li><a href="#faq" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#faq" className="hover:text-primary">FAQs</a></li>
                <li><a href="#" className="hover:text-primary">Status</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-background/90 mb-3">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} FoloMoney. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {/* Social media icons can be added here e.g. <Gift /> for X/Twitter if appropriate */}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
