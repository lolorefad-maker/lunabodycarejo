import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { EASE, IMG, SCENTS } from '../lib/config.js'
import { useLang } from '../lib/store.jsx'
import { Crescent, Moon } from '../components/brand.jsx'
import { FadeUp, Hairline, Parallax, Reveal, ScrubText } from '../components/motion.jsx'
import { Arrow, Button, useGoTo, useIntro } from '../components/ui.jsx'

export default function About() {
  return (
    <main className="about">
      <AboutHero />
      <Story />
      <Quote />
      <Beliefs />
      <Moods />
      <Gallery />
      <AboutCta />
    </main>
  )
}

function AboutHero() {
  const { t } = useLang()
  const ready = useIntro()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const lit = useTransform(scrollYProgress, [0, 0.8], [0.22, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const rot = useTransform(scrollYProgress, [0, 1], [0, 40])
  return (
    <section className="ahero" ref={ref}>
      <motion.div className="ahero-moon" style={{ y, rotate: rot }} initial={{ opacity: 0, scale: 0.85 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.8, ease: EASE }}>
        <Moon lit={lit} />
      </motion.div>
      <div className="container ahero-inner">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
          <Crescent /> {t.about.eyebrow}
        </motion.p>
        <Reveal as="h1" className="display ahero-title" lines={t.about.title} play={ready} delay={0.2} stagger={0.1} />
        <motion.p className="ahero-sub" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}>
          {t.about.sub}
        </motion.p>
      </div>
    </section>
  )
}

function Story() {
  const { t } = useLang()
  return (
    <section className="section story">
      <div className="container story-grid">
        <div className="story-aside">
          <div className="story-sticky">
            <FadeUp as="p" className="eyebrow">
              <Crescent /> {t.about.storyEyebrow}
            </FadeUp>
            <div className="story-img tint-musk">
              <Parallax speed={0.08}>
                <img src={IMG.box.musk} alt={t.scents.musk.name} loading="lazy" />
              </Parallax>
            </div>
          </div>
        </div>
        <div className="story-text">
          {t.about.story.map((p, i) => (
            <FadeUp as="p" key={i} className={i === 0 ? 'display story-lead' : 'story-p'} delay={i * 0.05}>
              {p}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Quote() {
  const { t } = useLang()
  return (
    <section className="section quote">
      <div className="container quote-inner">
        <Crescent className="quote-moon" />
        <ScrubText text={t.about.quote} className="display quote-text" />
      </div>
    </section>
  )
}

function Beliefs() {
  const { t } = useLang()
  return (
    <section className="section beliefs">
      <div className="container">
        <header className="sec-head">
          <FadeUp as="p" className="eyebrow">
            <Crescent /> {t.about.beliefsEyebrow}
          </FadeUp>
          <Reveal className="display sec-title" lines={t.about.beliefsTitle} />
        </header>
        <div className="beliefs-grid">
          {t.about.beliefs.map((b, i) => (
            <article key={b.title} className="belief">
              <Hairline delay={i * 0.1} />
              <FadeUp delay={0.1 + i * 0.1} y={26}>
                <span className="num belief-num">0{i + 1}</span>
                <h3 className="display belief-title">{b.title}</h3>
                <p className="muted">{b.text}</p>
              </FadeUp>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Moods() {
  const { t } = useLang()
  return (
    <section className="section moods">
      <div className="container">
        <header className="sec-head sec-head-center">
          <Reveal className="display sec-title" lines={t.about.moodsTitle} />
        </header>
        <div className="moods-grid">
          {SCENTS.map((s, i) => (
            <FadeUp key={s} className={`mood tint-${s}`} delay={i * 0.15} y={60}>
              <div className="mood-img">
                <Parallax speed={0.06}>
                  <img src={IMG.set[s]} alt={t.scents[s].name} loading="lazy" />
                </Parallax>
              </div>
              <div className="mood-copy">
                <span className="eyebrow">{t.scents[s].mood}</span>
                <h3 className="display mood-name">{t.scents[s].name}</h3>
                <p>{t.about.moods[s]}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Pinned horizontal gallery: vertical scroll moves the strip sideways. */
function Gallery() {
  const { t, dir } = useLang()
  const ref = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const measure = () => setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [dir])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const raw = useTransform(scrollYProgress, [0, 1], [0, dir === 'rtl' ? dist : -dist])
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  const items = [
    { src: IMG.box.musk, tint: 'musk', cls: 'g-tall' },
    { src: IMG.set.musk, tint: 'musk', cls: 'g-wide' },
    { src: IMG.set.fruity, tint: 'fruity', cls: 'g-wide' },
    { src: IMG.box.fruity, tint: 'fruity', cls: 'g-square' },
  ]

  return (
    <section className="hgallery" ref={ref} style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="hg-sticky">
        <div className="container hg-head">
          <p className="eyebrow">
            <Crescent /> {t.about.galleryEyebrow}
          </p>
          <div className="hg-bar">
            <motion.span style={{ scaleX: bar }} />
          </div>
        </div>
        <motion.div className="hg-track" ref={track} style={{ x }}>
          {items.map((it, i) => (
            <figure key={i} className={`hg-item ${it.cls} tint-${it.tint}`}>
              <div className="hg-img">
                <img src={it.src} alt={t.about.gallery[i]} loading="lazy" />
              </div>
              <figcaption>
                <span className="num">0{i + 1}</span> {t.about.gallery[i]}
              </figcaption>
            </figure>
          ))}
          <div className="hg-end display" aria-hidden="true">
            <Crescent />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AboutCta() {
  const { t } = useLang()
  const goTo = useGoTo()
  return (
    <section className="section about-cta">
      <div className="container about-cta-inner">
        <Reveal className="display finale-title" lines={t.about.ctaTitle} />
        <FadeUp delay={0.2}>
          <Button onClick={() => goTo('#collection')}>
            {t.about.cta} <Arrow className="flip-rtl" />
          </Button>
        </FadeUp>
      </div>
    </section>
  )
}
