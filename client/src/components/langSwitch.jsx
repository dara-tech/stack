// components/LangSwitch.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LangSwitch = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'km' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <div className="flex items-center p-4">
      <button
        className="flex items-center justify-center text-base outline-nones bg-black dark:bg-gray-800  shadow-md dark:hover:bg-gray-800 dark:hover:text-white dark:hover:shadow-green-700 text-white dark:text-white px-4 py-1.5 rounded-md"
        onClick={toggleLanguage}
        style={{ fontFamily: i18n.language === 'km' ? 'Suwannaphum, sans-serif' : 'inherit' }}
        >
        {i18n.language === 'km' ? 'ខ្មែរ' : 'EN'}
      </button>
    </div>
  );
};

export default LangSwitch;
