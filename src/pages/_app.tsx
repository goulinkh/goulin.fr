import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { UserPreferencesProvider } from "../context/userPreferences";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserPreferencesProvider>
      <Component {...pageProps} />
    </UserPreferencesProvider>
  );
}

export default MyApp;
