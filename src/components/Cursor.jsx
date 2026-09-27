import { useEffect, useRef } from "react"

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine || !dot.current || !ring.current) return undefined

    document.body.classList.add("has-cursor")
    const dotEl = dot.current
    const ringEl = ring.current
    let x = 0
    let y = 0
    let frame = 0

    const paint = () => {
      frame = 0
      const point = `translate3d(${x}px, ${y}px, 0)`
      dotEl.style.transform = point
      ringEl.style.transform = point
    }

    const move = (event) => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const over = (event) => {
      const hot = event.target.closest?.("a, button, input, textarea, select, summary")
      ringEl.classList.toggle("is-hot", Boolean(hot))
    }

    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerover", over)
    return () => {
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerover", over)
      if (frame) cancelAnimationFrame(frame)
      document.body.classList.remove("has-cursor")
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  )
}
