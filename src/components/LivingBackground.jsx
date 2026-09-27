import { EcgStrip } from "./bits"

export default function LivingBackground() {
  return (
    <div className="living" aria-hidden="true">
      <div className="living__grid" />
      <div className="lungs-bg">
        <span />
        <span />
      </div>
      <svg className="vessels" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path className="vessel" d="M-20 180 C 180 40, 360 320, 620 150 S 980 40, 1240 220" />
        <path className="vessel vessel--rose" d="M-20 520 C 240 680, 480 360, 760 560 S 1040 760, 1260 480" />
      </svg>
      <div className="ecg-band ecg-band--bottom">
        <EcgStrip />
      </div>
    </div>
  )
}
