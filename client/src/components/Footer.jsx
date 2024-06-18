import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <div className='flex flex-col md:flex-row w-full py-8 items-center justify-between text-[14px] text-gray-700 dark:text-gray-500'>
      <div className='flex-1 text-center md:text-left'>
        <p className="flex">© {currentYear} Dara <p className=" front-bold rounded-md px-1 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "> Blog</p>. {t("All rights reserved.")}</p>
      </div>
      <div className='flex-1 flex justify-center mt-4 md:mt-0 gap-5'>
        <Link to='/contact' className='hover:underline'>{t("Contact")}</Link>
        <Link to='/' className='hover:underline'>{t("Terms of Service")}</Link>
        <Link to='/' target='_blank' className='hover:underline'>{t("Privacy Policy")}</Link>
      </div>
      <div className='flex-1 flex justify-center md:justify-end mt-4 md:mt-0 gap-5'>
        <Link to='/' className='text-red-600 hover:text-red-500 shadow-md p-2 rounded-md hover:shadow-gray-300 hover:shadow-sm dark:bg-gray-800'>
          <FaYoutube />
        </Link>
        <Link to='/' className='text-blue-600 hover:text-blue-500 shadow-md p-2 rounded-md hover:shadow-gray-300 hover:shadow-sm dark:bg-gray-800'>
          <FaFacebook />
        </Link>
        <Link to='/' className='text-rose-600 hover:text-rose-500 shadow-md p-2 rounded-md hover:shadow-gray-300 hover:shadow-sm dark:bg-gray-800'>
          <FaInstagram />
        </Link>
        <Link to='/' className='text-blue-500 hover:text-blue-500 shadow-md p-2 rounded-md hover:shadow-gray-300 hover:shadow-sm dark:bg-gray-800'>
          <FaTwitterSquare />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
