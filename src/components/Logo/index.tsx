import clsx from 'clsx';
import Link from 'next/link';

import styles from './logo.module.css';

export function Logo() {
  return (
    <Link href="/">
      <span
        className={clsx(
          'px-3 py-1 rounded-lg text-lg shadow-lg text-white font-mono cursor-pointer transition-transform transform hover:scale-105',
          styles['animate-bg'],
        )}
      >
        Goulin Khoge.
      </span>
    </Link>
  );
}
