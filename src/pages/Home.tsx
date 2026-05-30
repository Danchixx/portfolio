import { useEffect, useRef } from 'react'
import { ArrowRight, Download } from 'lucide-react'
import anime from 'animejs'
import Button from '../components/Button'
import ParticleField from '../components/ParticleField'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    // Set initial states
    const badge = hero.querySelector('.hero-badge') as HTMLElement
    const heading = hero.querySelector('.hero-heading') as HTMLElement
    const subtitle = hero.querySelector('.hero-subtitle') as HTMLElement
    const desc = hero.querySelector('.hero-description') as HTMLElement
    const cta = hero.querySelector('.hero-cta') as HTMLElement
    const techRow = hero.querySelector('.hero-tech') as HTMLElement

    const elements = [badge, heading, subtitle, desc, cta, techRow].filter(Boolean)
    elements.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(25px)'
    })

    // Staggered entrance timeline
    const tl = anime.timeline({ easing: 'easeOutCubic' })

    tl.add({
      targets: badge,
      opacity: [0, 1],
      translateY: [25, 0],
      duration: 600,
    })
      .add(
        {
          targets: heading,
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 700,
        },
        '-=400'
      )
      .add(
        {
          targets: subtitle,
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 600,
        },
        '-=400'
      )
      .add(
        {
          targets: desc,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        },
        '-=350'
      )
      .add(
        {
          targets: cta,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        },
        '-=300'
      )
      .add(
        {
          targets: techRow,
          opacity: [0, 1],
          duration: 600,
        },
        '-=200'
      )

    // Animate heading text words
    if (heading) {
      const words = heading.querySelectorAll('.hero-word')
      words.forEach((w) => {
        ;(w as HTMLElement).style.opacity = '0'
        ;(w as HTMLElement).style.transform = 'translateY(20px)'
      })
      anime({
        targets: words,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(80, { start: 200 }),
        duration: 600,
        easing: 'easeOutCubic',
      })
    }

    // Tech items stagger
    if (techRow) {
      const techItems = techRow.querySelectorAll('.tech-item')
      techItems.forEach((item) => {
        ;(item as HTMLElement).style.opacity = '0'
        ;(item as HTMLElement).style.transform = 'translateY(10px)'
      })
      anime({
        targets: techItems,
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(60, { start: 800 }),
        duration: 500,
        easing: 'easeOutCubic',
      })
    }

    return () => {
      tl.pause()
    }
  }, [])

  // Scroll indicator infinite bounce
  useEffect(() => {
    const indicator = scrollIndicatorRef.current
    if (!indicator) return

    // Fade in after a delay
    indicator.style.opacity = '0'
    const fadeIn = anime({
      targets: indicator,
      opacity: [0, 1],
      duration: 600,
      delay: 1200,
      easing: 'easeOutCubic',
    })

    // Bounce the dot
    const bounce = anime({
      targets: indicator.querySelector('.scroll-dot'),
      translateY: [0, 8, 0],
      duration: 1500,
      loop: true,
      easing: 'easeInOutSine',
      delay: 1400,
    })

    return () => {
      fadeIn.pause()
      bounce.pause()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle background */}
      <ParticleField />

      <div ref={heroRef} className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="hero-badge">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-accent-700 bg-accent-100 rounded-full border border-accent-200/50">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for opportunities
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading mt-8 text-5xl md:text-7xl font-bold tracking-tight text-surface-900 leading-[1.1]">
            <span className="hero-word" style={{ display: 'inline-block' }}>Hi,</span>{' '}
            <span className="hero-word" style={{ display: 'inline-block' }}>I'm</span>{' '}
            <span className="hero-word text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-accent-700" style={{ display: 'inline-block' }}>
              Danilo
            </span>
          </h1>

          <p className="hero-subtitle mt-2 text-2xl md:text-3xl font-semibold text-surface-600">
            Web Developer
          </p>

          {/* Description */}
          <p className="hero-description mt-6 text-lg text-surface-500 leading-relaxed max-w-xl mx-auto">
            I build modern, responsive web applications with clean code and
            thoughtful design. Passionate about creating exceptional digital experiences.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/projects" variant="primary" size="lg">
              View Projects
              <ArrowRight size={18} />
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              <Download size={18} />
              Contact Me
            </Button>
          </div>

          {/* Tech stack row */}
          <div className="hero-tech mt-16 flex items-center justify-center gap-8 flex-wrap">
            <p className="text-xs font-medium text-surface-400 uppercase tracking-widest tech-item">
              Tech I work with
            </p>
            <div className="flex items-center gap-6">
              {['React', 'TypeScript', 'Tailwind', 'Node.js', 'Next.js'].map((tech) => (
                <span
                  key={tech}
                  className="tech-item text-sm font-medium text-surface-400 hover:text-accent-500 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-surface-300 rounded-full flex items-start justify-center pt-2">
          <div className="scroll-dot w-1.5 h-1.5 bg-surface-400 rounded-full" />
        </div>
      </div>
    </section>
  )
}
