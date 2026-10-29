import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { EASE, EASE_IN_OUT, INSTAGRAM_URL } from '../lib/config.js'
import { useCart, useLang } from '../lib/store.jsx'
import { whatsappChat } from '../lib/whatsapp.js'
import { Moon, Wordmark } from './brand.jsx'
import { useGoTo, WhatsAppIcon } from './ui.jsx'

export default function Header({ menuOpen, setMenuOpen }) {
  const { t, toggle } = useLang()
  const { count, openBag, pulse } = useCart()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const goTo = useGoTo()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(v > 24)
    setHidden(v > prev && v > 360)
  })

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen])

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu' : ''}`}
        animate={{ y: hidden && !menuOpen ? '-110%' : '0%' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="header-inner">
          <nav className="header-nav" aria-label="Main">
            <button type="button" className="nav-link" onClick={() => goTo('#collection')}>
              {t.nav.shop}
            </button>
            <button type="button" className="nav-link" onClick={() => goTo('#ritual')}>
              {t.nav.ritual}
            </button>
            <NavLink to="/about" className="nav-link">
              {t.nav.about}
            </NavLink>
          </nav>

          <button type="button" className="menu-btn" aria-expanded={menuOpen} aria-label={menuOpen ? t.nav.close : t.nav.menu} onClick={() => setMenuOpen((o) => !o)}>
            <span />
            <span />
          </button>

          <Link to="/" className="header-logo" aria-label="LUNA Body Care">
            <Wordmark />
          </Link>

          <div className="header-actions">
            <button type="button" className="nav-link lang-btn" onClick={toggle} lang={t.langShort === 'EN' ? 'en' : 'ar'}>
              <span className="lang-long">{t.langSwitch}</span>
              <span className="lang-short">{t.langShort}</span>
            </button>
            <button type="button" className="bag-btn" onClick={openBag} aria-label={`${t.nav.bag} (${count})`}>
              <span className="bag-label">{t.nav.bag}</span>
              <svg className="bag-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M9 10V6.5a3 3 0 0 1 6 0V10" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <motion.span
                key={pulse}
                className={`bag-count ${count ? 'has' : ''}`}
                initial={pulse ? { scale: 1.9 } : false}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 16 }}
              >
                {count}
              </motion.span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu close={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ close }) {
  const { t, toggle } = useLang()
  const goTo = useGoTo()
  const go = (sel) => {
    close()
    setTimeout(() => goTo(sel), 420)
  }
  const links = [
    { label: t.nav.shop, onClick: () => go('#collection') },
    { label: t.nav.ritual, onClick: () => go('#ritual') },
    { label: t.nav.about, to: '/about' },
  ]
  return (
    <motion.div
      className="mmenu"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease: EASE_IN_OUT }}
      data-lenis-prevent
    >
      <div className="mmenu-moon">
        <Moon lit={0.32} />
      </div>
      <nav className="mmenu-links">
        {links.map((l, i) => (
          <div className="rv-mask" key={i}>
            <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }} transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.08 }}>
              {l.to ? (
                <Link to={l.to} className="mmenu-link" onClick={close}>
                  <span className="num">0{i + 1}</span>
                  {l.label}
                </Link>
              ) : (
                <button type="button" className="mmenu-link" onClick={l.onClick}>
                  <span className="num">0{i + 1}</span>
                  {l.label}
                </button>
              )}
            </motion.div>
          </div>
        ))}
      </nav>
      <motion.div className="mmenu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
        <button type="button" className="mmenu-lang" onClick={toggle}>
          {t.langSwitch}
        </button>
        <a href={whatsappChat()} target="_blank" rel="noreferrer">
          <WhatsAppIcon /> {t.footer.whatsapp}
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          {t.footer.instagram}
        </a>
      </motion.div>
    </motion.div>
  )
}
