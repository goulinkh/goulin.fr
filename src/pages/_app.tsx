import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import { UserPreferencesProvider } from "../context/userPreferences";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserPreferencesProvider>
      <Component {...pageProps} />
      <Footer />
    </UserPreferencesProvider>
  );
}

export default MyApp;
