import { useEffect, useId } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export function Crescent({ className = '', title }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={`crescent ${className}`} viewBox="0 0 24 24" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <mask id={`c${id}`}>
        <rect width="24" height="24" fill="#fff" />
        <circle cx="16.4" cy="8.6" r="8.2" fill="#000" />
      </mask>
      <circle cx="12" cy="12" r="9.6" fill="currentColor" mask={`url(#c${id})`} />
    </svg>
  )
}

export function Wordmark({ className = '', sub = true }) {
  return (
    <span className={`wordmark ${className}`}>
      <Crescent className="wm-moon" />
      <span className="wm-text">
        L<span className="wm-u">U</span>NA
      </span>
      {sub && <span className="wm-sub">Body Care</span>}
    </span>
  )
}

/**
 * The moon, lit from 0 (new) to 1 (full). `lit` may be a number or a motion value.
 */
export function Moon({ lit = 1, className = '' }) {
  const id = useId().replace(/:/g, '')
  const fixed = useMotionValue(typeof lit === 'number' ? lit : 1)
  const shadowX = useTransform(typeof lit === 'number' ? fixed : lit, (v) => 100 + v * 186)
  useEffect(() => {
    if (typeof lit === 'number') fixed.set(lit)
  }, [lit, fixed])
  return (
    <svg className={`moon ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={`g${id}`} cx="38%" cy="34%" r="75%">
          <stop offset="0%" stopColor="var(--moon-hi)" />
          <stop offset="60%" stopColor="var(--moon-mid)" />
          <stop offset="100%" stopColor="var(--moon-lo)" />
        </radialGradient>
        <mask id={`m${id}`}>
          <rect width="200" height="200" fill="#fff" />
          <motion.circle cx={shadowX} cy="96" r="92" fill="#000" />
        </mask>
        <filter id={`b${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`s${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="88" fill="var(--moon-dark)" />
      <g mask={`url(#m${id})`}>
        <circle cx="100" cy="100" r="88" fill="var(--moon-glow)" filter={`url(#b${id})`} />
        <circle cx="100" cy="100" r="88" fill={`url(#g${id})`} />
        <g fill="var(--moon-crater)" filter={`url(#s${id})`}>
          <circle cx="72" cy="70" r="11" />
          <circle cx="122" cy="118" r="16" />
          <circle cx="86" cy="132" r="7" />
          <circle cx="134" cy="72" r="6" />
          <circle cx="58" cy="108" r="5" />
        </g>
      </g>
      <circle cx="100" cy="100" r="88" fill="none" stroke="var(--moon-ring)" strokeWidth="0.6" />
    </svg>
  )
}

/** Text set around a circle, turning slowly. */
export function OrbitBadge({ text, className = '', rtl }) {
  const id = useId().replace(/:/g, '')
  const r = 74
  return (
    <div className={`orbit-badge ${className}`} aria-hidden="true">
      <svg className="ob-ring" viewBox="0 0 200 200">
        <defs>
          <path id={`p${id}`} d={`M100,100 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        {/* Arabic can't take extra letter spacing (it breaks the joins), so it is repeated to fill the ring instead */}
        <text className={rtl ? 'ob-text ob-ar' : 'ob-text'}>
          <textPath href={`#p${id}`} {...(rtl ? {} : { textLength: Math.floor(2 * Math.PI * r) - 2, lengthAdjust: 'spacing' })}>
            {rtl ? text.repeat(3) : text.repeat(2)}
          </textPath>
        </text>
      </svg>
      <Crescent className="ob-moon" />
    </div>
  )
}
