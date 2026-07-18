import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Magnetic from './Magnetic';
import { Menu, X } from 'lucide-react';

const navContent = {
  en: {
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Book Consultation',
  },
  ar: {
    links: [
      { label: 'الرئيسية', href: '#hero' },
      { label: 'أعمالنا', href: '#portfolio' },
      { label: 'من نحن', href: '#about' },
      { label: 'خدماتنا', href: '#services' },
      { label: 'تواصل', href: '#contact' },
    ],
    cta: 'احجز استشارة',
  },
};

export default function Navbar() {
  const { lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const content = navContent[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // When scrolled: light glass background with dark text
  // When at top (over dark hero): transparent with light text
  const isLight = scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white py-3 shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center">
            <img
              src="/images/logo.svg"
              alt="Decor Logo"
              className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
              // style={{
              //   filter: isLight
              //     ? 'brightness(0) invert(0) drop-shadow(0 0 6px rgba(212,175,55,0.25))'
              //     : 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(212,175,55,0.3))',
              // }}
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className={`font-display text-lg md:text-xl tracking-wide transition-colors duration-500 ${
              isLight ? 'text-charcoal' : 'text-cream'
            }`}>
              {lang === 'en' ? 'Interior' : 'مصمم داخلي'}
            </div>
            <div className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-gold-dark font-body">
              {lang === 'en' ? 'Decor Studio' : 'للديكور'}
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-9">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-body tracking-wide transition-colors duration-300 group ${
                isLight ? 'text-charcoal/70 hover:text-gold-dark' : 'text-cream/80 hover:text-gold'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right side: Lang toggle + CTA */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Language Toggle */}
          <button
            onClick={toggle}
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 group ${
              isLight
                ? 'bg-cream/60 border-gold/30 hover:border-gold/60 backdrop-blur-md'
                : 'glass border-gold/20 hover:border-gold/50'
            }`}
            aria-label="Toggle language"
          >
            <span className={`text-xs font-body tracking-wider transition-colors ${lang === 'en' ? 'text-gold-dark' : isLight ? 'text-charcoal/40' : 'text-cream/50'}`}>
              EN
            </span>
            <span className={`relative w-9 h-4 rounded-full border border-gold/30 ${isLight ? 'bg-charcoal/10' : 'bg-charcoal/60'}`}>
              <span
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold transition-all duration-400 ease-out ${
                  lang === 'ar' ? 'left-[18px]' : 'left-[2px]'
                }`}
              />
            </span>
            <span className={`text-xs font-body tracking-wider transition-colors ${lang === 'ar' ? 'text-gold-dark' : isLight ? 'text-charcoal/40' : 'text-cream/50'}`}>
              ع
            </span>
          </button>

          {/* CTA Desktop */}
          <Magnetic
            as="a"
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-gold text-charcoal text-sm font-body font-medium tracking-wide hover:bg-gold-light transition-colors duration-300"
          >
            {content.cta}
          </Magnetic>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden transition-colors duration-500 ${isLight ? 'text-charcoal' : 'text-cream'}`}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — light glass background */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass mx-4 mt-3 rounded-2xl p-6 flex flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-charcoal/80 hover:text-gold-dark transition-colors font-body text-base py-2.5 border-b border-charcoal/10"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full bg-gold text-charcoal text-sm font-body font-medium"
          >
            {content.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
