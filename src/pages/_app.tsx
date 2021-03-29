import { useContext, useEffect } from 'react';

import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ThemeContext, ThemeProvider } from 'src/context/theme';
import '../styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (process.browser) {
      if (theme === 'dark') {
        document.querySelector('html')?.classList.add('dark');
        document.querySelector('html')?.classList.remove('light');
      } else {
        document.querySelector('html')?.classList.remove('dark');
        document.querySelector('html')?.classList.add('light');
      }
    }
  }, [theme]);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};

const App = (props: any) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT}
    language="french"
    scriptProps={{ appendTo: 'body' }}
  >
    <ThemeProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <MyApp {...props} />
    </ThemeProvider>
  </GoogleReCaptchaProvider>
);
export default appWithTranslation(App);
