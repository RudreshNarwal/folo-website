// src/components/layout/header.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Download, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { FoloLogoIcon } from '@/components/icons/folo-logo';

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
    { name: 'Transfers', href: '#transfers' },
    { name: 'Security', href: '#security' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <FoloLogoIcon className={cn("h-10 w-10", isScrolled ? "text-primary" : "text-primary-foreground group-hover:text-accent")} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-primary-foreground/80 hover:text-accent'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button className={cn(isScrolled ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-accent text-accent-foreground hover:bg-accent/90")}>
            <Download className="mr-2 h-4 w-4" /> Download App
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="sm" className={cn("mr-2", isScrolled ? "text-accent hover:bg-accent/10" : "text-accent hover:bg-primary-foreground/10 ")}>
             <Download className="mr-1 h-4 w-4" /> App
          </Button>
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
                  <FoloLogoIcon className="h-8 w-8 text-primary" />
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
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                     <Download className="mr-2 h-5 w-5" /> Download App
                  </Button>
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
