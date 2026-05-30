import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function Section({ children, className = '', id }: SectionProps) {
  const ref = useScrollReveal<HTMLElement>({
    translateY: 30,
    duration: 600,
    easing: 'easeOutCubic',
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
  })

  return (
    <section
      id={id}
      ref={ref}
      className={`py-12 md:py-16 first:pt-4 ${className}`}
    >
      <div className="w-full">
        {children}
      </div>
    </section>
  )
}
