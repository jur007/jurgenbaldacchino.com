import { lazy, Suspense } from "react"

import { HomePage } from "@pages/home-page"

const AboutPage = lazy(() => import("@pages/about-page"))

export const App = () => {
  if (window.location.pathname === "/about") {
    return (
      <Suspense fallback={null}>
        <AboutPage />
      </Suspense>
    )
  }

  return <HomePage />
}

export default App
