import { useState, useEffect } from 'react';
import { Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { label: 'Главная', href: '#hero' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'О компании', href: '#about' },
  { label: 'Стать агентом', href: '#agent' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center gap-2"
          >
            <span className={`text-2xl font-bold font-display tracking-tight transition-colors ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>
              KIMMI
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
              isScrolled ? 'bg-black text-white' : 'bg-white/20 text-white'
            }`}>
              NEW GEN
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className={`text-sm font-medium transition-colors hover:text-neon ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+78001234567" className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              <Phone className="w-4 h-4" />
              8 (800) 123-45-67
            </a>
            <Button 
              className="bg-neon text-black hover:bg-neon-dark font-medium"
              onClick={() => scrollToSection('#catalog')}
            >
              Оставить заявку
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className={isScrolled ? 'text-black' : 'text-white'}>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96 bg-black border-none">
              <div className="flex flex-col h-full pt-12">
                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                      className="text-2xl font-medium text-white hover:text-neon transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-auto pb-8">
                  <a href="tel:+78001234567" className="flex items-center gap-2 text-white/70 mb-4">
                    <Phone className="w-5 h-5" />
                    8 (800) 123-45-67
                  </a>
                  <Button 
                    className="w-full bg-neon text-black hover:bg-neon-dark font-medium"
                    onClick={() => scrollToSection('#catalog')}
                  >
                    Оставить заявку
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
