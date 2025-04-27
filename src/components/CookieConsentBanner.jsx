import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

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
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000009a]  z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Cookie settings</h2>
        <p className="text-sm mb-6">
          We use <strong>cookies</strong> to provide you with the best possible experience. 
          They also allow us to analyze user behavior in order to constantly improve the website for you.
          <Link to="/privacy-policy" className="underline ml-1">Privacy Policy</Link>
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked disabled className="w-5 h-5" />
            <label className="text-sm font-medium">Essential (Authentication, Session, Language )</label>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={analyticsConsent} 
              onChange={() => setAnalyticsConsent(!analyticsConsent)} 
              className="w-5 h-5" 
            />
            <label className="text-sm">Analytics</label>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-900"
          >
            Accept All
          </button>
          <button
            onClick={handleAcceptEssential}
            className="flex-1 px-4 py-2 border border-black font-semibold rounded hover:bg-gray-100"
          >
            Only Essentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentPopup;
