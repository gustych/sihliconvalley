'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import deTranslations from '@/public/locales/de.json';
import enTranslations from '@/public/locales/en.json';

type Lang = 'de' | 'en';

interface Translations {
  [key: string]: string | Translations;
}

const translationMap: Record<Lang, Translations> = {
  de: deTranslations,
  en: enTranslations,
};

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'de',
  setLang: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'de' || saved === 'en') {
      // Read browser-only preference after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    const parts = key.split('.');
    let value: unknown = translationMap[lang];
    for (const part of parts) {
      if (value && typeof value === 'object' && part in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
