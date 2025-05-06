'use client';

import Image from 'next/image';
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
  CurrencyDollar,
  Globe2,
  HelpCircle,
  PiggyBank,
  Send,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import {cn} from '@/lib/utils';
import {getExchangeRate} from '@/services/exchange-rate';

const TestimonialCard = ({userName, userRole, testimonialText, rating, imageUrl, imageAlt}: any) => (
  <Card className="w-full md:w-[350px] p-4">
    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
      <Avatar>
        {imageUrl ? <AvatarImage src={imageUrl} alt={imageAlt} /> : <AvatarFallback>{userName.charAt(0)}</AvatarFallback>}
      </Avatar>
      <div className="space-y-0.5 ml-4">
        <CardTitle className="text-sm font-medium">{userName}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{userRole}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{testimonialText}</p>
      <div className="flex items-center mt-2">
        {Array.from({length: rating}, (_, i) => (
          <Image key={i} src="/star.svg" alt="Star" width={16} height={16} />
        ))}
      </div>
    </CardContent>
  </Card>
);

const FAQItem = ({question, answer}: any) => (
  <AccordionItem value={question}>
    <AccordionTrigger>{question}</AccordionTrigger>
    <AccordionContent>{answer}</AccordionContent>
  </AccordionItem>
);

export default function Home() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [calculatedAmount, setCalculatedAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amountToSend, setAmountToSend] = useState('');
  const [financialTips, setFinancialTips] = useState('');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const rate = await getExchangeRate(fromCurrency, toCurrency);
      setExchangeRate(rate.rate);
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleCalculate = () => {
    if (exchangeRate) {
      setCalculatedAmount(parseFloat(amountToSend) * exchangeRate);
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
      const tips = await getPersonalizedFinancialTips({spendingData});
      setFinancialTips(tips.tips);
    };
    fetchFinancialTips();
  }, []);

  return (
    <div className="font-sans antialiased">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Manage Your Finances Seamlessly with folomoney</h1>
          <p className="text-xl mb-8">Access your wallet, pay bills, send money globally, and monitor your credit score—all in one place.</p>
          <Button className="bg-accent text-foreground hover:bg-accent/80 font-bold rounded-md px-6 py-3">Download the App</Button>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card shadow-md">
              <CardContent className="flex items-center space-x-4">
                <Wallet className="h-6 w-6 text-secondary" />
                <span>Wallet Access</span>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-md">
              <CardContent className="flex items-center space-x-4">
                <CreditCard className="h-6 w-6 text-secondary" />
                <span>Bill Payments</span>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-md">
              <CardContent className="flex items-center space-x-4">
                <Globe2 className="h-6 w-6 text-secondary" />
                <span>Global Money Transfers</span>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-md">
              <CardContent className="flex items-center space-x-4">
                <TrendingUp className="h-6 w-6 text-secondary" />
                <span>Credit Score Monitoring</span>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30 w-[300px] h-[300px] rounded-full bg-secondary"></div>
        </div>
      </section>

      {/* Our Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><Wallet className="mr-2 h-5 w-5 text-secondary" /> Digital Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Securely store and manage your funds with our user-friendly digital wallet.</CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-secondary" /> Credit Score</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Monitor and improve your credit score with our comprehensive tools and insights.</CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-secondary" /> Bill Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Easily pay your bills on time with our convenient and secure payment system.</CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><Send className="mr-2 h-5 w-5 text-secondary" /> Global Money Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Send money to your loved ones quickly and affordably, no matter where they are.</CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><Globe2 className="mr-2 h-5 w-5 text-secondary" /> International Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Transfer money internationally with competitive rates and fast processing times.</CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-secondary" /> Secure Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Rest easy knowing your transactions are protected by state-of-the-art security measures.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Digital Wallet Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Digital Wallet</h2>
            <p className="mb-4 text-muted-foreground">Experience the convenience of our digital wallet. Manage your funds, track expenses, and make secure transactions all in one place.</p>
            <ul className="list-none space-y-2">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Real-time balance updates</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Instant money transfers</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Expense categorization</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Multi-currency support</li>
            </ul>
            <Button className="bg-accent text-foreground hover:bg-accent/80 mt-4">Open Your Wallet</Button>
          </div>
          <div>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Your Digital Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Current Balance</Label>
                <div className="text-4xl font-bold mb-4">$5,280.75</div>
                <Label>Recent Transaction</Label>
                <div className="text-sm mb-2">-$45.00</div>
                <Label>Pending Transfer</Label>
                <div className="text-sm text-green-500">+$200.00</div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary">View Transactions</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Credit Score Monitoring Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Credit Score Monitoring</h2>
            <p className="mb-4 text-muted-foreground">Stay on top of your financial health with our advanced credit score monitoring service. Understand your creditworthiness and take steps to improve it.</p>
            <ul className="list-none space-y-2">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Regular credit score updates</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Personalized improvement tips</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Credit factor analysis</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Alert notifications</li>
            </ul>
            <Button className="bg-accent text-foreground hover:bg-accent/80 mt-4">Check Your Score</Button>
          </div>
          <div>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Your Credit Score</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Credit Score Range</Label>
                <Progress value={75} className="mb-2" />
                <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2">
                  <span>Poor</span>
                  <span className="text-center">Good</span>
                  <span className="text-right">Excellent</span>
                </div>
                <div className="text-5xl font-bold mb-4">750</div>
                <div className="text-sm text-muted-foreground mb-4">Your current credit score</div>
                <ul className="list-none space-y-2">
                  <li className="flex items-center justify-between">Payment History <Badge variant="secondary">Excellent</Badge></li>
                  <li className="flex items-center justify-between">Credit Utilization <Badge variant="secondary">Good</Badge></li>
                  <li className="flex items-center justify-between">Length of Credit History <Badge variant="secondary">Very Good</Badge></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Effortless Bill Payments Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Effortless Bill Payments</h2>
            <p className="mb-4 text-muted-foreground">Never miss a due date again. Our bill payment service allows you to manage and pay all your bills in one place, saving you time and avoiding late fees.</p>
            <ul className="list-none space-y-2">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Schedule automatic payments</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Pay multiple bills at once</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Receive payment reminders</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Track payment history</li>
            </ul>
            <Button className="bg-accent text-foreground hover:bg-accent/80 mt-4">Start Paying Bills</Button>
          </div>
          <div>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Upcoming Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-none space-y-4">
                  <li className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Electricity Bill</div>
                      <div className="text-sm text-muted-foreground">Due in 3 days</div>
                    </div>
                    <div>
                      <div className="font-semibold">$85.50</div>
                      <Button variant="link">Pay Now</Button>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Water Bill</div>
                      <div className="text-sm text-muted-foreground">Due in 7 days</div>
                    </div>
                    <div>
                      <div className="font-semibold">$42.75</div>
                      <Button variant="link">Pay Now</Button>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Internet Service</div>
                      <div className="text-sm text-muted-foreground">Due in 12 days</div>
                    </div>
                    <div>
                      <div className="font-semibold">$59.99</div>
                      <Button variant="link">Pay Now</Button>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="secondary">View All Bills</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* International Transfers Made Simple Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">International Transfers Made Simple</h2>
            <p className="mb-4 text-muted-foreground">Send money worldwide to friends, family, or business partners across the globe quickly and securely with our international transfer service.</p>
            <ul className="list-none space-y-2">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Competitive exchange rates</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Low transfer fees</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Fast processing times</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Secure transactions</li>
            </ul>
            <Button className="bg-accent text-foreground hover:bg-accent/80 mt-4">Start a Transfer</Button>
          </div>
          <div>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Quick Transfer Calculator</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <Label htmlFor="amount">Amount to Send</Label>
                  <Input type="number" id="amount" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="fromCurrency">From Currency</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="KES">KES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="toCurrency">To Currency</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="EUR" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {exchangeRate !== null && (
                  <>
                    <div className="text-sm text-muted-foreground">Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}</div>
                    <div className="text-sm text-muted-foreground">Fee: $5.00</div>
                  </>
                )}
                {calculatedAmount !== null && (
                  <div className="font-semibold">{amountToSend}.00 {fromCurrency} = {calculatedAmount.toFixed(2)} {toCurrency}</div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleCalculate}>Calculate &amp; Transfer</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">What Our Customers Say</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            <TestimonialCard
              userName="Wanjiku Maina"
              userRole="Student"
              testimonialText="FoloMoney has made managing my finances so much easier. I can track my spending, pay bills, and send money to my family back home all in one app!"
              rating={5}
              imageUrl="https://picsum.photos/50/50"
              imageAlt="Wanjiku Maina"
            />
            <TestimonialCard
              userName="David Omondi"
              userRole="Young Professional"
              testimonialText="I love how FoloMoney helps me monitor my credit score. The personalized tips have been incredibly helpful in improving my financial health."
              rating={4}
              imageUrl="https://picsum.photos/51/51"
              imageAlt="David Omondi"
            />
            <TestimonialCard
              userName="Aisha Abubakar"
              userRole="Entrepreneur"
              testimonialText="Sending money internationally has never been easier. FoloMoney's competitive rates and fast processing times have saved me a lot of money and hassle."
              rating={5}
              imageUrl="https://picsum.photos/52/52"
              imageAlt="Aisha Abubakar"
            />
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <FAQItem
              question="How secure is folomoney?"
              answer="FoloMoney uses state-of-the-art security measures to protect your transactions and personal information. We employ encryption, two-factor authentication, and regular security audits to ensure the safety of your funds."
            />
            <FAQItem
              question="How do I set up my digital wallet?"
              answer="Setting up your digital wallet is easy. Simply download the app, create an account, and follow the instructions to link your bank account or credit card. Once your account is verified, you can start managing your funds and making transactions."
            />
            <FAQItem
              question="What are the fees for international transfers?"
              answer="FoloMoney offers competitive exchange rates and low transfer fees for international transfers. The exact fees may vary depending on the destination country and the amount you are sending. You can view the fees and exchange rates before initiating a transfer."
            />
            <FAQItem
              question="How often is my credit score updated?"
              answer="Your credit score is updated regularly, typically on a monthly basis. We provide you with notifications whenever there are changes to your credit score or credit report."
            />
            <FAQItem
              question="Can I schedule recurring bill payments?"
              answer="Yes, FoloMoney allows you to schedule recurring bill payments. You can set up automatic payments for your bills, ensuring that you never miss a due date again."
            />
          </Accordion>
          <div className="mt-8 text-center">
            <Button variant="link">Can't find the answer you're looking for? Contact Support</Button>
          </div>
        </div>
      </section>

      {/* Personalized Financial Tips Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Personalized Financial Tips</h2>
          {financialTips ? (
            <Alert>
              <AlertTitle>Here are your personalized financial tips:</AlertTitle>
              <AlertDescription>{financialTips}</AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <AlertTitle>Loading financial tips...</AlertTitle>
              <AlertDescription>Please wait while we analyze your spending data to provide personalized financial tips.</AlertDescription>
            </Alert>
          )}
        </div>
      </section>
    </div>
  );
}
