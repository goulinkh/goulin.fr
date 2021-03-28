import { useState } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Logo } from 'src/components/Logo';

import { LangaugeSelector } from './LanguageSelector';
import { ToggleDarkMode } from './ToggleDarkMode';

export function Header({ className }: { className?: string }) {
  const { t } = useTranslation('common');
  const navItems = [
    { link: '/about', text: t('about') },
    { link: '/contact', text: t('contact') },
  ];
  const [burgerMenu, setBurgerMenu] = useState(false);
  return (
    <div
      className={clsx(
        'sticky top-0 w-full h-14 border-b border-gray-200 dark:bg-gray-900 bg-opacity-75 bg-gray-100 dark:text-gray-50 dark:border-gray-700 z-20',
        className,
      )}
    >
      <div className="h-full container flex flex-row items-center justify-between">
        <Logo />
        <div className="h-full flex-row items-center space-x-10 hidden lg:flex">
          {navItems.map((n) => (
            <Link key={n.link} href={n.link}>
              <span className="font-bold cursor-pointer hover:opacity-60">{n.text}</span>
            </Link>
          ))}
        </div>
        <div className="h-full flex flex-row items-center space-x-4">
          <LangaugeSelector />
          <ToggleDarkMode />
          <button
            className="lg:hidden rounded-full transition-all transform hover:scale-y-110"
            type="button"
            onClick={() => {
              setBurgerMenu(true);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={clsx(
            'left-0 top-0 fixed bg-gray-800 text-gray-200 w-screen h-screen transition-all ease-out duration-200 transform z-20',
            {
              'opacity-100 scale-100 block': burgerMenu,
              'opacity-0 scale-0 pointer-events-none': !burgerMenu,
            },
          )}
        >
          <div className="w-full h-full flex flex-col p-10">
            <div className="w-full flex flex-row items-center justify-between">
              <Logo />
              <button
                className="lg:hidden rounded-full transition-all transform hover:scale-110 hover:text-gray-400"
                type="button"
                onClick={() => {
                  setBurgerMenu(false);
                }}
              >
                <svg
                  className="w-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full flex-col flex my-10">
              {navItems.map((n) => (
                <Link key={n.link} href={n.link}>
                  <span className="font-bold cursor-pointer hover:opacity-60 py-6 border-gray-600 border-b last:border-b-0">
                    {n.text}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
