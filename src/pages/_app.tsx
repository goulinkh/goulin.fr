import Footer from "../components/common/Footer";
import { UserPreferencesProvider } from "../context/userPreferences";
import type { AppProps } from "next/app";
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
