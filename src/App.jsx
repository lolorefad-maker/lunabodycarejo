import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CartProvider, LangProvider, ScentProvider, SmoothScroll, useCart, useScrollTo } from './lib/store.jsx'
import Header from './components/Header.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import { Cursor, Footer, Page, Preloader, StickyBuy } from './components/chrome.jsx'
import { IntroCtx } from './components/ui.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'

if (typeof window !== 'undefined' && 'scrollRestoration' in history) history.scrollRestoration = 'manual'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <ScentProvider>
          <CartProvider>
            <Shell />
          </CartProvider>
        </ScentProvider>
      </LangProvider>
    </MotionConfig>
  )
}

function Shell() {
  const { open } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [ready, setReady] = useState(false)

  return (
    <SmoothScroll paused={open || menuOpen || !ready}>
      <IntroCtx.Provider value={ready}>
        {!ready && <Preloader onDone={() => setReady(true)} />}
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routed />
        <StickyBuy />
        <CartDrawer />
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </IntroCtx.Provider>
    </SmoothScroll>
  )
}

function Routed() {
  const location = useLocation()
  const scrollTo = useScrollTo()
  return (
    <AnimatePresence mode="wait" onExitComplete={() => scrollTo(0, { immediate: true, force: true })}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/about"
          element={
            <Page>
              <About />
              <Footer />
            </Page>
          }
        />
        <Route
          path="*"
          element={
            <Page>
              <Home />
              <Footer />
            </Page>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}
