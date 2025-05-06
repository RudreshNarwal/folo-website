// src/components/layout/header.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Support', href: '#faq' },
    { name: 'Company', href: '#about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Zap className={cn("h-8 w-8", isScrolled ? "text-primary" : "text-primary-foreground group-hover:text-primary")} />
          <span className={cn("text-2xl font-bold", isScrolled ? "text-foreground" : "text-primary-foreground group-hover:text-foreground")}>
            folomoney
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/80 hover:text-accent'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button variant={isScrolled ? "outline" : "ghost"} className={cn(isScrolled ? "border-primary text-primary" : "text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent")}>
            Log In
          </Button>
          <Button className={cn(isScrolled ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/90")}>
            Sign Up
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isScrolled ? "text-foreground" : "text-primary-foreground hover:bg-primary-foreground/10")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6">
              <div className="flex flex-col space-y-6">
                <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setMobileMenuOpen(false)}>
                  <Zap className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold text-foreground">folomoney</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-border pt-6 space-y-4">
                  <Button variant="outline" className="w-full">Log In</Button>
                  <Button className="w-full bg-primary text-primary-foreground">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
