import { lazy, Suspense } from "react"

import { HomePage } from "@pages/home-page"

const AboutPage = lazy(() => import("@pages/about-page"))
const ShowcasePage = lazy(() => import("@pages/showcase-page"))
const NotFoundPage = lazy(() => import("@pages/not-found-page"))

export const App = () => {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/"

  if (pathname === "/about") {
    return (
      <Suspense fallback={null}>
        <AboutPage />
      </Suspense>
    )
  }

  if (pathname === "/showcase") {
    return (
      <Suspense fallback={null}>
        <ShowcasePage />
      </Suspense>
    )
  }

  if (pathname === "/") {
    return <HomePage />
  }

  return (
    <Suspense fallback={null}>
      <NotFoundPage />
    </Suspense>
  )
}

export default App
