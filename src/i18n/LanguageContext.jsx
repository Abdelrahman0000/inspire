import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { ui } from "../data/content"

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("inspire-lang") || "ar"
    } catch {
      return "ar"
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.title =
      lang === "ar" ? "Inspire | بوابة النجاة في الإسعافات الأولية" : "Inspire | Salvation Gate in First Aid"
    try {
      localStorage.setItem("inspire-lang", lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: ui[lang],
      toggle: () => setLang((current) => (current === "ar" ? "en" : "ar")),
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider")
  return context
}

export function pick(value, lang) {
  if (value && typeof value === "object" && "ar" in value) return value[lang]
  return value
}
