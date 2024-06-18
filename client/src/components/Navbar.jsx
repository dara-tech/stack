import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useStore from "../store";
import Button from "./Button";
import Logo from "./Logo";
import ThemeSwitch from "./Switch";
import LangSwitch from "./langSwitch";
import { useTranslation } from 'react-i18next';

function getInitials(fullName) {
  const names = fullName.split(" ");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}

const MobileMenu = ({ user, signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='flex'>
      <button
        onClick={toggleMenu}
        className='lg:hidden p-2 text-gray-600 hover:text-gray-800 ring-2 ring-gray-200 rounded-md hover:shadow-md duration-700'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div className='fixed top-0 left-0 w-full h-fit bg-white dark:bg-[#020b19] z-50 flex flex-col py-10 items-center justify-center shadow-xl gap-8 '>
          <Logo />
          <ul className='flex flex-col justify-center gap-4 text-base text-black dark:text-gray-300  '>
            <li onClick={toggleMenu}>
              <Link to='/' className="cursor-pointer hover:shadow-md duration-400 px-6 rounded-md py-1 dark:hover:bg-gray-800 dark:hover:shadow-green-700 duration-400">{t('home')}</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to='/'className="cursor-pointer hover:shadow-md  duration-400 px-6 rounded-md py-1 dark:hover:bg-gray-800 dark:hover:shadow-green-700 duration-400">{t('contact')}</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to='/' className="cursor-pointer hover:shadow-md  duration-400 px-6 rounded-md py-1 dark:hover:bg-gray-800 dark:hover:shadow-green-700 duration-400">{t('about')}</Link>
            </li>
          </ul>
          <div className='flex gap-2 items-center'>
            {user?.token ? (
              <div className='w-full flex  flex-col items-center justify-center '>
                <div className='flex gap-1 items-center mb-5'>
                  {user?.user.image ? (
                    <img
                      src={user?.user.image}
                      alt='Profile'
                      className='w-8 h-8 rounded-full'
                    />
                  ) : (
                    <span className='text-white w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center'>
                      {getInitials(user?.user.name)}
                    </span>
                  )}
                  <span className='font-medium text-black dark:text-gray-500'>
                    {user?.user.name}
                  </span>
                </div>

                <button
                  className='bg-black dark:bg-rose-600 text-white dark:text-white px-8 py-1.5 rounded-md text-center outline-none'
                  onClick={() => signOut()}
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link to='/sign-in'>
                <Button
                  label={t('signIn')}
                  styles='flex items-center justify-center bg-black dark:bg-gray-800 dark:text-black shadow-md dark:hover:bg-gray-800 dark:hover:text-white dark:hover:shadow-green-700 text-white dark:text-white text-white px-4 py-1.5 rounded-md'
                />
              </Link>
            )}
          </div>

          {/* language switch */}
          <LangSwitch />

          {/* theme switch */}
          <ThemeSwitch />

          <span
            className='cursor-pointer text-xl font-semibold dark:text-white ring-2 ring-gray-200 rounded-md p-2 hover:shadow-md'
            onClick={toggleMenu}
          >
            <AiOutlineClose />
          </span>
        </div>
      )}
    </div>
  );
};


const Navbar = () => {
  const { user, signOut } = useStore();
  const [showProfile, setShowProfile] = useState(false);
  const { t } = useTranslation();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
  };

  return (
    <nav className='flex flex-col md:flex-row w-full py-5  items-center justify-between gap-4 md:gap-0'>
      <div className='flex gap-2 text-[20px] md:hidden lg:flex'>
        <Link to='/' className='text-red-600 hover:text-red-500 shadow-md p-2 rounded-md hover:shadow-green-700  hover:shadow-sm dark:bg-gray-800' >
          <FaYoutube />
        </Link>
        <Link to='/' className='text-blue-600 hover:text-blue-500 shadow-md p-2 rounded-md hover:shadow-green-700  hover:shadow-sm dark:bg-gray-800'>
          <FaFacebook />
        </Link>
        <Link to='/' className='text-rose-600 hover:text-rose-500 shadow-md p-2 rounded-md hover:shadow-green-700  hover:shadow-sm dark:bg-gray-800'>
          <FaInstagram />
        </Link>
        <Link to='/' className='text-blue-500 hover:text-blue-500 shadow-md p-2 rounded-md hover:shadow-green-700  hover:shadow-sm dark:bg-gray-800'>
          <FaTwitterSquare />
        </Link>
      </div>

      <Logo />
      <div className='hidden md:flex gap-14 items-center'>
        <ul className='flex gap-8 text-base text-black dark:text-white'>
          <Link to='/'>{t('home')}</Link>
          <Link to='/'>{t('contact')}</Link>
          <Link to='/'>{t('about')}</Link>
        </ul>

        {/* language switch */}
        <LangSwitch />

        {/* theme switch */}
        <ThemeSwitch />

        <div className='flex gap-2 items-center cursor-pointer'>
          {user?.token ? (
            <div
              className='relative'
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <div className='flex gap-1 items-center cursor-pointer'>
                {user?.user.image ? (
                  <img
                    src={user?.user.image}
                    alt='Profile'
                    className='w-8 h-8 rounded-full'
                  />
                ) : (
                  <span className='text-white w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center'>
                    {getInitials(user?.user.name)}
                  </span>
                )}
                <span className='font-medium text-black dark:text-gray-500'>
                  {user?.user?.name?.split(" ")[0]}
                </span>
              </div>

              {showProfile && (
                <div className='absolute bg-white dark:bg-[#2f2d30] py-6 px-6 flex flex-col shadow-2xl z-50 right-0 gap-3 rounded'>
                  <span className='dark:text-white'>{t("Profile")}</span>
                  <span
                    className='border-t border-slate-300 text-rose-700'
                   
                    onClick={handleSignOut}
                  >
                    {t('logout')}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Link to='/sign-in'>
              <Button
                label={t('signIn')}
                styles='flex items-center justify-center bg-black dark:bg-gray-800 dark:text-black shadow-md dark:hover:bg-gray-800 dark:hover:text-white dark:hover:shadow-green-700 text-white dark:text-white text-white px-4 py-1.5 rounded-md'
              />
            </Link>
          )}
        </div>
      </div>
      <div className='md:hidden flex flex-row'>
        <MobileMenu user={user} signOut={handleSignOut} />
      </div>
    </nav>
  );
};

export default Navbar;
