import type React from "react"
import type { BirdState } from "../../types"

/**
 * Props for ClassicBird component.
 * @interface ClassicBirdProps
 * @property {BirdState} bird - Bird state containing size, palette, and animation data
 */
interface ClassicBirdProps {
  bird: BirdState
}

/**
 * Classic bird SVG variant with detailed wing animations.
 * Features multi-layer wing animation with independent feather movement.
 * Uses SVG gradients and animated transforms for smooth wing flapping.
 *
 * @component
 * @param {ClassicBirdProps} props - Props containing bird state
 * @returns {JSX.Element} SVG element rendering classic bird design
 */
export const ClassicBird: React.FC<ClassicBirdProps> = ({ bird }: ClassicBirdProps) => {
  const { dark, mid, light, accent } = bird.palette

  return (
    <svg width={bird.size} height={bird.size} viewBox="0 0 50 50">
      <defs>
        <linearGradient id={`classicWingGradient-${bird.wingPhase}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={dark} stopOpacity="1" />
          <stop offset="50%" stopColor={mid} stopOpacity="0.95" />
          <stop offset="100%" stopColor={light} stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <g transform="translate(25, 25)">
        {/* Tail feathers */}
        <g className="tail">
          <path
            d="M -5 -2 Q -10 -3 -12 -2.5 Q -11 -1.5 -5 -0.8"
            fill={light}
            stroke={dark}
            strokeWidth="0.3"
            opacity="0.85"
          />
          <path d="M -5 0 Q -11 0 -13 0 Q -11 0 -5 0" fill={mid} stroke={dark} strokeWidth="0.3" opacity="0.9" />
          <path
            d="M -5 2 Q -10 3 -12 2.5 Q -11 1.5 -5 0.8"
            fill={light}
            stroke={dark}
            strokeWidth="0.3"
            opacity="0.85"
          />
          <path
            d="M -5 -1.5 L -11.5 -2.3 M -5 0 L -12.5 0 M -5 1.5 L -11.5 2.3"
            stroke={dark}
            strokeWidth="0.2"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M -7 -2.2 L -7 -1.5 M -9 -2.5 L -9 -1.8 M -7 1.5 L -7 2.2 M -9 1.8 L -9 2.5"
            stroke={dark}
            strokeWidth="0.15"
            opacity="0.4"
            fill="none"
          />
        </g>

        {/* Top Wing */}
        <g className="wing-top">
          <ellipse cx="0" cy="-3" rx="4" ry="2.5" fill={mid} opacity="0.9" />
          <g>
            <path
              d="M 0 -2 Q -4 -8 -2 -16 Q -1 -10 0 -4"
              fill={`url(#classicWingGradient-${bird.wingPhase})`}
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
              fill={`url(#classicWingGradient-${bird.wingPhase})`}
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

        {/* Body */}
        <ellipse cx="2" cy="0" rx="7" ry="5" fill={mid} />
        {/* Head */}
        <circle cx="7" cy="0" r="3.5" fill={dark} />
        {/* Eye */}
        <circle cx="8" cy="-0.8" r="1.2" fill="white" />
        <circle cx="8.3" cy="-1" r="0.6" fill="black" />
        {/* Beak */}
        <path d="M 9.5 0 L 12 -0.5 L 12 0.5 Z" fill={accent} />
      </g>
    </svg>
  )
}
