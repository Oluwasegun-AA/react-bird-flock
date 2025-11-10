import type React from "react"
import type { BirdState } from "../../types"

/**
 * Props for DetailedBird component.
 * @interface DetailedBirdProps
 * @property {BirdState} bird - Bird state containing size, palette, and animation data
 */
interface DetailedBirdProps {
  bird: BirdState
}

/**
 * Detailed bird SVG variant with enhanced visual detail.
 * Features premium wing animations and precise feather rendering.
 * Provides the highest visual quality for showcase scenarios or smaller flocks.
 *
 * @component
 * @param {DetailedBirdProps} props - Props containing bird state
 * @returns {JSX.Element} SVG element rendering detailed bird design
 */
export const DetailedBird: React.FC<DetailedBirdProps> = ({ bird }: DetailedBirdProps) => {
  const { dark, mid, light } = bird.palette

  return (
    <svg width={bird.size} height={bird.size} viewBox="0 0 50 50">
      <defs>
        <linearGradient id={`detailedWingGradient-${bird.wingPhase}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={dark} stopOpacity="1" />
          <stop offset="50%" stopColor={mid} stopOpacity="0.95" />
          <stop offset="100%" stopColor={light} stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <g transform="translate(25, 25)">
        {/* Top Wing */}
        <g className="wing-top">
          <ellipse cx="0" cy="-3" rx="4" ry="2.5" fill={mid} opacity="0.9" />
          <g>
            <path
              d="M 0 -2 Q -4 -8 -2 -16 Q -1 -10 0 -4"
              fill={`url(#detailedWingGradient-${bird.wingPhase})`}
              stroke={dark}
              strokeWidth="0.3"
              opacity="0.95"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="0.25s"
                repeatCount="indefinite"
                values="-45 0 -2; 45 0 -2; -45 0 -2"
              />
            </path>
            <path d="M -0.5 -6 L -1.5 -14" stroke={dark} strokeWidth="0.4" opacity="0.4" fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="0.25s"
                repeatCount="indefinite"
                values="-45 0 -2; 45 0 -2; -45 0 -2"
              />
            </path>
          </g>
          <path d="M 0 -1 Q -3 -5 1 -12 Q 1 -7 0 -2" fill={light} stroke={dark} strokeWidth="0.2" opacity="0.9">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.25s"
              repeatCount="indefinite"
              values="-35 0 -1; 35 0 -1; -35 0 -1"
            />
          </path>
          <path d="M 1 0 Q -1 -3 3 -7 Q 2 -4 1 -1" fill={mid} opacity="0.85">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.25s"
              repeatCount="indefinite"
              values="-25 1 0; 25 1 0; -25 1 0"
            />
          </path>
        </g>

        {/* Bottom Wing */}
        <g className="wing-bottom">
          <ellipse cx="0" cy="3" rx="4" ry="2.5" fill={mid} opacity="0.9" />
          <g>
            <path
              d="M 0 2 Q -4 8 -2 16 Q -1 10 0 4"
              fill={`url(#detailedWingGradient-${bird.wingPhase})`}
              stroke={dark}
              strokeWidth="0.3"
              opacity="0.95"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="0.25s"
                repeatCount="indefinite"
                values="45 0 2; -45 0 2; 45 0 2"
              />
            </path>
            <path d="M -0.5 6 L -1.5 14" stroke={dark} strokeWidth="0.4" opacity="0.4" fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="0.25s"
                repeatCount="indefinite"
                values="45 0 2; -45 0 2; 45 0 2"
              />
            </path>
          </g>
          <path d="M 0 1 Q -3 5 1 12 Q 1 7 0 2" fill={light} stroke={dark} strokeWidth="0.2" opacity="0.9">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.25s"
              repeatCount="indefinite"
              values="35 0 1; -35 0 1; 35 0 1"
            />
          </path>
          <path d="M 1 0 Q -1 3 3 7 Q 2 4 1 1" fill={mid} opacity="0.85">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.25s"
              repeatCount="indefinite"
              values="25 1 0; -25 1 0; 25 1 0"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}
