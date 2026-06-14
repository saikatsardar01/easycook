'use client'
import { useEffect, useState } from 'react';

const LANGUAGES = [
  { code: '/auto/en', label: 'English', flag: '🇺🇸' },
  { code: '/auto/hi', label: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: '/auto/bn', label: 'Bengali (বাংলা)', flag: '🇮🇳' },
  { code: '/auto/mr', label: 'Marathi (मराठी)', flag: '🇮🇳' },
  { code: '/auto/gu', label: 'Gujarati (ગુજરાતી)', flag: '🇮🇳' },
  { code: '/auto/ta', label: 'Tamil (தமிழ்)', flag: '🇮🇳' },
  { code: '/auto/te', label: 'Telugu (తెలుగు)', flag: '🇮🇳' },
  { code: '/auto/kn', label: 'Kannada (ಕನ್ನಡ)', flag: '🇮🇳' },
  { code: '/auto/pa', label: 'Punjabi (ਪੰਜਾਬੀ)', flag: '🇮🇳' },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState('/auto/en');

  // Helper to set cookies reliably
  const setGoogleCookie = (value: string) => {
      const d = new Date();
      d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 Days
      const expires = "expires=" + d.toUTCString();
      
      // 1. Set for current domain
      document.cookie = "googtrans=" + value + ";" + expires + ";path=/";
      
      // 2. Set for top-level domain (important for some hosting setups)
      const domain = window.location.hostname;
      document.cookie = "googtrans=" + value + ";" + expires + ";path=/;domain=" + domain;
      
      // 3. Set for .domain (wildcard) just in case
      document.cookie = "googtrans=" + value + ";" + expires + ";path=/;domain=." + domain;
  };

  useEffect(() => {
    // 1. READ COOKIE
    const match = document.cookie.match(new RegExp('(^| )googtrans=([^;]+)'));
    if (match) {
        const cookieValue = match[2]; 
        const langCode = cookieValue.split('/').pop(); 
        const supportedLang = LANGUAGES.find(l => l.code.endsWith('/' + langCode));
        if (supportedLang) {
            setSelected(supportedLang.code);
        }
    }

    // 2. INITIALIZE GOOGLE TRANSLATE
    // We define the function globally so the script can call it
    window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
                { 
                    pageLanguage: 'en', 
                    autoDisplay: false,
                    includedLanguages: 'en,hi,bn,mr,gu,ta,te,kn,pa',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
            );
        }
    };

    // 3. LOAD SCRIPT
    // Check if script is already there to avoid duplicates
    if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    } else {
        // If script exists but init didn't fire, try firing it manually
        if (window.googleTranslateElementInit) window.googleTranslateElementInit();
    }

    // 4. CLEANUP OBSERVER (Removes Top Bar)
    const observer = new MutationObserver(() => {
        const iframe = document.querySelector('.goog-te-banner-frame');
        const body = document.body;

        if (iframe) {
            iframe.remove(); 
        }

        if (body.style.top !== '0px') {
            body.style.top = '0px';
            body.style.position = 'static';
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const handleLanguageChange = (value: string) => {
    setGoogleCookie(value);
    setSelected(value);
    window.location.reload();
  };

  return (
    <div className="notranslate relative group z-50">
      {/* FIX: Do NOT use 'hidden'. Google needs to "see" this div.
         We use w-0 h-0 overflow-hidden to hide it visually but keep it in the DOM.
      */}
      <div id="google_translate_element" className="absolute w-0 h-0 overflow-hidden" />
      
      <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-full px-3 py-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer">
        <span className="text-lg animate-pulse">🗣️</span>
        <select 
          value={selected}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="bg-transparent font-bold text-stone-600 text-sm appearance-none cursor-pointer focus:outline-none w-24 md:w-auto"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-black">
              {lang.label}
            </option>
          ))}
        </select>
        <span className="text-xs text-stone-400 pointer-events-none">▼</span>
      </div>
    </div>
  );
}