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
          <Reveal>
            <ul className="space-y-4">
              {t.certPoints.map((point, index) => (
                <li key={point} className="flex gap-4 rounded-3xl border border-line bg-card p-4">
                  <span className="font-syne text-cyan">0{index + 1}</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-6 inline-flex rounded-full bg-rose px-5 py-3 text-sm font-semibold text-white">
              {t.ask}
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="relative">
              <span className="pulse-ring pulse-ring--out" />
              <img
                src="/gallery/certificates.jpg"
                alt={t.certTitle}
                loading="lazy"
                decoding="async"
                className="relative rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,.35)]"
              />
            </figure>
          </Reveal>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2">
          <img src="/gallery/cert-handover.jpg" alt={t.certificate} loading="lazy" decoding="async" className="h-80 w-full rounded-[28px] object-cover" />
          <img src="/gallery/group-certs.jpg" alt={t.certificate} loading="lazy" decoding="async" className="h-80 w-full rounded-[28px] object-cover" />
        </div>
      </section>
    </>
  )
}
