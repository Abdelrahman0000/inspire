import { useState } from "react"
import { courses, links } from "../data/content"
import { pick, useLanguage } from "../i18n/LanguageContext"
import { PageHero } from "../components/bits"

export default function Contact() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState({
    name: "",
    phone: "",
    track: courses[0].id,
    message: "",
  })

  const onSubmit = (event) => {
    event.preventDefault()
    const track = courses.find((course) => course.id === form.track)
    const text =
      lang === "ar"
        ? `مرحبًا، أنا ${form.name}.\nالموبايل: ${form.phone}\nالمسار: ${pick(track.title, lang)}\n${form.message}`
        : `Hello, I'm ${form.name}.\nMobile: ${form.phone}\nTrack: ${pick(track.title, lang)}\n${form.message}`
    window.open(`${links.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
  }

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  return (
    <>
      <PageHero kicker={t.contactKicker} title={t.contactTitle} text={t.contactLead} />
      <section className="px-5 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-4">
            <a href={`tel:${links.phoneTel}`} className="block rounded-[28px] border border-rose/40 p-6">
              <p className="kicker text-xs tracking-[0.25em] text-rose uppercase">{t.call}</p>
              <p className="num mt-2 text-4xl font-black">{links.phone}</p>
            </a>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[28px] border border-cyan/40 p-6"
            >
              <p className="kicker text-xs tracking-[0.25em] text-cyan uppercase">{t.whatsapp}</p>
              <p className="mt-2 text-2xl font-bold">{t.ask}</p>
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a href={links.facebook} target="_blank" rel="noreferrer" className="rounded-3xl bg-card p-5">
                {t.facebook}
                <span className="mt-2 block text-sm text-soft">Inspire</span>
              </a>
              <a href={links.tiktok} target="_blank" rel="noreferrer" className="rounded-3xl bg-card p-5">
                {t.tiktok}
                <span className="num mt-2 block text-sm text-soft">@inspire.team2</span>
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-[32px] border border-line bg-panel p-6">
            <h2 className="text-2xl font-black">{t.formTitle}</h2>
            <div className="mt-5 grid gap-3">
              <label className="text-sm text-muted">
                {t.name}
                <input required className="field mt-1" value={form.name} onChange={set("name")} />
              </label>
              <label className="text-sm text-muted">
                {t.phoneLabel}
                <input required className="field num mt-1" value={form.phone} onChange={set("phone")} />
              </label>
              <label className="text-sm text-muted">
                {t.track}
                <select className="field mt-1" value={form.track} onChange={set("track")}>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id} className="text-ink">
                      {pick(course.title, lang)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-muted">
                {t.message}
                <textarea className="field mt-1 min-h-32" value={form.message} onChange={set("message")} />
              </label>
              <button type="submit" className="rounded-full bg-cyan px-5 py-3 font-semibold text-ink">
                {t.send}
              </button>
              <p className="text-sm text-faint">{t.formNote}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
