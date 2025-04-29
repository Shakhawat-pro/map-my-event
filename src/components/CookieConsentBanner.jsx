import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContex';

const CookieConsentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useContext(LanguageContext);
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setShowPopup(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      essential: true,
      analytics: true,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setShowPopup(false);
  };

  const handleAcceptEssential = () => {
    const consentData = {
      essential: true,
      analytics: false,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000009a] z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className='flex justify-between '>
          <h2 className="text-2xl font-bold mb-4">{t('cookiePopup.title')}</h2>
          <div className={`w-20 h-10 flex items-center bg-black rounded-full p-1 cursor-pointer transition-all duration-300 scale-[60%] -ml-3 -mr-3 min-[400px]:-mr-1`}
            onClick={toggleLanguage}>
            <div className={`w-10 h-8 flex items-center justify-center font-bold rounded-full bg-white transition-all duration-300 ${currentLanguage === 'fr' ? "translate-x-0" : "translate-x-8"}`}>
              {currentLanguage === 'fr' ? "FR" : "EN"}
            </div>
            <span className={`absolute text-white font-bold transition-all duration-300 ${currentLanguage === 'fr' ? "ml-11" : "ml-2"}`}>
              {currentLanguage === 'fr' ? "EN" : "FR"}
            </span>
          </div>
        </div>
        <p className="text-sm mb-5" dangerouslySetInnerHTML={{
          __html: t('cookiePopup.description')
        }} />
        <Link to="/privacy-policy" className="underline ml-1 ">
          {t('cookiePopup.privacyPolicy')}
        </Link>

        <div className="flex flex-col gap-4 mb-6 mt-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked disabled className="w-5 h-5" />
            <label className="text-sm font-medium">{t('cookiePopup.essentialLabel')}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={analyticsConsent}
              onChange={() => setAnalyticsConsent(!analyticsConsent)}
              className="w-5 h-5"
            />
            <label className="text-sm">{t('cookiePopup.analyticsLabel')}</label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-900"
          >
            {t('cookiePopup.acceptAll')}
          </button>
          <button
            onClick={handleAcceptEssential}
            className="flex-1 px-4 py-2 border border-black font-semibold rounded hover:bg-gray-100"
          >
            {t('cookiePopup.acceptEssential')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentPopup;