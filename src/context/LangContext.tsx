import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'en' | 'ar';

interface LangContextType {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  dir: 'ltr',
  toggle: () => {},
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((p) => (p === 'en' ? 'ar' : 'en'));

  return (
    <LangContext.Provider value={{ lang, dir, toggle, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
