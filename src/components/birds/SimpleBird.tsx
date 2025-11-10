import type React from "react"
import type { BirdState } from "../../types"

/**
 * Props for SimpleBird component.
 * @interface SimpleBirdProps
 * @property {BirdState} bird - Bird state containing size, palette, and animation data
 */
interface SimpleBirdProps {
  bird: BirdState
}

/**
 * Simple bird SVG variant with minimal detail and high performance.
 * Features fast wing flapping animation and motion blur effect.
 * Optimized for rendering large flocks with low computational overhead.
 *
 * @component
 * @param {SimpleBirdProps} props - Props containing bird state
 * @returns {JSX.Element} SVG element rendering simple bird design
 */
export const SimpleBird: React.FC<SimpleBirdProps> = ({ bird }: SimpleBirdProps) => {
  const { dark, mid, light, accent } = bird.palette

  const flapDur: string = bird.mode === "perched" ? "0.22s" : "0.14s"
  const baseRot: number = bird.mode === "perched" ? 40 : 62
  const fwdRot: number = bird.mode === "perched" ? 18 : 34
  const rotValues: string = `${-baseRot} 0 0; ${fwdRot} 0 0; ${-baseRot} 0 0`

  return (
    <svg width={bird.size} height={bird.size} viewBox="0 0 40 40">
      <defs>
        <linearGradient id={`smallWingGrad-${bird.wingPhase}`} x1="0%" y1="10%" x2="100%" y2="90%">
          <stop offset="0%" stopColor={light} stopOpacity="0.9" />
          <stop offset="55%" stopColor={mid} stopOpacity="0.95" />
          <stop offset="100%" stopColor={dark} stopOpacity="1" />
        </linearGradient>
      </defs>

      <g transform="translate(20 20)">
        {/* Tail */}
        <g transform="translate(-8 2) rotate(-8)">
          <path d="M -4 0 Q -6 -2 -8 -1 Q -7 1 -4 2" fill={mid} stroke={dark} strokeWidth="0.35" opacity="0.85" />
          <path d="M -4 0 Q -6 -1.2 -7 -0.8" stroke={light} strokeWidth="0.25" opacity="0.4" fill="none" />
        </g>

        {/* Body */}
        <ellipse cx="0" cy="0" rx="6" ry="4.4" fill={mid} stroke={dark} strokeWidth="0.42" />
        <path d="M -3.8 0.25 Q -1 3.2 3.2 2 Q -0.6 3 -3.8 0.25" fill={light} opacity="0.28" />

        {/* Head */}
        <circle cx="5.8" cy="-1.1" r="3" fill={dark} stroke={mid} strokeWidth="0.32" />
        <circle cx="6.7" cy="-1.8" r="0.8" fill="white" />
        <circle cx="6.9" cy="-1.8" r="0.38" fill="black" />
        <path d="M 7.8 -1.1 L 9.3 -1.6 L 8.95 -0.25 Z" fill={accent} stroke={dark} strokeWidth="0.22" />

        {/* Wings */}
        <g transform="translate(-1 -1)">
          {/* Back wing */}
          <g transform="translate(-0.5,-0.2) scale(0.82)" opacity="0.5">
            <path
              d="M 0 0 Q -6.2 -4.4 -11.5 -1.8 Q -7 1.4 0 1.8"
              fill={`url(#smallWingGrad-${bird.wingPhase})`}
              stroke={dark}
              strokeWidth="0.35"
              opacity="0.9"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur={flapDur}
                repeatCount="indefinite"
                values={rotValues}
              />
              <animateTransform
                attributeName="transform"
                type="scale"
                dur={flapDur}
                repeatCount="indefinite"
                values="1 1; 1 0.7; 1 1"
                additive="sum"
              />
            </path>
          </g>

          {/* Front wing */}
          <g>
            <path
              d="M 0 0 Q -7.2 -5.2 -13.2 -2.2 Q -8 2 0 2.2"
              fill={`url(#smallWingGrad-${bird.wingPhase})`}
              stroke={dark}
              strokeWidth="0.45"
              opacity="0.98"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur={flapDur}
                repeatCount="indefinite"
                values={rotValues}
              />
              <animateTransform
                attributeName="transform"
                type="scale"
                dur={flapDur}
                repeatCount="indefinite"
                values="1 1; 1 0.65; 1 1"
                additive="sum"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                dur={flapDur}
                repeatCount="indefinite"
                values="0 0; 0 0.4; 0 0"
                additive="sum"
              />
            </path>

            {/* Feather rows */}
            {[
              {
                d: "M -0.8 -0.4 Q -5.2 -3.2 -9.6 -1.9 Q -5.4 -0.2 -0.8 0.35",
                amp: 0,
                delay: "0s",
                w: 0.32,
                op: 0.9,
              },
              {
                d: "M -0.7 -0.2 Q -4.6 -2.6 -8.6 -1.6 Q -4.8 0 -0.7 0.28",
                amp: -4,
                delay: "0.02s",
                w: 0.3,
                op: 0.85,
              },
              {
                d: "M -0.6 0 Q -4.2 -2.0 -7.8 -1.2 Q -4.4 0.18 -0.6 0.35",
                amp: -8,
                delay: "0.035s",
                w: 0.28,
                op: 0.8,
              },
              {
                d: "M -0.5 0.15 Q -3.8 -1.5 -7.2 -1.0 Q -4.1 0.28 -0.5 0.4",
                amp: -10,
                delay: "0.05s",
                w: 0.26,
                op: 0.75,
              },
            ].map((f, i) => {
              const r = `${-baseRot + f.amp} 0 0; ${fwdRot + f.amp / 2} 0 0; ${-baseRot + f.amp} 0 0`
              return (
                <path
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  d={f.d}
                  fill={light}
                  stroke={dark}
                  strokeWidth={f.w}
                  opacity={f.op}
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur={flapDur}
                    repeatCount="indefinite"
                    values={r}
                    begin={f.delay}
                  />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    dur={flapDur}
                    repeatCount="indefinite"
                    values="0 0; 0 0.25; 0 0"
                    begin={f.delay}
                    additive="sum"
                  />
                </path>
              )
            })}

            {/* Leading edge shine */}
            <path
              d="M -2 -0.7 Q -7.2 -2.6 -11.6 -1.6"
              stroke={light}
              strokeWidth="0.42"
              strokeLinecap="round"
              opacity="0.5"
              fill="none"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur={flapDur}
                repeatCount="indefinite"
                values={rotValues}
              />
            </path>
          </g>
        </g>

        {/* Motion blur */}
        <ellipse cx="-1.6" cy="0.5" rx="6.6" ry="1.5" fill={dark} opacity="0.06">
          <animate attributeName="rx" dur={flapDur} repeatCount="indefinite" values="4.8;6.6;4.8" />
          <animate attributeName="opacity" dur={flapDur} repeatCount="indefinite" values="0.02;0.10;0.02" />
        </ellipse>
      </g>
    </svg>
  )
}
