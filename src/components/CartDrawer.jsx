import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE, EASE_IN_OUT, IMG, PRICE, SCENTS } from '../lib/config.js'
import { useCart, useLang } from '../lib/store.jsx'
import { orderMessage, whatsappLink } from '../lib/whatsapp.js'
import { Crescent } from './brand.jsx'
import { Arrow, Button, WhatsAppIcon } from './ui.jsx'

const EMPTY = { name: '', phone: '', city: '', address: '', notes: '' }

const loadDetails = () => {
  try {
    return { ...EMPTY, ...JSON.parse(localStorage.getItem('luna-details') || '{}') }
  } catch {
    return EMPTY
  }
}

export default function CartDrawer() {
  const { t, dir } = useLang()
  const { open, closeBag, step, setStep, count } = useCart()
  const panel = useRef(null)
  const from = dir === 'rtl' ? '-100%' : '100%'

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeBag()
    window.addEventListener('keydown', onKey)
    const id = setTimeout(() => panel.current?.querySelector('.drawer-close')?.focus(), 450)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(id)
    }
  }, [open, closeBag])

  // An emptied bag always starts again at step one.
  useEffect(() => {
    if (!count && step === 1) setStep(0)
  }, [count, step, setStep])

  return (
    <AnimatePresence>
      {open && (
        <div className="drawer-root">
          <motion.div className="drawer-scrim" onClick={closeBag} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
          <motion.aside
            ref={panel}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t.cart.title}
            initial={{ x: from }}
            animate={{ x: 0 }}
            exit={{ x: from }}
            transition={{ duration: 0.85, ease: EASE_IN_OUT }}
            data-lenis-prevent
          >
            <header className="drawer-head">
              <div className="drawer-title">
                <h2 className="display">{t.cart.title}</h2>
                <span className="drawer-count num">({count})</span>
              </div>
              <button type="button" className="drawer-close" onClick={closeBag} aria-label={t.nav.close}>
                <span />
                <span />
              </button>
            </header>

            {count > 0 || step === 2 ? <Steps step={step} /> : null}

            <div className="drawer-body">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={count === 0 && step !== 2 ? 'empty' : step}
                  className="drawer-pane"
                  initial={{ opacity: 0, x: dir === 'rtl' ? -28 : 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir === 'rtl' ? 28 : -28 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {step === 2 ? <Sent /> : count === 0 ? <Empty /> : step === 0 ? <Bag /> : <Details />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

function Steps({ step }) {
  const { t } = useLang()
  return (
    <ol className="steps">
      {t.cart.steps.map((s, i) => (
        <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''}>
          <span className="num">0{i + 1}</span> {s}
          {i === step && <motion.span layoutId="step-line" className="steps-line" transition={{ duration: 0.6, ease: EASE }} />}
        </li>
      ))}
    </ol>
  )
}

function Empty() {
  const { t } = useLang()
  const { closeBag } = useCart()
  return (
    <div className="bag-empty">
      <Crescent className="bag-empty-moon" />
      <p className="display bag-empty-title">{t.cart.empty}</p>
      <p className="muted">{t.cart.emptySub}</p>
      <Button variant="outline" onClick={closeBag}>
        {t.cart.continue}
      </Button>
    </div>
  )
}

function Bag() {
  const { t, money } = useLang()
  const { items, setQty, total, setStep, add } = useCart()
  const missing = SCENTS.find((s) => !items[s])
  return (
    <>
      <ul className="bag-list">
        <AnimatePresence initial={false}>
          {SCENTS.filter((s) => items[s]).map((s) => (
            <motion.li
              key={s}
              layout
              className="bag-item"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="bag-item-inner">
                <div className={`bag-thumb tint-${s}`}>
                  <img src={IMG.set[s]} alt="" />
                </div>
                <div className="bag-info">
                  <div className="bag-row">
                    <h3 className="display bag-name">{t.scents[s].name}</h3>
                    <span className="num bag-price">{money(items[s] * PRICE)}</span>
                  </div>
                  <p className="bag-meta">{t.cart.meta}</p>
                  <p className="bag-gift">
                    <Crescent /> {t.cart.gift}
                  </p>
                  <div className="bag-row bag-controls">
                    <div className="qty" role="group" aria-label={t.cart.qty}>
                      <button type="button" onClick={() => setQty(s, items[s] - 1)} aria-label="−">
                        −
                      </button>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span key={items[s]} className="num" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.25 }}>
                          {items[s]}
                        </motion.span>
                      </AnimatePresence>
                      <button type="button" onClick={() => setQty(s, items[s] + 1)} aria-label="+">
                        +
                      </button>
                    </div>
                    <button type="button" className="text-btn" onClick={() => setQty(s, 0)}>
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {missing && (
        <motion.div layout className={`upsell tint-${missing}`}>
          <img src={IMG.set[missing]} alt="" />
          <div>
            <p className="eyebrow">{t.cart.upsell}</p>
            <p className="display upsell-name">{t.scents[missing].name}</p>
            <p className="num muted">{money(PRICE)}</p>
          </div>
          <button type="button" className="upsell-add" onClick={() => add(missing, { openBag: false })}>
            + {t.cart.add}
          </button>
        </motion.div>
      )}

      <motion.div layout className="bag-foot">
        <div className="bag-total">
          <span>{t.cart.subtotal}</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={total} className="num display" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
              {money(total)}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="muted small">{t.cart.delivery}</p>
        <Button className="btn-block" onClick={() => setStep(1)}>
          {t.cart.next} <Arrow className="flip-rtl" />
        </Button>
      </motion.div>
    </>
  )
}

function Details() {
  const { t, lang, money } = useLang()
  const { items, total, setStep } = useCart()
  const [d, setD] = useState(loadDetails)
  const [touched, setTouched] = useState(false)

  const digits = d.phone.replace(/\D/g, '')
  const errors = {
    name: d.name.trim().length < 2 ? t.cart.required : '',
    phone: !d.phone.trim() ? t.cart.required : digits.length < 7 || digits.length > 15 ? t.cart.badPhone : '',
    city: !d.city.trim() ? t.cart.required : '',
    address: d.address.trim().length < 3 ? t.cart.required : '',
  }
  const ok = !Object.values(errors).some(Boolean)

  const set = (k) => (e) => {
    const next = { ...d, [k]: e.target.value }
    setD(next)
    try {
      localStorage.setItem('luna-details', JSON.stringify(next))
    } catch {}
  }

  const submit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!ok) {
      e.currentTarget.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    window.open(whatsappLink(orderMessage(t, items, d)), '_blank', 'noopener')
    setStep(2)
  }

  const field = (k, props = {}) => (
    <label className={`field ${touched && errors[k] ? 'has-error' : ''} ${k === 'address' || k === 'notes' ? 'field-wide' : ''}`}>
      <span className="field-label">{t.cart.fields[k]}</span>
      {k === 'notes' ? (
        <textarea rows={2} value={d[k]} onChange={set(k)} />
      ) : (
        <input value={d[k]} onChange={set(k)} aria-invalid={touched && !!errors[k]} {...props} />
      )}
      <AnimatePresence>
        {touched && errors[k] && (
          <motion.span className="field-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {errors[k]}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )

  return (
    <form className="details" onSubmit={submit} noValidate>
      <h3 className="display details-title">{t.cart.detailsTitle}</h3>
      <div className="fields">
        {field('name', { autoComplete: 'name' })}
        {field('phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', dir: 'ltr' })}
        {field('city', { autoComplete: 'address-level2' })}
        {field('address', { autoComplete: 'street-address' })}
        {field('notes')}
      </div>

      <div className="summary">
        <p className="eyebrow">{t.cart.summary}</p>
        {SCENTS.filter((s) => items[s]).map((s) => (
          <div className="summary-row" key={s}>
            <span>
              {t.scents[s].name} <span className="num muted">× {items[s]}</span>
            </span>
            <span className="num">{money(items[s] * PRICE)}</span>
          </div>
        ))}
        <div className="summary-row summary-total">
          <span>{t.cart.subtotal}</span>
          <span className="num">{money(total)}</span>
        </div>
      </div>

      <div className="details-actions">
        <button type="button" className="text-btn" onClick={() => setStep(0)}>
          <Arrow className="flip-ltr" /> {t.cart.back}
        </button>
        <Button type="submit" className="btn-wa" lang={lang}>
          <WhatsAppIcon /> {t.cart.send}
        </Button>
      </div>
    </form>
  )
}

function Sent() {
  const { t } = useLang()
  const { clear, closeBag, setStep, items } = useCart()
  const reopen = () => {
    const d = loadDetails()
    window.open(whatsappLink(orderMessage(t, items, d)), '_blank', 'noopener')
  }
  const done = () => {
    clear()
    closeBag()
    setTimeout(() => setStep(0), 900)
  }
  return (
    <div className="sent">
      <motion.div className="sent-moon" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: EASE }}>
        <Crescent />
      </motion.div>
      <h3 className="display sent-title">{t.cart.sentTitle}</h3>
      <p className="muted">{t.cart.sentText}</p>
      <div className="sent-actions">
        <Button variant="outline" onClick={reopen}>
          <WhatsAppIcon /> {t.cart.reopen}
        </Button>
        <Button onClick={done}>{t.cart.done}</Button>
      </div>
    </div>
  )
}
