import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import { DICT } from './content.js'
import { PRICE, SCENTS } from './config.js'

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v == null ? fallback : JSON.parse(v)
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

/* ---------- Language ---------- */

const LangCtx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => (read('luna-lang', 'ar') === 'en' ? 'en' : 'ar'))
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    write('luna-lang', lang)
  }, [lang, dir])

  const value = useMemo(
    () => ({
      lang,
      dir,
      t: DICT[lang],
      setLang,
      toggle: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      money: (n) => `${n} ${DICT[lang].currency}`,
    }),
    [lang, dir],
  )
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)

/* ---------- Scent (drives the page colours) ---------- */

const ScentCtx = createContext(null)

export function ScentProvider({ children }) {
  const [scent, setScent] = useState('musk')
  useEffect(() => {
    document.documentElement.dataset.scent = scent
  }, [scent])
  const value = useMemo(() => ({ scent, setScent }), [scent])
  return <ScentCtx.Provider value={value}>{children}</ScentCtx.Provider>
}

export const useScent = () => useContext(ScentCtx)

/* ---------- Bag ---------- */

const CartCtx = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = read('luna-bag', {})
    return Object.fromEntries(SCENTS.map((s) => [s, Math.max(0, Math.min(20, Number(saved[s]) || 0))]))
  })
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [pulse, setPulse] = useState(0)

  useEffect(() => write('luna-bag', items), [items])

  const setQty = useCallback((id, qty) => {
    setItems((it) => ({ ...it, [id]: Math.max(0, Math.min(20, qty)) }))
  }, [])

  const add = useCallback((id, { openBag = true } = {}) => {
    setItems((it) => ({ ...it, [id]: Math.min(20, (it[id] || 0) + 1) }))
    setPulse((p) => p + 1)
    if (openBag) {
      setStep(0)
      setTimeout(() => setOpen(true), 380)
    }
  }, [])

  const clear = useCallback(() => setItems(Object.fromEntries(SCENTS.map((s) => [s, 0]))), [])

  const count = SCENTS.reduce((n, s) => n + items[s], 0)
  const total = count * PRICE

  const value = useMemo(
    () => ({
      items,
      count,
      total,
      open,
      step,
      pulse,
      setStep,
      setQty,
      add,
      clear,
      openBag: () => {
        setStep(0)
        setOpen(true)
      },
      closeBag: () => setOpen(false),
    }),
    [items, count, total, open, step, pulse, setQty, add, clear],
  )
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => useContext(CartCtx)

/* ---------- Smooth scroll ---------- */

const ScrollCtx = createContext(null)

export function SmoothScroll({ children, paused }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 0.9 })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (paused) lenis.stop()
    else lenis.start()
    document.documentElement.classList.toggle('is-locked', !!paused)
  }, [paused])

  const scrollTo = useCallback((target, opts = {}) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el ?? target, { offset: el ? -72 : 0, duration: 1.6, ...opts })
    } else if (el?.scrollIntoView) {
      el.scrollIntoView({ behavior: opts.immediate ? 'auto' : 'smooth' })
    } else {
      window.scrollTo({ top: typeof target === 'number' ? target : 0, behavior: opts.immediate ? 'auto' : 'smooth' })
    }
  }, [])

  return <ScrollCtx.Provider value={scrollTo}>{children}</ScrollCtx.Provider>
}

export const useScrollTo = () => useContext(ScrollCtx)
