import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { gallery } from "../data/content"
import { useLanguage } from "../i18n/LanguageContext"
import { PageHero } from "../components/bits"

export default function Gallery() {
  const { t, lang } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [active, setActive] = useState(null)
  const filters = [
    ["all", t.all],
    ["lecture", t.lecture],
    ["practice", t.practice],
    ["profile", t.profiles],
    ["certificate", t.certificate],
  ]
  const items = gallery.filter((item) => filter === "all" || item.cat === filter)
  const index = active === null ? -1 : items.findIndex((item) => item.src === active.src)

  useEffect(() => {
    if (active === null) return undefined
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null)
      if (event.key === "ArrowRight") setActive(items[(index + 1) % items.length])
      if (event.key === "ArrowLeft") setActive(items[(index - 1 + items.length) % items.length])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, index, items])

  return (
    <>
      <PageHero kicker={t.galleryKicker} title={t.galleryTitle} text={t.galleryLead} />
      <section className="px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-2">
            {filters.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`rounded-full px-4 py-2 text-sm ${
                  filter === id ? "bg-rose text-white" : "border border-line text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="masonry columns-1 gap-4 md:columns-2 xl:columns-3">
            {items.map((item) => (
              <article key={item.src}>
                <button type="button" onClick={() => setActive(item)} className="block w-full text-start">
                  <span className="group relative block overflow-hidden rounded-[24px]">
                    <img
                      src={item.src}
                      alt={item[lang]}
                      loading="lazy"
                      decoding="async"
                      className={`w-full rounded-[24px] ${
                        item.cat === "profile" ? "bg-card object-contain" : "max-h-[520px] object-cover"
                      }`}
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-shade to-transparent p-4 text-sm text-white">
                      {item[lang]}
                    </span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-shade/95 p-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <figure className="max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <img src={active.src} alt={active[lang]} className="max-h-[78vh] w-full rounded-3xl object-contain" />
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm">
                <span>{active[lang]}</span>
                <span className="num text-cyan">
                  {index + 1} / {items.length}
                </span>
              </figcaption>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="rounded-full border border-white/30 px-4 py-2"
                  onClick={() => setActive(items[(index - 1 + items.length) % items.length])}
                >
                  {t.prev}
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/30 px-4 py-2"
                  onClick={() => setActive(items[(index + 1) % items.length])}
                >
                  {t.next}
                </button>
                <button type="button" className="rounded-full bg-rose px-4 py-2" onClick={() => setActive(null)}>
                  {t.close}
                </button>
              </div>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
