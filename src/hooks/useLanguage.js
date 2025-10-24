import { useState, useEffect } from 'react'
import en from '../translations/en.json'
import ua from '../translations/ua.json'
import ru from '../translations/ru.json'
import { DEFAULT_LANGUAGE } from '../constants/languages'

const translations = { en, ua, ru }

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || DEFAULT_LANGUAGE
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = translations[language]

  return { language, setLanguage, t }
}

