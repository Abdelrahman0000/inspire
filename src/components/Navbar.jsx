import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useLanguage } from "../i18n/LanguageContext"
import { useTheme } from "../theme/ThemeContext"

export default function Navbar() {
  const { t, toggle } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 12
      setScrolled((prev) => (prev === next ? prev : next))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled || open ? "bg-nav shadow-[0_10px_40px_rgba(16,40,58,.12)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/brand/logo.jpg" alt="Inspire" className="h-12 w-12 rounded-full object-cover" />
            <span className="hidden leading-tight sm:block">
            <span className="font-syne block text-sm tracking-[0.28em]">INSPIRE</span>
            <span className="block max-w-44 text-[11px] leading-4 text-cyan">{t.slogan}</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-5 lg:flex">
          {t.nav.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative text-sm ${isActive ? "text-cyan" : "text-muted hover:text-fg"}`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose logo-beat" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-11 w-11 place-items-center rounded-full border border-cyan/50 text-cyan"
            aria-label={theme === "dark" ? t.themeToLight : t.themeToDark}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-cyan/50 px-3 py-1.5 text-sm text-cyan"
            aria-label={t.lang}
          >
            {t.lang}
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t.close : t.menu}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="chamber h-[calc(100vh-72px)] overflow-auto px-6 py-8 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {t.nav.map(([to, label], index) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink to={to} end={to === "/"} className="block border-b border-line py-4 text-3xl font-black">
                  {label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
