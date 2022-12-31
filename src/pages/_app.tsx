import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import { UserPreferencesProvider } from "../context/userPreferences"
import "../styles/globals.scss"

function MyApp({ Component, pageProps }: any) {
  return (
    <UserPreferencesProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </UserPreferencesProvider>
  )
}

export default MyApp
