import { people } from "../data/content"
import { pick, useLanguage } from "../i18n/LanguageContext"
import { EcgStrip, PageHero, Reveal } from "../components/bits"

function Card({ person, lang, featured = false, note }) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-panel ${
        featured ? "p-6" : "p-5"
      }`}
    >
      <div className="mb-4 h-10 shrink-0 overflow-hidden text-rose opacity-80">
        <EcgStrip />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-card">
          <img
            src={person.photo}
            alt=""
            className="absolute h-auto"
            style={{ ...person.photoFrame, maxWidth: "none" }}
          />
        </div>
        <span className="rounded-full border border-rose/40 px-3 py-1 text-xs text-rose">
          {pick(person.focus, lang)}
        </span>
      </div>
      <h3 className="mt-5 text-2xl font-black">{pick(person.name, lang)}</h3>
      <p className="mt-2 leading-relaxed text-muted">{pick(person.role, lang)}</p>
      <ul className="mt-3 space-y-1 text-sm break-words text-soft">
        {person.credentials[lang].map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {note ? <p className="mt-auto pt-4 text-sm text-faint">{note}</p> : null}
    </article>
  )
}

export default function Team() {
  const { t, lang } = useLanguage()
  const organizers = people.filter((person) => person.organizer)
  const lecturers = people

  return (
    <>
      <PageHero kicker={t.teamKicker} title={t.teamTitle} text={t.teamLead} />
      <section className="px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="kicker mb-5 text-sm tracking-[0.28em] text-cyan uppercase">{t.organizers}</h2>
          <div className="grid items-stretch gap-4 md:grid-cols-2">
            {organizers.map((person, index) => (
              <Reveal key={person.id} delay={index * 0.08} className="h-full">
                <Card person={person} lang={lang} featured note={t.alsoTeach} />
              </Reveal>
            ))}
          </div>

          <h2 className="kicker mt-14 mb-5 text-sm tracking-[0.28em] text-cyan uppercase">{t.lecturers}</h2>
          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {lecturers.map((person, index) => (
              <Reveal key={person.id} delay={(index % 3) * 0.06} className="h-full">
                <Card person={person} lang={lang} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
