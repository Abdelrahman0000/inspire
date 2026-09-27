import { Link } from "react-router-dom"
import { useLanguage } from "../i18n/LanguageContext"
import { PageHero, Reveal } from "../components/bits"

export default function Certificate() {
  const { t } = useLanguage()

  return (
    <>
      <PageHero kicker={t.certKicker} title={t.certTitle} text={t.certLead} />
      <section className="px-5 py-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal className="min-w-0">
            <ul className="space-y-4">
              {t.certPoints.map((point, index) => (
                <li key={point} className="flex items-start gap-4 rounded-3xl border border-line bg-card p-4">
                  <span className="shrink-0 font-syne text-cyan">0{index + 1}</span>
                  <span className="min-w-0 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-6 inline-flex rounded-full bg-rose px-5 py-3 text-sm font-semibold text-white">
              {t.ask}
            </Link>
          </Reveal>
          <Reveal className="min-w-0" delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {["/gallery/cert-2026-a.jpg", "/gallery/cert-2026-b.jpg"].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={t.certTitle}
                  decoding="async"
                  className="h-36 w-full rounded-[24px] bg-card object-contain sm:h-52 lg:h-64"
                />
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2">
          <img
            src="/gallery/cert-handover.jpg"
            alt={t.certificate}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-[28px] object-cover"
          />
          <img
            src="/gallery/group-certs.jpg"
            alt={t.certificate}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-[28px] object-cover"
          />
        </div>
      </section>
    </>
  )
}
