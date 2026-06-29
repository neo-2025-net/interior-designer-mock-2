import { useLang } from '../context/LangContext';
import Magnetic from './Magnetic';

const servicesContent = {
  en: {
    eyebrow: 'What We Do',
    title: 'Services',
    titleAccent: 'crafted',
    items: [
      {
        img: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Residential Design',
        desc: 'Bespoke interiors for villas, apartments, and private residences.',
      },
      {
        img: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Commercial Spaces',
        desc: 'Offices, retail, and hospitality environments with quiet authority.',
      },
      {
        img: 'https://images.pexels.com/photos/6207759/pexels-photo-6207759.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Furniture & Styling',
        desc: 'Curated furnishings and styling that complete the narrative.',
      },
      {
        img: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Lighting Design',
        desc: 'Layered lighting plans that sculpt mood and atmosphere.',
      },
    ],
  },
  ar: {
    eyebrow: 'ماذا نقدم',
    title: 'خدمات',
    titleAccent: 'مصممة',
    items: [
      {
        img: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'تصميم سكني',
        desc: 'تصاميم داخلية مخصصة للفلل والشقق والمساكن الخاصة.',
      },
      {
        img: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'مساحات تجارية',
        desc: 'مكاتب وتجارة وضيافة بهدوء وثقة.',
      },
      {
        img: 'https://images.pexels.com/photos/6207759/pexels-photo-6207759.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'أثاث وتنسيق',
        desc: 'أثاث منتقى وتنسيق يكمل الرواية.',
      },
      {
        img: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'تصميم الإضاءة',
        desc: 'خطط إضاءة متعددة الطبقات تنحت المزاج والأجواء.',
      },
    ],
  },
};

export default function Services() {
  const { lang } = useLang();
  const content = servicesContent[lang];
  const isAr = lang === 'ar';
  const fontTitle = isAr ? 'font-display-ar' : 'font-display';

  return (
    <section id="services" className="relative py-20 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold-dark text-xs md:text-sm tracking-[0.3em] uppercase font-body">
              {content.eyebrow}
            </span>
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className={`${fontTitle} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal font-light leading-tight`}>
            {content.title}
            <span className="italic gold-gradient"> {content.titleAccent}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {content.items.map((item, i) => (
            <Magnetic
              key={i}
              className="card-hover group relative rounded-sm bg-white border border-charcoal/10 hover:border-gold/40 cursor-pointer overflow-hidden"
              strength={0.15}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                <div className="absolute top-3 left-3 text-gold-dark text-xs tracking-[0.3em] uppercase font-body">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              {/* Text */}
              <div className="p-5 md:p-6">
                <h3 className={`${fontTitle} text-xl md:text-2xl text-charcoal font-light mb-2 leading-tight`}>
                  {item.title}
                </h3>
                <p className={`text-charcoal/60 text-sm leading-relaxed font-body ${isAr ? 'font-body-ar' : ''}`}>
                  {item.desc}
                </p>
                <div className="mt-4 w-8 h-px bg-gold/40 group-hover:w-16 transition-all duration-500" />
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}
