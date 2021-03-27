import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Logo } from 'src/components/Logo';

import { LangaugeSelector } from './LanguageSelector';

export function Header() {
  const { t } = useTranslation('common');
  const navItems = [
    { link: '/about', text: t('about') },
    { link: '/contact', text: t('contact') },
  ];
  return (
    <div className="w-full h-14 border-b border-gray-200">
      <div className="h-full container flex flex-row items-center justify-between">
        <Logo />
        <div className="h-full flex flex-row items-center space-x-4">
          {navItems.map((n) => (
            <Link key={n.link} href={n.link}>
              <span className="font-bold cursor-pointer hover:underline">{n.text}</span>
            </Link>
          ))}
        </div>
        <LangaugeSelector />
      </div>
    </div>
  );
}
