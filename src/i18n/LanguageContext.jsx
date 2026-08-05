import { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext()

// Restore the saved choice; otherwise fall back to the browser language.
function getInitialLang() {
  if (typeof window === 'undefined') return 'EN'
  const saved = localStorage.getItem('lang')
  if (saved === 'EN' || saved === 'GR') return saved
  return navigator.language?.toLowerCase().startsWith('el') ? 'GR' : 'EN'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  const t = translations[lang]

  // Persist the choice and keep the HTML lang attribute in sync.
  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'GR' ? 'el' : 'en'
    document.documentElement.setAttribute('data-lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
