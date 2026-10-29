import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { EASE } from '../lib/config.js'

const words = (s) => (s ? s.split(/\s+/).filter(Boolean) : [])

/**
 * Headline that rises word by word out of a mask.
 * Split by words only — splitting Arabic into letters would break its joining.
 * lines: [{ text, em }] — `em` is set in the italic / accent face.
 */
export function Reveal({ lines, as: Tag = 'h2', className = '', delay = 0, stagger = 0.07, play }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const show = play ?? inView
  const label = lines.map((l) => [l.text, l.em].filter(Boolean).join(' ')).join(' ')
  let i = 0
  const word = (w, em) => {
    const idx = i++
    return (
      <span className={`rv-mask${em ? ' rv-em' : ''}`} key={idx}>
        <motion.span
          className="rv-word"
          initial={{ y: '118%', rotate: 4 }}
          animate={show ? { y: '0%', rotate: 0 } : { y: '118%', rotate: 4 }}
          transition={{ duration: 1.25, ease: EASE, delay: delay + idx * stagger }}
        >
          {w}
        </motion.span>
      </span>
    )
  }
  return (
    <Tag ref={ref} className={`rv ${className}`} aria-label={label}>
      {lines.map((l, li) => (
        <span className="rv-line" key={li} aria-hidden="true">
          {words(l.text).map((w) => [word(w), ' '])}
          {words(l.em).map((w) => [word(w, true), ' '])}
        </span>
      ))}
    </Tag>
  )
}

export function FadeUp({ children, delay = 0, y = 36, className, as = 'div', amount = 0.2, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

/** A line that draws itself across. */
export function Hairline({ delay = 0, className = '' }) {
  return (
    <motion.span
      className={`hairline ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  )
}

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrubText({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const list = words(text)
  return (
    <p ref={ref} className={`scrub ${className}`} aria-label={text}>
      {list.map((w, i) => (
        <ScrubWord key={i} progress={scrollYProgress} range={[i / list.length, (i + 1) / list.length]}>
          {w}
        </ScrubWord>
      ))}
    </p>
  )
}

function ScrubWord({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <>
      <motion.span aria-hidden="true" style={{ opacity, y, display: 'inline-block' }}>
        {children}
      </motion.span>{' '}
    </>
  )
}

/** Moves its content against the scroll. */
export function Parallax({ children, speed = 0.15, className, style }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  )
}

/** Pulls toward the pointer, springs back on leave. */
export function Magnetic({ children, strength = 0.28, className }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 })
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} className={`magnetic ${className ?? ''}`} style={{ x, y }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.div>
  )
}

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/** Endless ribbon; scrolling speeds it up and flips its direction. */
export function Marquee({ items, speed = 3, className = '' }) {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const dir = useRef(1)
  const x = useTransform(base, (v) => `${wrap(-25, -50, v)}%`)

  useAnimationFrame((_, delta) => {
    let move = dir.current * speed * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    base.set(base.get() + move)
  })

  const row = (k) => (
    <span className="mq-row" key={k} aria-hidden={k > 0}>
      {items.map((it, i) => (
        <span className="mq-item" key={i}>
          <span>{it}</span>
          <svg className="mq-star" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
          </svg>
        </span>
      ))}
    </span>
  )

  return (
    <div className={`marquee ${className}`}>
      <motion.div className="mq-track" style={{ x }}>
        {[0, 1, 2, 3].map(row)}
      </motion.div>
    </div>
  )
}
