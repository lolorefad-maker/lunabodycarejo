import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EASE, EASE_IN_OUT, IMG, INSTAGRAM_URL, PRICE } from '../lib/config.js'
import { useCart, useLang, useScent, useScrollTo } from '../lib/store.jsx'
import { whatsappChat } from '../lib/whatsapp.js'
import { Crescent, Wordmark } from './brand.jsx'
import { AddButton, Arrow, ScentSwitch, useGoTo, WhatsAppIcon } from './ui.jsx'

/* ---------- Preloader ---------- */

export function Preloader({ onDone }) {
  const { t } = useLang()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const min = new Promise((r) => setTimeout(r, reduce ? 200 : 2300))
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const hero = new Promise((r) => {
      const img = new Image()
      img.onload = img.onerror = r
      img.src = IMG.box.musk
    })
    const cap = new Promise((r) => setTimeout(r, 5000))
    Promise.race([Promise.all([min, fonts, hero]), cap]).then(() => setLeaving(true))
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div className="preloader" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 1.05, ease: EASE_IN_OUT }} aria-hidden="true">
          <motion.div className="pl-inner" exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.8, ease: EASE_IN_OUT }}>
            <svg className="pl-moon" viewBox="0 0 120 120">
              <motion.path
                d="M78 18a44 44 0 1 0 24 62A36 36 0 1 1 78 18Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: EASE_IN_OUT }}
              />
              <motion.path
                d="M78 18a44 44 0 1 0 24 62A36 36 0 1 1 78 18Z"
                fill="currentColor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.3 }}
              />
            </svg>
            <div className="pl-word" dir="ltr">
              {'LUNA'.split('').map((c, i) => (
                <span className="rv-mask" key={i}>
                  <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.09 }}>
                    {c}
                  </motion.span>
                </span>
              ))}
            </div>
            <motion.p className="pl-tag" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1 }}>
              {t.preloader}
            </motion.p>
            <div className="pl-bar">
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.1, ease: EASE_IN_OUT }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Page curtain ---------- */

export function Page({ children }) {
  return (
    <>
      {children}
      <motion.div
        className="curtain"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.75, ease: EASE_IN_OUT }}
        style={{ originY: 1 }}
      >
        <Crescent className="curtain-moon" />
      </motion.div>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: EASE_IN_OUT, delay: 0.05 }}
        style={{ originY: 0 }}
      >
        <Crescent className="curtain-moon" />
      </motion.div>
    </>
  )
}

/* ---------- Cursor (mouse only) ---------- */

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [mode, setMode] = useState('') // '', 'link', 'label', 'text'
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const el = e.target.closest?.('[data-cursor], a, button, input, textarea, label, [role="radio"]')
      if (!el) {
        setMode('')
        setLabel('')
      } else if (el.matches('input, textarea')) {
        setMode('text')
        setLabel('')
      } else if (el.dataset.cursor) {
        setMode('label')
        setLabel(el.dataset.cursor)
      } else {
        setMode('link')
        setLabel('')
      }
    }
    const d = () => setDown(true)
    const u = () => setDown(false)
    const leave = () => {
      x.set(-100)
      y.set(-100)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', d)
    window.addEventListener('pointerup', u)
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', d)
      window.removeEventListener('pointerup', u)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  const ring = mode === 'label' ? 84 : mode === 'link' ? 54 : mode === 'text' ? 0 : 34
  return (
    <div className="cursor" aria-hidden="true">
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: mode === 'label' || mode === 'text' ? 0 : down ? 0.6 : 1 }} />
      <motion.div
        className={`cursor-ring ${mode ? 'is-' + mode : ''}`}
        style={{ x: rx, y: ry }}
        animate={{ width: ring, height: ring, scale: down ? 0.88 : 1 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <AnimatePresence>
          {label && (
            <motion.span key={label} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.3 }}>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/* ---------- Sticky buy bar ---------- */

export function StickyBuy() {
  const { t, money } = useLang()
  const { scent } = useScent()
  const { open } = useCart()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    setShow(v > window.innerHeight * 0.85 && v < max - window.innerHeight * 0.9)
  })

  return (
    <AnimatePresence>
      {show && !open && (
        <motion.div className="sticky-buy" initial={{ y: '140%' }} animate={{ y: 0 }} exit={{ y: '140%' }} transition={{ duration: 0.7, ease: EASE }}>
          <div className={`sb-thumb tint-${scent}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img key={scent} src={IMG.set[scent]} alt="" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} />
            </AnimatePresence>
          </div>
          <ScentSwitch compact className="sb-switch" />
          <span className="sb-price num">{money(PRICE)}</span>
          <AddButton id={scent} className="sb-add" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Footer ---------- */

export function Footer() {
  const { t } = useLang()
  const goTo = useGoTo()
  const scrollTo = useScrollTo()
  const ref = useRef(null)
  return (
    <footer className="footer" ref={ref}>
      <div className="container footer-top">
        <div className="footer-brand">
          <Wordmark sub={false} />
          <p className="display footer-tag">{t.footer.tagline}</p>
        </div>
        <div className="footer-col">
          <p className="eyebrow">{t.footer.explore}</p>
          <button type="button" className="footer-link" onClick={() => goTo('#collection')}>
            {t.nav.shop}
          </button>
          <button type="button" className="footer-link" onClick={() => goTo('#ritual')}>
            {t.nav.ritual}
          </button>
          <Link className="footer-link" to="/about">
            {t.nav.about}
          </Link>
        </div>
        <div className="footer-col">
          <p className="eyebrow">{t.footer.contact}</p>
          <a className="footer-link" href={whatsappChat()} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> {t.footer.whatsapp}
          </a>
          <a className="footer-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            {t.footer.instagram}
          </a>
        </div>
      </div>
      <div className="footer-giant" aria-hidden="true" dir="ltr">
        {'LUNA'.split('').map((c, i) => (
          <span className="rv-mask" key={i}>
            <motion.span initial={{ y: '100%' }} whileInView={{ y: '0%' }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.4, ease: EASE, delay: i * 0.08 }}>
              {c}
            </motion.span>
          </span>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} LUNA Body Care. {t.footer.rights}
        </span>
        <button type="button" className="footer-link" onClick={() => scrollTo(0)}>
          {t.footer.top} <Arrow className="rot-up" />
        </button>
      </div>
    </footer>
  )
}
