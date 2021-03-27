import { useContext } from 'react';

import clsx from 'clsx';
import DarkSVG from 'public/icons/dark.svg';
import LightSVG from 'public/icons/light.svg';
import { ThemeContext } from 'src/context/theme';

export function ToggleDarkMode() {
  const { theme, setTheme } = useContext(ThemeContext);
  if (!process.browser) return null;
  return (
    <div className="h-full flex flex-row items-center  ">
      {theme === 'dark' ? (
        <button
          className={clsx(
            'transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-indigo-400 rounded',
          )}
          onClick={() => setTheme('light')}
          type="button"
        >
          <LightSVG className="w-6 text-white" />
        </button>
      ) : (
        <button
          className={clsx(
            'transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400 rounded',
          )}
          onClick={() => setTheme('dark')}
          type="button"
        >
          <DarkSVG className="w-6 text-black" />
        </button>
      )}
    </div>
  );
}
