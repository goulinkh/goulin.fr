import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';

import '../styles/main.css';

// eslint-disable-next-line react/jsx-props-no-spreading
const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
