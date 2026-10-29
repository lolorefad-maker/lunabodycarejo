import { createContext, useContext, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { EASE, PRICE, SCENTS } from '../lib/config.js'
import { useCart, useLang, useScent, useScrollTo } from '../lib/store.jsx'

/** True once the preloader has lifted — the hero waits for it. */
export const IntroCtx = createContext(true)
export const useIntro = () => useContext(IntroCtx)

/** Scroll to a section of the home page from anywhere. */
export function useGoTo() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const scrollTo = useScrollTo()
  return (selector) => {
    if (pathname === '/') scrollTo(selector)
    else navigate('/', { state: { section: selector } })
  }
}

/** Button whose label rolls up on hover while a fill wipes in from the start side. */
export function Button({ children, variant = 'solid', className = '', as: Tag = 'button', roll = true, ...props }) {
  return (
    <Tag className={`btn btn-${variant} ${className}`} {...props}>
      <span className="btn-fill" aria-hidden="true" />
      {roll ? (
        <span className="btn-roll">
          <span className="btn-l1">{children}</span>
          <span className="btn-l2" aria-hidden="true">
            {children}
          </span>
        </span>
      ) : (
        <span className="btn-roll">{children}</span>
      )}
    </Tag>
  )
}

export function Check() {
  return (
    <svg className="ico-check" viewBox="0 0 24 24" aria-hidden="true">
      <motion.path
        d="M4 12.5l5 5L20 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      />
    </svg>
  )
}

export function AddButton({ id, withPrice = false, variant = 'solid', className = '' }) {
  const { t, money } = useLang()
  const { add } = useCart()
  const [done, setDone] = useState(false)
  const click = () => {
    add(id)
    setDone(true)
    setTimeout(() => setDone(false), 1900)
  }
  return (
    <Button variant={variant} roll={false} className={`btn-add ${done ? 'is-done' : ''} ${className}`} onClick={click} data-cursor="+">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.span key="done" className="btn-swap" initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
            <Check /> {t.collection.added}
          </motion.span>
        ) : (
          <motion.span key="add" className="btn-swap" initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
            {t.collection.add}
            {withPrice && (
              <>
                <span className="btn-dot" aria-hidden="true" />
                <span className="num">{money(PRICE)}</span>
              </>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

/** Pure Musk / Sweetie Fruity — recolours the whole site. */
export function ScentSwitch({ className = '', compact = false }) {
  const { t } = useLang()
  const { scent, setScent } = useScent()
  const id = useId()
  return (
    <div className={`scent-switch ${compact ? 'is-compact' : ''} ${className}`} role="radiogroup" aria-label={t.hero.choose}>
      {SCENTS.map((s) => (
        <button key={s} type="button" role="radio" aria-checked={scent === s} className={scent === s ? 'on' : ''} onClick={() => setScent(s)}>
          {scent === s && <motion.span layoutId={`pill${id}`} className="ss-pill" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
          <span className={`ss-dot ss-${s}`} aria-hidden="true" />
          <span className="ss-label">{t.scents[s].name}</span>
        </button>
      ))}
    </div>
  )
}

export function Arrow({ className = '' }) {
  return (
    <svg className={`ico-arrow ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WhatsAppIcon({ className = '' }) {
  return (
    <svg className={`ico-wa ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z"
      />
    </svg>
  )
}
