import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Favicon from "../components/head/Favicon";
import { UserPreferencesProvider } from "../context/userPreferences";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserPreferencesProvider>
      <Favicon />
      <Component {...pageProps} />
      <Footer />
    </UserPreferencesProvider>
  );
}

export default MyApp;
