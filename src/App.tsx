import { AboutPage } from "@pages/about-page"
import { HomePage } from "@pages/home-page"

export const App = () => {
  if (window.location.pathname === "/about") {
    return <AboutPage />
  }

  return <HomePage />
}

export default App
