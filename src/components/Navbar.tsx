import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import anime from 'animejs'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const indicatorRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Animate the active indicator to the correct nav link
  useEffect(() => {
    const container = navContainerRef.current
    const indicator = indicatorRef.current
    if (!container || !indicator) return

    const activeIndex = navLinks.findIndex(
      (link) => link.path === location.pathname
    )
    if (activeIndex === -1) {
      // No match — hide indicator
      anime({
        targets: indicator,
        opacity: 0,
        duration: 200,
        easing: 'easeOutCubic',
      })
      return
    }

    const activeLinkEl = linkRefs.current[activeIndex]
    if (!activeLinkEl) return

    // Use a small delay to ensure layout has settled after route change
    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect()
      const linkRect = activeLinkEl.getBoundingClientRect()

      // Position indicator directly under the link text
      const indicatorLeft = linkRect.left - containerRect.left
      const indicatorWidth = linkRect.width

      anime({
        targets: indicator,
        left: indicatorLeft,
        width: indicatorWidth,
        opacity: 1,
        duration: 400,
        easing: 'easeOutCubic',
      })
    })
  }, [location.pathname])

  // Mobile menu animation
  const toggleMobileMenu = useCallback(() => {
    const menu = mobileMenuRef.current
    const inner = mobileMenuInnerRef.current
    if (!menu || !inner) {
      setIsOpen((prev) => !prev)
      return
    }

    if (!isOpen) {
      // Open
      setIsOpen(true)
      menu.style.display = 'block'
      anime({
        targets: menu,
        height: [0, inner.scrollHeight],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic',
      })

      // Stagger menu items
      anime({
        targets: menu.querySelectorAll('.mobile-nav-link'),
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: anime.stagger(50, { start: 100 }),
        duration: 300,
        easing: 'easeOutCubic',
      })
    } else {
      // Close
      anime({
        targets: menu,
        height: 0,
        opacity: 0,
        duration: 250,
        easing: 'easeInCubic',
        complete: () => {
          menu.style.display = 'none'
          setIsOpen(false)
        },
      })
    }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-surface-200/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-surface-900 hover:text-accent-600 transition-colors"
        >
          danilo<span className="text-accent-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <div ref={navContainerRef} className="hidden md:flex items-center gap-1 relative">
          {/* Animated indicator bar */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-accent-500 rounded-full pointer-events-none"
            style={{ opacity: 0, width: 0, left: 0 }}
          />
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                ref={(el) => { linkRefs.current[i] = el }}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-accent-600'
                    : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Resume Button (Desktop) */}
        <a
          href="/src/assets/GONZALES-DANILO-RESUME-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent-500 hover:bg-accent-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Resume
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-surface-600 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden bg-white/95 backdrop-blur-xl border-b border-surface-200 overflow-hidden"
        style={{ display: 'none', height: 0, opacity: 0 }}
      >
        <div ref={mobileMenuInnerRef} className="px-6 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-link block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-accent-600 bg-accent-50'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <a
            href="/src/assets/GONZALES-DANILO-RESUME-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link block px-4 py-3 text-sm font-medium text-accent-600 bg-accent-50 rounded-lg mt-2 text-center"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  )
}
