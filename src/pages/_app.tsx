import type { AppProps } from "next/app";
import Favicon from "../components/Favicon";
import Footer from "../components/Footer";
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
