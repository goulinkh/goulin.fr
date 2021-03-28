import { useTranslation } from 'next-i18next';
import GithubSVG from 'public/icons/github.svg';
import TwitterSVG from 'public/icons/twitter.svg';

export function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="border-t border-gray-200 bg-white dark:bg-gray-800 dark:bg-opacity-75 dark:text-gray-50 dark:border-gray-700">
      <div className="container grid grid-rows-2 lg:grid-rows-0 lg:grid-cols-2 py-20 space-y-4 lg:space-y-0">
        <div className="space-y-2">
          <h2 className="font-bold">{t('footer-title')}</h2>
          <p className="opacity-60">{t('footer-description')}</p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold">{t('social-title')}</h2>
          <a
            className="flex flex-row space-x-2 transition hover:text-indigo-500"
            href="https://github.com/goulinkh/goulin.fr"
          >
            <GithubSVG className="w-5" />
            <span>{t('view-source')}</span>
          </a>
          <a
            className="flex flex-row space-x-2 transition hover:text-indigo-500"
            href="https://twitter.com/GoulinKH"
          >
            <TwitterSVG className="w-5" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
