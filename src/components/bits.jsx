import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useLanguage } from "../i18n/LanguageContext"

const cycle =
  "0,30 36,30 48,30 54,14 62,48 68,8 76,36 84,30 150,30 162,30 168,16 176,46 182,10 190,38 198,30 260,30"

function shift(points, dx) {
  return points
    .split(" ")
    .map((pair) => {
      const [x, y] = pair.split(",")
      return `${Number(x) + dx},${y}`
    })
    .join(" ")
}

export function EcgStrip({ className = "" }) {
  const points = `${cycle} ${shift(cycle, 260)}`
  return (
    <svg className={`ecg-shift ${className}`} viewBox="0 0 520 60" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} />
    </svg>
  )
}

export function BodyFigure() {
  const dots = []
  for (let i = 0; i < 16; i += 1) {
    const t = (i / 16) * Math.PI * 2
    dots.push([100 + Math.cos(t) * 18, 40 + Math.sin(t) * 22])
  }
  for (let i = 0; i < 7; i += 1) {
    const y = 108 + i * 22
    const w = 34 - i
    dots.push([100 - w, y], [100 + w, y], [100, y])
  }

  return (
    <svg className="body-figure h-full w-full" viewBox="0 0 200 440" aria-hidden="true">
      <defs>
        <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(58,209,239,0)" />
          <stop offset="0.45" stopColor="rgba(58,209,239,.95)" />
          <stop offset="1" stopColor="rgba(226,59,87,0)" />
        </linearGradient>
      </defs>
      <path
        className="body-outline"
        d="M100 16c16 0 26 12 26 28S116 72 100 74 74 60 74 44 84 16 100 16zM76 80c-10 8-24 14-40 16 2 22 0 52 8 78M124 80c10 8 24 14 40 16-2 22 0 52-8 78M70 104c-2 34 4 78 14 112 4 20 6 48 4 74M130 104c2 34-4 78-14 112-4 20-6 48-4 74M84 292c-6 40-8 84-4 124M116 292c6 40 8 84 4 124"
      />
      <ellipse className="lung" cx="82" cy="156" rx="18" ry="30" />
      <ellipse className="lung lung--delay" cx="118" cy="156" rx="18" ry="30" />
      <path className="is-heart" d="M108 138c7-10 18-8 18 4 0 10-18 22-18 22s-18-12-18-22c0-12 11-14 18-4z" />
      {dots.map(([x, y], index) => (
        <circle key={`${x}-${y}-${index}`} cx={x} cy={y} r="2.1" />
      ))}
      <g className="scanbar">
        <rect x="20" y="0" width="160" height="26" fill="url(#scan)" />
      </g>
    </svg>
  )
}

export function Mark({ type }) {
  if (type === "capsule") return <span className="capsule" aria-hidden="true" />
  if (type === "tube") {
    return (
      <span className="tube" aria-hidden="true">
        <i style={{ left: 6 }} />
        <i style={{ left: 14, animationDelay: ".6s" }} />
      </span>
    )
  }
  if (type === "pulse") {
    return (
      <svg width="78" height="36" viewBox="0 0 120 40" aria-hidden="true" className="text-rose">
        <path className="suture-path" d="M2 22 H28 L36 8 L46 34 L54 14 L62 22 H118" />
      </svg>
    )
  }
  return (
    <svg width="74" height="46" viewBox="0 0 90 60" aria-hidden="true" className="text-rose">
      <path
        className="logo-beat"
        d="M45 50 C28 38 14 30 14 20 14 12 22 8 30 12 36 15 40 20 45 26 50 20 54 15 60 12 68 8 76 12 76 20 76 30 62 38 45 50Z"
        fill="#e23b57"
      />
    </svg>
  )
}

export function Stitch() {
  return (
    <svg className="stitch" viewBox="0 0 600 16" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 8 H600" />
    </svg>
  )
}

export function Monitor() {
  const { t } = useLanguage()
  const [bpm, setBpm] = useState(72)

  useEffect(() => {
    const id = setInterval(() => {
      setBpm(70 + Math.floor(Math.random() * 8))
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="monitor px-4 py-3">
      <div className="mb-1 flex items-end justify-between gap-4">
        <p className="kicker text-xs tracking-[0.22em] text-cyan uppercase">{t.monitor}</p>
        <p className="num font-syne text-3xl leading-none text-rose">
          {bpm}
          <span className="ms-1 text-xs tracking-widest text-muted">BPM</span>
        </p>
      </div>
      <div className="h-12 overflow-hidden">
        <EcgStrip />
      </div>
    </div>
  )
}

export function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PageHero({ kicker, title, text }) {
  return (
    <header className="chamber px-5 pt-32 pb-14">
      <div className="mx-auto max-w-6xl">
        <p className="kicker text-xs tracking-[0.28em] text-cyan uppercase">{kicker}</p>
        <h1 className="mt-3 max-w-4xl text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.95] font-black">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>
      </div>
    </header>
  )
}
