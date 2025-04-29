import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from './LanguageContex';


export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language );
  
  const changeLanguage = React.useCallback((lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  }, [i18n]);

  useEffect(() => {
    // Set initial language from localStorage or browser
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      if (savedLang !== currentLanguage) {
        changeLanguage(savedLang);
      }
    } else {
      changeLanguage('fr'); // default to French
    }
  }, [changeLanguage, currentLanguage]);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'fr' : 'en';
    changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

