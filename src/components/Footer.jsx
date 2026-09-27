import { Link } from "react-router-dom"
import { links } from "../data/content"
import { useLanguage } from "../i18n/LanguageContext"
import { Stitch } from "./bits"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative z-10 mt-10">
      <Stitch />
      <div className="chamber px-5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <img src="/brand/logo.jpg" alt="" className="mb-4 h-16 w-16 rounded-full object-cover" />
            <p className="font-syne text-sm tracking-[0.35em] text-cyan">INSPIRE</p>
            <p className="mt-2 max-w-md text-lg">{t.footer}</p>
            <p className="mt-2 text-sm text-soft">{t.rights}</p>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm">
            <a className="num text-2xl text-rose" href={`tel:${links.phoneTel}`}>
              {links.phone}
            </a>
            <a href={links.facebook} target="_blank" rel="noreferrer">
              {t.facebook}
            </a>
            <a href={links.tiktok} target="_blank" rel="noreferrer">
              {t.tiktok}
            </a>
            <Link to="/contact" className="text-cyan">
              {t.ask}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
