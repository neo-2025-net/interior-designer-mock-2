import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    en: { title: 'The Pearl Residence', category: 'Modern Villa', desc: 'A serene retreat where marble meets warm oak.' },
    ar: { title: 'مسكن اللؤلؤة', category: 'فيلا عصرية', desc: 'ملاذ هادئ يلتقي فيه الرخام بالبلوط الدافئ.' },
  },
  {
    img: 'https://images.pexels.com/photos/532001/pexels-photo-532001.jpeg?auto=compress&cs=tinysrgb&w=1200',
    en: { title: 'Noir Penthouse', category: 'Urban Loft', desc: 'Dramatic shadows, brushed brass, and quiet confidence.' },
    ar: { title: 'بنتهاوس نوار', category: 'لوفت حضري', desc: 'ظلال درامية، نحاس مصقول، وثقة صامتة.' },
  },
  {
    img: 'https://images.pexels.com/photos/3637739/pexels-photo-3637739.jpeg?auto=compress&cs=tinysrgb&w=1200',
    en: { title: 'Saffron Living', category: 'Family Home', desc: 'Warm tones and tactile textures for everyday rituals.' },
    ar: { title: 'الزعفران', category: 'منزل عائلي', desc: 'درجات دافئة وملمسات ملموسة لطقوس يومية.' },
  },
  {
    img: 'https://images.pexels.com/photos/10807254/pexels-photo-10807254.jpeg?auto=compress&cs=tinysrgb&w=1200',
    en: { title: 'Azure Sanctuary', category: 'Coastal Villa', desc: 'Light-washed surfaces echoing the sea beyond.' },
    ar: { title: 'ملاذ الأزرق', category: 'فيلا ساحلية', desc: 'أسطح مغسولة بالضوء تعكس البحر المجاور.' },
  },
  {
    img: 'https://images.pexels.com/photos/6969876/pexels-photo-6969876.jpeg?auto=compress&cs=tinysrgb&w=1200',
    en: { title: 'Onyx Gallery', category: 'Art Residence', desc: 'A monochrome canvas for a private collection.' },
    ar: { title: 'معرض الأونيكس', category: 'سكن فني', desc: 'لوحة أحادية اللون لمجموعة فنية خاصة.' },
  },
];

export default function Portfolio() {
  const { lang, dir } = useLang();
  const [active, setActive] = useState(0);
  const [parallax, setParallax] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isAr = lang === 'ar';
  const fontTitle = isAr ? 'font-display-ar' : 'font-display';

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setParallax(Math.max(0, Math.min(1, progress)) * 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const next = () => setActive((p) => (p + 1) % projects.length);
  const prev = () => setActive((p) => (p - 1 + projects.length) % projects.length);

  // Touch swipe
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const current = projects[active];

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-20 md:py-32 bg-cream overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-12 md:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-gold" />
          <span className="text-gold-dark text-xs md:text-sm tracking-[0.3em] uppercase font-body">
            {isAr ? 'أعمالنا المختارة' : 'Selected Works'}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className={`${fontTitle} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal font-light leading-tight`}>
            {isAr ? 'مشاريع مختارة' : 'Curated'}
            <span className="italic gold-gradient"> {isAr ? 'بعناية' : 'Projects'}</span>
          </h2>
          <p className={`text-charcoal/60 max-w-sm text-sm md:text-base font-body ${isAr ? 'font-body-ar' : ''}`}>
            {isAr
              ? 'كل مساحة رواية — مصممة بدقة لتعكس الصمت الفاخر.'
              : 'Each space a narrative — crafted with precision to reflect silent luxury.'}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="max-w-7xl mx-auto px-5 md:px-10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Image */}
          <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-sm bg-charcoal group">
            {projects.map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? 'scale(1)' : 'scale(1.05)',
                  zIndex: i === active ? 2 : 1,
                }}
              >
                {/* Real project image */}
                <img
                  src={projects[i].img}
                  alt={projects[i][lang].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: `translateY(${i === active ? -parallax * 0.5 : 0}px) scale(1.1)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                {/* Frame corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/40" />
              </div>
            ))}

            {/* Nav arrows */}
            <button
              onClick={prev}
              className="absolute top-1/2 -translate-y-1/2 left-3 md:left-5 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full glass-dark flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-all duration-300"
              aria-label="Previous"
            >
              {dir === 'rtl' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 -translate-y-1/2 right-3 md:right-5 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full glass-dark flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-all duration-300"
              aria-label="Next"
            >
              {dir === 'rtl' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {/* Text overlay / side panel */}
          <div className="lg:col-span-4 lg:pl-4">
            <div key={active} className="slide-in-right">
              <span className="text-gold-dark text-xs tracking-[0.3em] uppercase font-body">
                {isAr ? `مشروع ${String(active + 1).padStart(2, '0')}` : `Project ${String(active + 1).padStart(2, '0')}`}
              </span>
              <h3 className={`${fontTitle} text-3xl md:text-4xl lg:text-5xl text-charcoal font-light mt-3 mb-3 leading-tight`}>
                {current[lang].title}
              </h3>
              <p className="text-gold-dark text-sm tracking-wide font-body mb-4">
                {current[lang].category}
              </p>
              <p className={`text-charcoal/60 text-sm md:text-base leading-relaxed mb-6 font-body ${isAr ? 'font-body-ar' : ''}`}>
                {current[lang].desc}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-charcoal text-sm font-body tracking-wide border-b border-gold pb-1 hover:text-gold-dark transition-colors"
              >
                {isAr ? 'عرض المشروع' : 'View Project'}
                <span>{dir === 'rtl' ? '←' : '→'}</span>
              </a>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-8">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all duration-400 ${
                    i === active ? 'w-10 bg-gold' : 'w-4 bg-charcoal/20 hover:bg-charcoal/40'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
