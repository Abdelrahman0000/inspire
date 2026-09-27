import { courses } from "../data/content"
import { pick, useLanguage } from "../i18n/LanguageContext"
import { Mark, PageHero, Reveal } from "../components/bits"

export default function Program() {
  const { t, lang } = useLanguage()

  return (
    <>
      <PageHero kicker={t.programKicker} title={t.programTitle} text={t.programLead} />
      <div className="flex flex-col gap-6 px-5 py-12">
        {courses.map((course, index) => (
          <Reveal key={course.id}>
            <article
              id={course.id}
              className={`scroll-mt-28 overflow-hidden rounded-[32px] ${
                index % 2 === 0 ? "ecg-paper" : "chamber border border-line"
              }`}
            >
              <div className="grid gap-6 p-6 md:grid-cols-[.9fr_1.1fr] md:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="ghost-index text-6xl">{course.index}</span>
                    <Mark type={course.mark} />
                  </div>
                  <h2 className="mt-4 text-3xl font-black md:text-4xl">{pick(course.title, lang)}</h2>
                  <p className={`mt-3 leading-relaxed ${index % 2 === 0 ? "text-ink/75" : "text-muted"}`}>
                    {pick(course.text, lang)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {course.chips[lang].map((chip) => (
                      <li
                        key={chip}
                        className={`rounded-full px-3 py-1 text-sm ${
                          index % 2 === 0 ? "bg-ink text-foam" : "border border-cyan/40 text-cyan"
                        }`}
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`grid gap-3 ${course.images.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {course.images.map((image) => (
                    <figure key={image.src} className="overflow-hidden rounded-3xl">
                      <img
                        src={image.src}
                        alt={pick(image.alt, lang)}
                        loading="lazy"
                        decoding="async"
                        className="h-52 w-full object-cover transition-transform duration-300 hover:scale-[1.03] sm:h-64"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <section className="px-5 pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <article className="rounded-[28px] border border-cyan/30 p-6">
            <p className="font-syne tracking-[0.25em] text-cyan">ONLINE + OFFLINE</p>
            <h2 className="mt-3 text-3xl font-black">{t.formatTitle}</h2>
            <p className="mt-3 text-muted">{t.formatText}</p>
          </article>
          <article className="rounded-[28px] bg-paper p-6 text-ink">
            <p className="font-syne tracking-[0.2em] text-rose">CERTIFICATE</p>
            <p className="mt-3 text-2xl leading-snug font-bold">{t.certBand}</p>
          </article>
        </div>
      </section>
    </>
  )
}
