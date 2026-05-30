import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import anime from 'animejs'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Reset state and animate in
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'

    const anim = anime({
      targets: el,
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 500,
      easing: 'easeOutCubic',
    })

    return () => {
      anim.pause()
    }
  }, [location.pathname])

  return (
    <div ref={containerRef} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  )
}
