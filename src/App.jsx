import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import './styles/App.css'

// Lazy load components
const Home = lazy(() => import('./components/pages/Home'))
const Architecture = lazy(() => import('./components/pages/Architecture'))
const Location = lazy(() => import('./components/pages/Location'))
const Residencies = lazy(() => import('./components/pages/Residencies'))
const About = lazy(() => import('./components/pages/About'))
const Contact = lazy(() => import('./components/pages/Contact'))

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <Home />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/architecture" element={
          <PageTransition>
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <Architecture />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/location" element={
          <PageTransition>
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <Location />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/residencies" element={
          <PageTransition>
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <Residencies />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <About />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
              <Contact />
            </Suspense>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Start fade-out after the progress bar animation completes (1.5s)
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1500)
    // Remove loader after fade-out transition (0.5s)
    const removeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  return (
    <>
      {isLoading && (
        <div className={`loader${isFading ? ' loader-fade-out' : ''}`}>
          <div className="loader-content">
            <h1 className="loader-title">AKAKIWN <span>50</span></h1>
            <div className="loader-bar">
              <div className="loader-progress"></div>
            </div>
          </div>
        </div>
      )}
      <LanguageProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main>
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </>
  )
}

export default App
