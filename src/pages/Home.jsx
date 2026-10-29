import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { EASE, IMG, PRICE, RITUAL, SCENTS, SPOTS } from '../lib/config.js'
import { useLang, useScent, useScrollTo } from '../lib/store.jsx'
import { Crescent, Moon, OrbitBadge } from '../components/brand.jsx'
import { FadeUp, Hairline, Magnetic, Marquee, Parallax, Reveal, ScrubText } from '../components/motion.jsx'
import { AddButton, Arrow, Button, ScentSwitch, useIntro } from '../components/ui.jsx'

export default function Home() {
  const { state } = useLocation()
  const scrollTo = useScrollTo()

  useEffect(() => {
    if (!state?.section) return
    const id = setTimeout(() => scrollTo(state.section), 950)
    return () => clearTimeout(id)
  }, [state, scrollTo])

  return (
    <main>
      <Hero />
      <Ribbon />
      <Manifesto />
      <Collection />
      <Ritual />
      <Gift />
      <HowToOrder />
      <Finale />
    </main>
  )
}

/* ---------- Hero ---------- */

function Hero() {
  const { t, dir } = useLang()
  const { scent } = useScent()
  const ready = useIntro()
  const scrollTo = useScrollTo()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const enter = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1.2, ease: EASE, delay },
  })

  return (
    <section className="hero" ref={ref}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
          <motion.p className="eyebrow" {...enter(0.05)}>
            <Crescent /> {t.hero.eyebrow}
          </motion.p>
          <Reveal as="h1" className="display hero-title" lines={t.hero.title} play={ready} delay={0.15} stagger={0.09} />
          <motion.p className="hero-sub" {...enter(0.75)}>
            {t.hero.sub}
          </motion.p>
          <motion.div className="hero-choose" {...enter(0.9)}>
            <ScentSwitch />
          </motion.div>
          <motion.div className="hero-actions" {...enter(1.02)}>
            <Magnetic>
              <AddButton id={scent} withPrice />
            </Magnetic>
            <button type="button" className="link-btn" onClick={() => scrollTo('#ritual')}>
              {t.hero.secondary} <Arrow className="flip-rtl" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: imgY, scale: imgScale }}>
          <motion.div
            className="hero-frame"
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)' }}
            animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)' } : {}}
            transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
          >
            <div className="hero-moon">
              <Moon lit={scent === 'musk' ? 0.62 : 0.38} />
            </div>
            {/* No blur on this swap: a filter cancels mix-blend-mode and the photo's white backdrop would show. */}
            <AnimatePresence initial={false}>
              <motion.img
                key={scent}
                src={IMG.box[scent]}
                alt={t.scents[scent].name}
                className={`hero-box hero-box-${scent}`}
                initial={{ opacity: 0, scale: 1.06, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -10 }}
                transition={{ duration: 1.1, ease: EASE }}
                fetchPriority="high"
              />
            </AnimatePresence>
          </motion.div>
          <svg className="hero-orbit" viewBox="0 0 400 400" aria-hidden="true">
            <motion.circle
              cx="200"
              cy="200"
              r="196"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              animate={ready ? { pathLength: 1 } : {}}
              transition={{ duration: 2.4, ease: EASE, delay: 0.4 }}
            />
          </svg>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 1.1 }}
          >
            <OrbitBadge text={t.hero.badge} rtl={dir === 'rtl'} />
          </motion.div>
        </motion.div>
      </div>

      <motion.button type="button" className="hero-scroll" onClick={() => scrollTo('#manifesto')} {...enter(1.4)}>
        <span>{t.hero.scroll}</span>
        <i />
      </motion.button>
    </section>
  )
}

/* ---------- Ribbon ---------- */

function Ribbon() {
  const { t } = useLang()
  return (
    <div className="ribbon">
      <Marquee items={t.marquee} speed={2.2} />
    </div>
  )
}

/* ---------- Manifesto ---------- */

function Manifesto() {
  const { t } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lit = useTransform(scrollYProgress, [0.1, 0.7], [0.08, 1])
  const rot = useTransform(scrollYProgress, [0, 1], [-18, 18])
  return (
    <section id="manifesto" className="section manifesto" ref={ref}>
      <div className="container manifesto-grid">
        <motion.div className="manifesto-moon" style={{ rotate: rot }}>
          <Moon lit={lit} />
        </motion.div>
        <div>
          <FadeUp as="p" className="eyebrow">
            <Crescent /> {t.manifesto.eyebrow}
          </FadeUp>
          <ScrubText text={t.manifesto.text} className="display manifesto-text" />
        </div>
      </div>
    </section>
  )
}

/* ---------- Collection ---------- */

function Collection() {
  const { t } = useLang()
  return (
    <section id="collection" className="section collection">
      <header className="container sec-head">
        <FadeUp as="p" className="eyebrow">
          <Crescent /> {t.collection.eyebrow}
        </FadeUp>
        <Reveal className="display sec-title" lines={t.collection.title} />
        <FadeUp as="p" className="sec-sub" delay={0.2}>
          {t.collection.sub}
        </FadeUp>
      </header>
      <div className="container-wide panels">
        {SCENTS.map((s, i) => (
          <ScentPanel key={s} s={s} i={i} />
        ))}
      </div>
    </section>
  )
}

function ScentPanel({ s, i }) {
  const { t, money } = useLang()
  const { setScent } = useScent()
  const scrollTo = useScrollTo()
  const sc = t.scents[s]
  return (
    <motion.article
      className={`panel tint-${s}`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.3, ease: EASE, delay: i * 0.14 }}
      onMouseEnter={() => setScent(s)}
    >
      <div className="panel-top">
        <span className="num panel-index">0{i + 1}</span>
        <span className="panel-mood">{sc.mood}</span>
      </div>
      <div className="panel-media">
        <Parallax speed={0.07}>
          <img src={IMG.set[s]} alt={`${sc.name} — ${t.collection.pieces}`} loading="lazy" />
        </Parallax>
      </div>
      <div className="panel-body">
        <h3 className="display panel-name">{sc.name}</h3>
        <ul className="panel-notes">
          {sc.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="panel-desc">{sc.desc}</p>
        <Hairline />
        <div className="panel-buy">
          <div>
            <span className="num display panel-price">{money(PRICE)}</span>
            <span className="panel-pieces">{t.collection.pieces}</span>
          </div>
          <div className="panel-actions">
            <AddButton id={s} />
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setScent(s)
                scrollTo('#ritual')
              }}
            >
              {t.collection.details} <Arrow className="flip-rtl" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ---------- Ritual: the five pieces, one at a time ---------- */

const SPOT_SIZE = { gel: [13, 36], lotion: [13, 34], mist: [12, 32], scrub: [19, 27], butter: [19, 27] }
const ZOOM = { gel: 1.5, lotion: 1.5, mist: 1.5, scrub: 1.38, butter: 1.38 }

function Ritual() {
  const { t } = useLang()
  const [active, setActive] = useState(-1)
  const scrollTo = useScrollTo()
  const headRef = useRef(null)
  const headIn = useInView(headRef, { margin: '-40% 0px -40% 0px' })
  useEffect(() => {
    if (headIn) setActive(-1)
  }, [headIn])

  return (
    <section id="ritual" className="section ritual">
      <div className="container ritual-grid">
        <div className="ritual-stage-col">
          <Stage active={active} onPick={(i) => scrollTo(`#step-${RITUAL[i]}`, { offset: -window.innerHeight * 0.3 })} />
        </div>
        <div className="ritual-steps">
          <header className="ritual-head" ref={headRef}>
            <FadeUp as="p" className="eyebrow">
              <Crescent /> {t.inside.eyebrow}
            </FadeUp>
            <Reveal className="display sec-title" lines={t.inside.title} />
            <FadeUp as="p" className="sec-sub" delay={0.15}>
              {t.inside.sub}
            </FadeUp>
            <FadeUp delay={0.25}>
              <ScentSwitch />
            </FadeUp>
            <FadeUp as="p" className="ritual-hint" delay={0.35}>
              {t.inside.overview}
            </FadeUp>
          </header>
          {RITUAL.map((p, i) => (
            <RitualStep key={p} p={p} i={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Stage({ active, onPick }) {
  const { t } = useLang()
  const { scent } = useScent()
  const key = active >= 0 ? RITUAL[active] : null
  const [cx, cy] = key ? SPOTS[scent][key] : [50, 50]
  const [rx, ry] = key ? SPOT_SIZE[key] : [160, 160]
  const s = key ? ZOOM[key] : 1
  return (
    <div className={`stage tint-${scent}`}>
      <div className="stage-moon" aria-hidden="true">
        <Moon lit={key ? (active + 1) / 5 : 1} />
      </div>
      <div className="stage-view">
        <motion.div
          className={`stage-zoom stage-${scent}`}
          animate={{ x: `${-s * (cx - 50)}%`, y: `${-s * (cy - 50)}%`, scale: s }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <AnimatePresence initial={false}>
            <motion.div key={scent} className="stage-imgs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
              <img className="stage-dim" src={IMG.set[scent]} alt="" />
              <motion.img
                className="stage-lit"
                src={IMG.set[scent]}
                alt={t.scents[scent].name}
                style={{ '--sx': '50%', '--sy': '50%', '--rx': '160%', '--ry': '160%' }}
                animate={{ '--sx': `${cx}%`, '--sy': `${cy}%`, '--rx': `${rx}%`, '--ry': `${ry}%` }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            {!key &&
              RITUAL.map((p, i) => (
                <motion.button
                  key={`${scent}-${p}`}
                  type="button"
                  className="hotspot"
                  style={{ left: `${SPOTS[scent][p][0]}%`, top: `${SPOTS[scent][p][1]}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.07 }}
                  onClick={() => onPick(i)}
                  aria-label={t.products[p].name}
                  data-cursor={`0${i + 1}`}
                >
                  <span className="hotspot-tip">{t.products[p].name}</span>
                </motion.button>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="stage-caption">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={key ?? 'all'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            {key ? (
              <>
                <span className="num">0{active + 1}</span> <span className="stage-sep" /> {t.products[key].name}
              </>
            ) : (
              <>
                <span className="num">05</span> <span className="stage-sep" /> {t.scents[scent].name}
              </>
            )}
          </motion.span>
        </AnimatePresence>
        <div className="stage-dots" aria-hidden="true">
          {RITUAL.map((p, i) => (
            <span key={p} className={i === active ? 'on' : i < active ? 'past' : ''} />
          ))}
        </div>
      </div>
    </div>
  )
}

function RitualStep({ p, i, onActive }) {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-46% 0px -46% 0px' })
  useEffect(() => {
    if (inView) onActive(i)
  }, [inView, i, onActive])
  const pr = t.products[p]
  return (
    <article ref={ref} className={`ritual-step ${inView ? 'is-on' : ''}`} id={`step-${p}`}>
      <FadeUp className="rs-num num" y={20}>
        0{i + 1}
      </FadeUp>
      <div className="rs-body">
        <FadeUp as="p" className="eyebrow" y={16}>
          {pr.verb}
          {p === 'mist' && <span className="gift-chip">{t.inside.gift}</span>}
        </FadeUp>
        <Reveal as="h3" className="display rs-name" lines={[{ text: pr.name }]} stagger={0.05} />
        <FadeUp as="p" className="rs-tag" delay={0.1} y={16}>
          {pr.tag} <span className="rs-size num">{pr.size}</span>
        </FadeUp>
        <FadeUp as="p" className="rs-desc" delay={0.18} y={16}>
          {pr.desc}
        </FadeUp>
      </div>
    </article>
  )
}

/* ---------- The gift box ---------- */

function Gift() {
  const { t } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const clip = useTransform(scrollYProgress, [0.05, 0.45], ['inset(16% 12% 16% 12% round 999px 999px 0px 0px)', 'inset(0% 0% 0% 0% round 999px 999px 0px 0px)'])
  const scale = useTransform(scrollYProgress, [0.05, 0.5], [1.18, 1])
  const y2 = useTransform(scrollYProgress, [0, 1], ['18%', '-22%'])
  return (
    <section className="section gift" ref={ref}>
      <div className="container gift-grid">
        <div className="gift-media">
          <motion.div className="gift-frame tint-musk" style={{ clipPath: clip }}>
            <motion.img src={IMG.box.musk} alt={t.scents.musk.name} style={{ scale }} loading="lazy" />
          </motion.div>
          <motion.div className="gift-frame-2 tint-fruity" style={{ y: y2 }}>
            <img src={IMG.box.fruity} alt={t.scents.fruity.name} loading="lazy" />
          </motion.div>
        </div>
        <div className="gift-copy">
          <FadeUp as="p" className="eyebrow">
            <Crescent /> {t.gift.eyebrow}
          </FadeUp>
          <Reveal className="display sec-title" lines={t.gift.title} />
          <FadeUp as="p" className="sec-sub" delay={0.15}>
            {t.gift.text}
          </FadeUp>
          <ul className="gift-list">
            {t.gift.list.map((l, i) => (
              <FadeUp as="li" key={l} delay={0.2 + i * 0.1} y={18}>
                <span className="num">0{i + 1}</span> {l}
              </FadeUp>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- How to order ---------- */

function HowToOrder() {
  const { t } = useLang()
  const scrollTo = useScrollTo()
  return (
    <section className="section order">
      <div className="container">
        <header className="sec-head sec-head-row">
          <div>
            <FadeUp as="p" className="eyebrow">
              <Crescent /> {t.order.eyebrow}
            </FadeUp>
            <Reveal className="display sec-title" lines={t.order.title} />
          </div>
          <FadeUp delay={0.2}>
            <Button variant="outline" onClick={() => scrollTo('#collection')}>
              {t.order.cta} <Arrow className="flip-rtl" />
            </Button>
          </FadeUp>
        </header>
        <ol className="order-steps">
          {t.order.steps.map((s, i) => (
            <li key={s.title} className="order-step">
              <Hairline delay={i * 0.15} />
              <FadeUp delay={0.1 + i * 0.15} y={24}>
                <span className="num display order-num">0{i + 1}</span>
                <h3 className="display order-title">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Finale ---------- */

function Finale() {
  const { t } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const lit = useTransform(scrollYProgress, [0, 1], [0.05, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1])
  return (
    <section className="section finale" ref={ref}>
      <motion.div className="finale-moon" style={{ scale }} aria-hidden="true">
        <Moon lit={lit} />
      </motion.div>
      <div className="container finale-inner">
        <Reveal className="display finale-title" lines={t.final.title} />
        <FadeUp as="p" className="sec-sub" delay={0.2}>
          {t.final.sub}
        </FadeUp>
        <FadeUp className="finale-actions" delay={0.3}>
          {SCENTS.map((s) => (
            <div key={s} className={`finale-pick tint-${s}`}>
              <img src={IMG.set[s]} alt="" loading="lazy" />
              <div>
                <p className="display">{t.scents[s].name}</p>
                <AddButton id={s} withPrice variant="outline" />
              </div>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  )
}
