import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { links } from "../data/content"
import { useLanguage } from "../i18n/LanguageContext"
import LivingBackground from "./LivingBackground"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Cursor from "./Cursor"
import Intro from "./Intro"

function WhatsAppFab() {
  const { t, lang } = useLanguage()
  const text =
    lang === "ar"
      ? "مرحبًا، أود الاستفسار عن دورة Inspire للإسعافات الأولية"
      : "Hello, I would like to ask about the Inspire first aid course"
  return (
    <a
      href={`${links.whatsapp}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp}
      className="fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-rose text-white shadow-[0_10px_30px_rgba(226,59,87,.45)]"
      style={{ bottom: 20, insetInlineEnd: 20 }}
    >
      <span className="pulse-ring" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-current" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 14.04c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.4 1.02-.4.12 0 .23 0 .33.01.3.01.45.03.65.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.54.16.27.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.13.44.11.6-.07.17-.19.7-.81.88-1.09.19-.27.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.46.21.53.32.07.12.07.7-.17 1.38Z" />
      </svg>
    </a>
  )
}

export default function Layout() {
  const location = useLocation()
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (location.hash) {
      const id = window.setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 420)
      return () => window.clearTimeout(id)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [location.pathname, location.hash])

  return (
    <>
      <LivingBackground />
      <Cursor />
      <Intro />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        {t.skip}
      </a>
      <Navbar />
      <motion.main
        id="main"
        key={location.pathname}
        className="relative z-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
        <Footer />
      </motion.main>
      <WhatsAppFab />
    </>
  )
}
