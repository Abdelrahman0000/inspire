import { Link } from "react-router-dom"
import { gallery, topics } from "../data/content"
import { links } from "../data/content"
import { useLanguage } from "../i18n/LanguageContext"
import { BodyFigure, Monitor, Reveal, Stitch } from "../components/bits"

const film = [
  "cpr-mannequin.jpg",
  "injection.jpg",
  "suture-demo.jpg",
  "nutrition-class.jpg",
  "certificates.jpg",
  "check-call-care.jpg",
  "hall-balcony.jpg",
  "bp-measure.jpg",
]

export default function Home() {
  const { t, lang } = useLanguage()
  const shots = gallery.filter((item) => film.some((name) => item.src.endsWith(name)))
  const loop = [...shots, ...shots]
  const words = [...topics[lang], ...topics[lang]]

  return (
    <>
      <section className="relative px-5 pt-28 pb-8 lg:flex lg:min-h-svh lg:items-center">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="kicker text-xs tracking-[0.32em] text-cyan uppercase">{t.homeKicker}</p>
            <h1 className="mt-4 text-[clamp(3.4rem,9vw,7.4rem)] leading-[0.88] font-black">
              {lang === "ar" ? (
                <>
                  بوابة
                  <span className="block text-cyan">النجاة</span>
                </>
              ) : (
                <span className="font-syne">
                  Salvation
                  <span className="block text-cyan">Gate</span>
                </span>
              )}
            </h1>
            <p className={`mt-4 text-muted ${lang === "ar" ? "font-syne tracking-[0.16em] uppercase" : "text-xl"}`}>
              {t.sloganEn}
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{t.homeLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/program" className="rounded-full bg-rose px-5 py-3 text-sm font-semibold text-white">
                {t.explore}
              </Link>
              <a
                href={`${links.whatsapp}?text=${encodeURIComponent(t.homeLead)}`}
                className="rounded-full border border-cyan/60 px-5 py-3 text-sm text-cyan"
              >
                {t.ask}
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-md">
            <div className="absolute inset-6">
              <span className="pulse-ring" />
            </div>
            <div className="absolute inset-y-0 start-0 w-[58%] opacity-90">
              <BodyFigure />
            </div>
            <img
              src="/brand/logo.jpg"
              alt="Inspire"
              className="logo-beat absolute end-2 top-16 h-40 w-40 rounded-full object-cover shadow-[0_0_40px_rgba(58,209,239,.35)]"
            />
            <div className="absolute inset-x-0 bottom-2">
              <Monitor />
            </div>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee__track">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="flex items-center gap-5 text-sm text-muted tracking-wide">
              {word}
              <i className="inline-block h-1.5 w-1.5 rounded-full bg-rose" />
            </span>
          ))}
        </div>
      </div>

      <section className="ecg-paper px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="font-syne text-7xl text-rose/80">P · QRS · T</p>
            <h2 className="mt-3 text-4xl leading-tight font-black">{t.rhythmTitle}</h2>
          </Reveal>
          <div className="grid gap-4">
            {t.steps.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.08} className="flex items-center gap-4 rounded-3xl bg-white/70 p-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink font-syne text-cyan">
                  0{index + 1}
                </span>
                <span>
                  <span className="block text-xl font-bold">{title}</span>
                  <span className="text-ink/70">{text}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stitch />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-4xl font-black md:text-5xl">{t.tracksTitle}</h2>
            <p className="mt-3 max-w-2xl text-muted">{t.tracksText}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["01", lang === "ar" ? "إسعافات أولية" : "First aid", "/program#first-aid"],
              ["02", "OTC", "/program#otc"],
              ["03", lang === "ar" ? "تحاليل" : "Labs", "/program#labs"],
              ["04", lang === "ar" ? "تغذية" : "Nutrition", "/program#nutrition"],
            ].map(([index, label, href]) => (
              <Link
                key={index}
                to={href}
                className="group relative overflow-hidden rounded-[28px] border border-line bg-card p-6 transition hover:border-cyan/50"
              >
                <span className="ghost-index text-6xl">{index}</span>
                <span className="mt-6 block text-3xl font-black group-hover:text-cyan">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="chamber px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-4xl font-black">{t.formatTitle}</h2>
            <p className="mt-3 text-muted">{t.formatText}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <article className="rounded-3xl border border-cyan/30 p-5">
              <p className="font-syne text-cyan">ONLINE</p>
              <h3 className="mt-2 text-2xl font-bold">{t.online}</h3>
              <p className="mt-2 text-sm text-muted">{t.onlineText}</p>
            </article>
            <article className="rounded-3xl border border-rose/40 p-5">
              <p className="font-syne text-rose">OFFLINE</p>
              <h3 className="mt-2 text-2xl font-bold">{t.offline}</h3>
              <p className="mt-2 text-sm text-muted">{t.offlineText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-black">{t.peopleTitle}</h2>
            <p className="mt-3 max-w-xl text-muted">{t.peopleText}</p>
          </div>
          <Link to="/team" className="text-cyan">
            {t.seeTeam}
          </Link>
        </div>
      </section>

      <section className="pb-8">
        <div className="mb-4 flex items-end justify-between px-5">
          <h2 className="text-2xl font-bold">{t.filmTitle}</h2>
          <Link to="/gallery" className="text-sm text-cyan">
            {t.seeGallery}
          </Link>
        </div>
        <div className="film">
          <div className="film__track px-5">
            {loop.map((shot, index) => (
              <figure key={`${shot.src}-${index}`} className="w-64 shrink-0 overflow-hidden rounded-3xl">
                <img src={shot.src} alt={shot[lang]} loading="lazy" decoding="async" className="h-44 w-full object-cover" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-[32px] bg-paper px-6 py-8 text-ink md:flex-row md:items-center">
          <p className="max-w-2xl text-2xl leading-snug font-bold">{t.certBand}</p>
          <Link to="/certificate" className="rounded-full bg-ink px-5 py-3 text-sm text-cyan">
            {t.seeCert}
          </Link>
        </div>
      </section>
    </>
  )
}
