import { useLang } from '../context/LangContext';

const footerContent = {
  en: {
    tagline: 'Crafting Silent Luxury',
    rights: 'All rights reserved.',
    links: ['Portfolio', 'About', 'Services', 'Contact'],
  },
  ar: {
    tagline: 'نصنع الفخامة الصامتة',
    rights: 'جميع الحقوق محفوظة.',
    links: ['أعمالنا', 'من نحن', 'خدماتنا', 'تواصل'],
  },
};

export default function Footer() {
  const { lang } = useLang();
  const content = footerContent[lang];
  const isAr = lang === 'ar';
  const fontTitle = isAr ? 'font-display-ar' : 'font-display';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-light border-t border-gold/15 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-9 h-9 object-contain"
              // style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div>
              <div className={`${fontTitle} text-cream text-lg leading-tight`}>
                {isAr ? 'مصمم داخلي' : 'Interior Designer'}
              </div>
              <div className="text-gold/70 text-[10px] tracking-[0.25em] uppercase font-body">
                {content.tagline}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 md:gap-8">
            {content.links.map((link, i) => (
              <a
                key={i}
                href={`#${['portfolio', 'about', 'services', 'contact'][i]}`}
                className="text-cream/60 hover:text-gold transition-colors text-xs md:text-sm font-body tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-cream/40 text-xs font-body tracking-wide">
            © {year} {isAr ? 'مصمم داخلي' : 'Interior Designer'}. {content.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
