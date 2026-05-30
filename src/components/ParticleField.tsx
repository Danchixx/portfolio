import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface Particle {
  el: HTMLDivElement
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const PARTICLE_COUNT = 50
    const particles: Particle[] = []

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('div')
      const size = Math.random() * 4 + 2
      const x = Math.random() * 100
      const y = Math.random() * 100
      const opacity = Math.random() * 0.4 + 0.1
      const speed = Math.random() * 20000 + 15000

      el.className = 'particle'
      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: var(--color-accent-400);
        left: ${x}%;
        top: ${y}%;
        opacity: ${opacity};
        pointer-events: none;
        will-change: transform;
      `

      container.appendChild(el)
      particles.push({ el, x, y, size, opacity, speed })
    }

    // Add a few larger glowing orbs
    for (let i = 0; i < 5; i++) {
      const el = document.createElement('div')
      const size = Math.random() * 60 + 40
      const x = Math.random() * 100
      const y = Math.random() * 100

      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--color-accent-200) 0%, transparent 70%);
        left: ${x}%;
        top: ${y}%;
        opacity: 0.3;
        pointer-events: none;
        filter: blur(8px);
        will-change: transform;
      `

      container.appendChild(el)
      particles.push({ el, x, y, size, opacity: 0.3, speed: Math.random() * 30000 + 20000 })
    }

    // Animate each particle with its own looping drift
    const animations = particles.map((p) => {
      const driftX = (Math.random() - 0.5) * 80
      const driftY = (Math.random() - 0.5) * 80

      return anime({
        targets: p.el,
        translateX: [0, driftX, -driftX * 0.5, 0],
        translateY: [0, -driftY, driftY * 0.5, 0],
        opacity: [
          { value: p.opacity * 0.6, duration: p.speed * 0.3 },
          { value: p.opacity, duration: p.speed * 0.3 },
          { value: p.opacity * 0.8, duration: p.speed * 0.4 },
        ],
        scale: [
          { value: 1, duration: 0 },
          { value: p.size > 20 ? 1.3 : 1.5, duration: p.speed * 0.5 },
          { value: 1, duration: p.speed * 0.5 },
        ],
        duration: p.speed,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
      })
    })

    return () => {
      animations.forEach((a) => a.pause())
      // Remove created elements
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="particle-field"
      aria-hidden="true"
    />
  )
}
