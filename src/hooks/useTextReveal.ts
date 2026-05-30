import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface TextRevealOptions {
  /** Split mode: 'word' or 'char' (default: 'word') */
  splitBy?: 'word' | 'char'
  /** Duration per element in ms (default: 600) */
  duration?: number
  /** Stagger delay in ms (default: 60) */
  stagger?: number
  /** Starting translateY in px (default: 30) */
  translateY?: number
  /** Easing (default: 'easeOutCubic') */
  easing?: string
  /** Delay before animation starts (default: 0) */
  delay?: number
  /** Animate on scroll into view (default: false — animates immediately) */
  onScroll?: boolean
  /** IntersectionObserver threshold (default: 0.3) */
  threshold?: number
}

export function useTextReveal(options: TextRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      splitBy = 'word',
      duration = 600,
      stagger: staggerDelay = 60,
      translateY = 30,
      easing = 'easeOutCubic',
      delay = 0,
      onScroll = false,
      threshold = 0.3,
    } = options

    // Preserve the original text
    const originalText = el.textContent || ''

    // Split into spans
    const pieces =
      splitBy === 'char' ? originalText.split('') : originalText.split(/\s+/)

    el.innerHTML = ''
    el.style.overflow = 'hidden'

    pieces.forEach((piece, i) => {
      const wrapper = document.createElement('span')
      wrapper.style.display = 'inline-block'
      wrapper.style.overflow = 'hidden'
      wrapper.style.verticalAlign = 'top'

      const inner = document.createElement('span')
      inner.textContent = piece
      inner.className = 'text-reveal-piece'
      inner.style.display = 'inline-block'
      inner.style.opacity = '0'
      inner.style.transform = `translateY(${translateY}px)`

      wrapper.appendChild(inner)
      el.appendChild(wrapper)

      // Add space between words
      if (splitBy === 'word' && i < pieces.length - 1) {
        const space = document.createTextNode('\u00A0')
        el.appendChild(space)
      }
    })

    const runAnimation = () => {
      if (hasRun.current) return
      hasRun.current = true

      anime({
        targets: el.querySelectorAll('.text-reveal-piece'),
        opacity: [0, 1],
        translateY: [translateY, 0],
        duration,
        delay: anime.stagger(staggerDelay, { start: delay }),
        easing,
      })
    }

    if (!onScroll) {
      runAnimation()
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runAnimation()
              observer.unobserve(el)
            }
          })
        },
        { threshold }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
