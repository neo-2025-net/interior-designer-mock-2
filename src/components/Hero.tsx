import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';
import Magnetic from './Magnetic';
import { MessageCircle, ArrowDown } from 'lucide-react';

const heroContent = {
  en: {
    eyebrow: 'Interior Design Studio',
    titleLine1: 'Crafting',
    titleLine2: 'Silent Luxury',
    subtitle: 'Where space breathes, light whispers, and every detail speaks in quiet elegance.',
    scroll: 'Scroll to explore',
    whatsapp: 'WhatsApp Consultation',
  },
  ar: {
    eyebrow: 'استوديو تصميم داخلي',
    titleLine1: 'نصنع',
    titleLine2: 'الفخامة الصامتة',
    subtitle: 'حيث يتنفس الفضاء، وتهمس الإضاءة، ويتحدث كل تفصيل بأناقة صامتة.',
    scroll: 'اسحب للأسفل',
    whatsapp: 'استشارة واتساب',
  },
};

export default function Hero() {
  const { lang, dir } = useLang();
  const content = heroContent[lang];
  const [scrollY, setScrollY] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAr = lang === 'ar';
  const fontTitle = isAr ? 'font-display-ar' : 'font-display';

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-charcoal overflow-hidden flex items-center"
    >
      {/* Background subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%)',
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 pt-24 pb-16 md:pt-0 md:pb-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[80vh]">
          {/* Text side */}
          <div className={`order-2 lg:order-1 ${dir === 'rtl' ? 'lg:order-2' : ''}`}>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 md:mb-8 slide-in-left">
              <span className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase font-body">
                {content.eyebrow}
              </span>
            </div>

            {/* Title */}
            <h1 className={`${fontTitle} text-cream leading-[1.05] mb-6 md:mb-8`}>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light slide-in-left">
                {content.titleLine1}
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic gold-gradient slide-in-right mt-1">
                {content.titleLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-cream/60 text-base md:text-lg max-w-md leading-relaxed mb-8 md:mb-10 font-body ${
              isAr ? 'font-body-ar text-right' : ''
            } slide-in-left`} style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              {content.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Magnetic
                as="a"
                href="#portfolio"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gold text-charcoal text-sm font-body font-medium tracking-wide hover:bg-gold-light transition-colors"
              >
                {lang === 'en' ? 'View Portfolio' : 'شاهد أعمالنا'}
              </Magnetic>

              {/* WhatsApp floating CTA */}
              <Magnetic
                as="a"
                href="https://wa.me/0000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-pulse relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-gold/40 text-cream text-sm font-body tracking-wide hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <MessageCircle size={18} className="text-gold" />
                {content.whatsapp}
              </Magnetic>
            </div>
          </div>

          {/* Image side */}
          <div className={`order-1 lg:order-2 ${dir === 'rtl' ? 'lg:order-1' : ''} relative`}>
            <div
              ref={imgRef}
              className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-sm gold-border"
              style={{
                transform: `translateY(${scrollY * 0.08}px) scale(${1 + scrollY * 0.0003})`,
              }}
            >
              {/* Real interior design image */}
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Luxury interior design project"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: `translateY(${scrollY * 0.04}px) scale(1.1)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-charcoal/20" />
              {/* Frame corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/50" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/50" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/50" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/50" />
            </div>

            {/* Floating decorative compass */}
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-20 h-20 md:w-28 md:h-28 hidden sm:block animate-float">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gold/40 animate-spin-slow">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.3" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
                <polygon points="50,20 46,50 50,48 54,50" fill="currentColor" />
                <polygon points="50,80 46,50 50,52 54,50" fill="currentColor" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-cream/40 text-[10px] tracking-[0.3em] uppercase font-body">
          {content.scroll}
        </span>
        <ArrowDown size={16} className="text-gold/60 animate-bounce" />
      </div>
    </section>
  );
}
