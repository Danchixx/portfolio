import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface ScrollRevealOptions {
  /** Translate Y start value in px (default: 40) */
  translateY?: number
  /** Translate X start value in px (default: 0) */
  translateX?: number
  /** Animation duration in ms (default: 800) */
  duration?: number
  /** Stagger delay between children in ms. If set, animates children instead of the element itself. */
  stagger?: number
  /** Child selector when using stagger (default: ':scope > *') */
  childSelector?: string
  /** Intersection observer threshold (default: 0.15) */
  threshold?: number
  /** Root margin for IntersectionObserver (default: '0px 0px -60px 0px') */
  rootMargin?: string
  /** Only animate once (default: true) */
  once?: boolean
  /** Delay before animation starts in ms (default: 0) */
  delay?: number
  /** Easing function (default: 'easeOutCubic') */
  easing?: string
  /** Scale start value (default: 1) */
  scale?: number
  /** Opacity start value (default: 0) */
  opacity?: number
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      translateY = 40,
      translateX = 0,
      duration = 800,
      stagger,
      childSelector = ':scope > *',
      threshold = 0.15,
      rootMargin = '0px 0px -60px 0px',
      once = true,
      delay = 0,
      easing = 'easeOutCubic',
      scale = 1,
      opacity = 0,
    } = options

    // Determine targets
    const targets =
      stagger != null ? el.querySelectorAll(childSelector) : el

    // Set initial state
    if (stagger != null) {
      const children = el.querySelectorAll(childSelector)
      children.forEach((child) => {
        ;(child as HTMLElement).style.opacity = String(opacity)
        ;(child as HTMLElement).style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`
      })
    } else {
      el.style.opacity = String(opacity)
      el.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !(once && hasAnimated.current)) {
            hasAnimated.current = true

            anime({
              targets,
              opacity: [opacity, 1],
              translateY: [translateY, 0],
              translateX: [translateX, 0],
              scale: [scale, 1],
              duration,
              delay: stagger != null
                ? anime.stagger(stagger, { start: delay })
                : delay,
              easing,
            })

            if (once) {
              observer.unobserve(el)
            }
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
