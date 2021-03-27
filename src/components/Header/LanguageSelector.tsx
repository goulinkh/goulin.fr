import React, { useState } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import EnglishSVG from 'public/icons/english.svg';
import FrenchSVG from 'public/icons/french.svg';

export function LangaugeSelector() {
  const [hidden, setHidden] = useState(true);
  const { i18n } = useTranslation();
  const router = useRouter();
  const languages = [
    { lang: 'en', logo: <EnglishSVG className="w-7 h-auto mx-auto rounded" /> },
    { lang: 'fr', logo: <FrenchSVG className="w-7 h-auto mx-auto rounded" /> },
  ];
  const availableLanguages = languages.filter((l) => l.lang !== i18n.language);
  const currentLanguage = languages.find((l) => l.lang === i18n.language);
  if (!languages.length) return null;

  return (
    <div className="h-full flex flex-row items-center">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400 dark:bg-gray-900 dark:text-gray-500 dark:border-gray-700 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-800"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setHidden(!hidden)}
          >
            {currentLanguage?.logo}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {!hidden && (
          <div
            className="h-screen w-screen fixed left-0 top-0 focus:outline-none"
            onClick={() => setHidden(true)}
            aria-hidden="true"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="hide-menu"
          />
        )}
        <div
          className={clsx(
            'origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none dark:bg-gray-900 dark:text-gray-500 dark:border dark:border-gray-700 dark:focus:ring-offset-gray-800',
            {
              'transition ease-out duration-100 transform opacity-100 scale-100': !hidden,
              'transition ease-in duration-75 transform opacity-0 scale-95 pointer-events-none': hidden,
            },
          )}
          pointer-events-none="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div role="none">
            {availableLanguages.map((l) => (
              <Link key={l.lang} href={router.asPath} locale={l.lang}>
                <span className="block cursor-pointer p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800">
                  {l.logo}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
