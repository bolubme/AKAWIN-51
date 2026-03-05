import { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('EN')

  const t = translations[lang]

  // Update HTML lang attribute when language changes
  useEffect(() => {
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
