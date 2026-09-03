import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import IntroPage from './pages/IntroPage'
import MusicPage from './pages/MusicPage'
import NotFoundPage from './pages/NotFoundPage'
import StemPage from './pages/StemPage'

/** Start each page at the top, the way turning a page works. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <SiteHeader />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/stem" element={<StemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <SiteFooter />
    </div>
  )
}
