import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = headingRef.current
    const bar = barRef.current
    if (!el || !bar) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Animate the heading text
            anime({
              targets: el.querySelectorAll('.heading-word'),
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              delay: anime.stagger(50),
              easing: 'easeOutCubic',
            })

            // Animate the subtitle
            if (el.querySelector('.heading-subtitle')) {
              anime({
                targets: el.querySelector('.heading-subtitle'),
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 600,
                delay: 300,
                easing: 'easeOutCubic',
              })
            }

            // Animate the accent bar
            anime({
              targets: bar,
              width: [0, 48],
              opacity: [0, 1],
              duration: 500,
              delay: 400,
              easing: 'easeOutCubic',
            })

            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Split title into word spans
  const titleWords = title.split(' ')

  return (
    <div
      ref={headingRef}
      className={`mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-surface-900 tracking-tight">
        {titleWords.map((word, i) => (
          <span
            key={i}
            className="heading-word"
            style={{
              display: 'inline-block',
              opacity: 0,
              marginRight: i < titleWords.length - 1 ? '0.3em' : 0,
            }}
          >
            {word}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p
          className="heading-subtitle mt-4 text-surface-500 text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ opacity: 0 }}
        >
          {subtitle}
        </p>
      )}
      <div
        ref={barRef}
        className={`mt-4 h-1 bg-accent-500 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
        style={{ width: 0, opacity: 0 }}
      />
    </div>
  )
}
