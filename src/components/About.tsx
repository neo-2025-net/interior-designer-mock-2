import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

const aboutContent = {
  en: {
    eyebrow: 'The Studio',
    title: 'A philosophy of',
    titleAccent: 'restraint',
    body: 'Lamsat Ayar Decor is an interior design studio devoted to the art of silent luxury. We believe the most powerful spaces speak softly — through proportion, material, and the interplay of light and shadow. Every project begins with listening, and ends with a space that feels inevitable.',
    stats: [
      { value: '12+', label: 'Years of Craft' },
      { value: '180+', label: 'Projects Realized' },
      // { value: '40+', label: 'Design Awards' },
    ],
  },
  ar: {
    eyebrow: 'الاستوديو',
    title: 'فلسفة',
    titleAccent: 'الضبط',
    body: 'لمسات عيار للديكور استوديو تصميم داخلي مكرّس لفن الفخامة الصامتة. نؤمن بأن أقوى المساحات تتحدث بهدوء — عبر التناسب، والمواد، وتفاعل الضوء والظل. كل مشروع يبدأ بالاستماع، وينتهي بمساحة تبدو حتمية.',
    stats: [
      { value: '+12', label: 'سنوات من الحرفية' },
      { value: '+180', label: 'مشروع منجز' },
      // { value: '+40', label: 'جائزة تصميم' },
    ],
  },
};

export default function About() {
  const { lang } = useLang();
  const content = aboutContent[lang];
  const isAr = lang === 'ar';
  const fontTitle = isAr ? 'font-display-ar' : 'font-display';
  const [parallax, setParallax] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setParallax(Math.max(0, Math.min(1, progress)) * 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 md:py-32 bg-charcoal overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with parallax */}
          <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-sm gold-border">
            <img
              src="https://images.pexels.com/photos/6585755/pexels-photo-6585755.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Interior design studio"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `translateY(${-parallax * 0.3}px) scale(${1 + parallax * 0.002})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/50" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/50" />
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase font-body">
                {content.eyebrow}
              </span>
            </div>
            <h2 className={`${fontTitle} text-4xl sm:text-5xl md:text-6xl text-cream font-light leading-tight mb-6`}>
              {content.title}
              <span className="italic gold-gradient"> {content.titleAccent}</span>
            </h2>
            <p className={`text-cream/60 text-base md:text-lg leading-relaxed mb-10 font-body ${isAr ? 'font-body-ar' : ''}`}>
              {content.body}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {content.stats.map((stat, i) => (
                <div key={i} className="border-t border-gold/20 pt-4">
                  <div className={`${fontTitle} text-3xl md:text-4xl text-gold font-light mb-1`}>
                    {stat.value}
                  </div>
                  <div className={`text-cream/50 text-xs md:text-sm font-body ${isAr ? 'font-body-ar' : ''}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
