import { useLang } from '../context/LangContext';
import Magnetic from './Magnetic';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

const contactContent = {
  en: {
    eyebrow: 'Begin the Conversation',
    title: 'Let us craft',
    titleAccent: 'your space',
    body: 'Every great interior begins with a single message. Reach out to schedule a private consultation.',
    whatsapp: 'WhatsApp Consultation',
    email: 'hello@lamsatayar.design',
    location: 'Tabuk, Saudi Arabia',
    phone: '+966 508142154',
    cta: 'Send Message',
  },
  ar: {
    eyebrow: 'ابدأ المحادثة',
    title: 'دعنا نصنع',
    titleAccent: 'مساحتك',
    body: 'كل تصميم داخلي عظيم يبدأ برسالة واحدة. تواصل معنا لجدولة استشارة خاصة.',
    whatsapp: 'استشارة واتساب',
    email: 'hello@lamsatayar.com',
    location: 'تبوك، المملكة العربية السعودية',
    phone: '+966 508142154',
    cta: 'إرسال',
  },
};

export default function Contact() {
  const { lang } = useLang();
  const content = contactContent[lang];
  const isAr = lang === 'ar';
  const fontTitle = isAr ? 'font-display-ar' : 'font-display';

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-charcoal overflow-hidden">
      {/* Subtle gold glow */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)',
      }} />

      <div className="relative max-w-5xl mx-auto px-5 md:px-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-10 h-px bg-gold" />
          <span className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase font-body">
            {content.eyebrow}
          </span>
          <span className="w-10 h-px bg-gold" />
        </div>

        <h2 className={`${fontTitle} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream font-light leading-tight mb-6`}>
          {content.title}
          <span className="italic gold-gradient"> {content.titleAccent}</span>
        </h2>

        <p className={`text-cream/60 text-base md:text-lg max-w-xl mx-auto mb-10 font-body ${isAr ? 'font-body-ar' : ''}`}>
          {content.body}
        </p>

        {/* WhatsApp CTA */}
        <Magnetic
          as="a"
          href="https://wa.me/966508142154"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-pulse relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-charcoal text-sm md:text-base font-body font-medium tracking-wide hover:bg-gold-light transition-colors mb-12"
        >
          <MessageCircle size={20} />
          {content.whatsapp}
        </Magnetic>

        {/* Contact details */}
        <div className="grid sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto pt-10 border-t border-gold/15">
          <div className="flex flex-col items-center gap-2">
            <Mail size={18} className="text-gold/70" />
            <span className="text-cream/70 text-sm font-body">{content.email}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone size={18} className="text-gold/70" />
            <span className="text-cream/70 text-sm font-body" dir="ltr">{content.phone}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin size={18} className="text-gold/70" />
            <span className={`text-cream/70 text-sm font-body ${isAr ? 'font-body-ar' : ''}`}>{content.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
