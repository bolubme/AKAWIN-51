import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Preloader from './components/Preloader'
import './styles/App.css'

// Lazy load components
const Home = lazy(() => import('./components/pages/Home'))
const Architecture = lazy(() => import('./components/pages/Architecture'))
const Location = lazy(() => import('./components/pages/Location'))
const Residencies = lazy(() => import('./components/pages/Residencies'))
const About = lazy(() => import('./components/pages/About'))
const Contact = lazy(() => import('./components/pages/Contact'))

function PageLoadingOverlay({ isHome }) {
  return (
    <div className="page-loading-overlay">
      {isHome ? (
        <div className="home-preloader">
          <div className="home-preloader-brand">
            <span>AKAKIWN</span>
            <span>50</span>
          </div>
          <div className="home-preloader-copy">Architecture. Living. Place.</div>
          <div className="home-preloader-lines">
            <span className="line line--left"></span>
            <span className="line line--center"></span>
            <span className="line line--right"></span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Suspense fallback={<PageLoadingOverlay isHome={location.pathname === '/'} />}>
              <Home />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/architecture" element={
          <PageTransition>
            <Suspense fallback={<PageLoadingOverlay isHome={location.pathname === '/'} />}>
              <Architecture />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/location" element={
          <PageTransition>
            <Suspense fallback={<PageLoadingOverlay isHome={location.pathname === '/'} />}>
              <Location />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/residencies" element={
          <PageTransition>
            <Suspense fallback={<PageLoadingOverlay isHome={location.pathname === '/'} />}>
              <Residencies />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <Suspense fallback={<PageLoadingOverlay isHome={location.pathname === '/'} />}>
              <About />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Suspense fallback={<PageLoadingOverlay isHome={location.pathname === '/'} />}>
              <Contact />
            </Suspense>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <LanguageProvider>
      <Router>
        {loading && <Preloader onDone={() => setLoading(false)} />}
        <div className="app">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
