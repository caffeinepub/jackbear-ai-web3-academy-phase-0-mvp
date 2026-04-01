import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import {
  type Language,
  type Translations,
  getCurrentLanguage,
  getTranslations,
  storeLanguage,
} from "../lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(getCurrentLanguage());
  const [t, setTranslations] = useState<Translations>(
    getTranslations(language),
  );

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    storeLanguage(lang);
    setTranslations(getTranslations(lang));
  };

  useEffect(() => {
    setTranslations(getTranslations(language));
  }, [language]);

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children,
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
