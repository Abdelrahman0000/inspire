import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from "../i18n/LanguageContext"

export default function Intro() {
  const { t } = useLanguage()
  const [done, setDone] = useState(() => sessionStorage.getItem("inspire-intro") === "1")

  const finish = () => {
    sessionStorage.setItem("inspire-intro", "1")
    setDone(true)
  }

  useEffect(() => {
    if (done) return undefined
    const id = setTimeout(finish, 1600)
    return () => clearTimeout(id)
  }, [done])

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.button
          type="button"
          className="intro"
          onClick={finish}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          aria-label={t.skip}
        >
          <div className="w-[min(520px,86vw)] text-center">
            <img src="/brand/logo.jpg" alt="" className="logo-beat mx-auto h-28 w-28 rounded-full object-cover" />
            <p className="font-syne mt-6 text-sm tracking-[0.45em] text-cyan">INSPIRE</p>
            <p className="mt-3 text-muted">{t.intro}</p>
            <div className="mx-auto mt-6 h-10 overflow-hidden text-rose">
              <svg viewBox="0 0 260 40" className="h-full w-full">
                <path className="suture-path" d="M0 22 H70 L82 8 L96 34 L108 12 L120 22 H260" />
              </svg>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
