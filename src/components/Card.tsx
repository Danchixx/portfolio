import { useRef, useCallback, type ReactNode } from 'react'
import anime from 'animejs'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<anime.AnimeInstance | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hover || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const maxMove = 5

      // Calculate proportional movement
      const moveX = (x / rect.width) * maxMove * 2
      const moveY = (y / rect.height) * maxMove * 2

      if (animRef.current) animRef.current.pause()
      animRef.current = anime({
        targets: cardRef.current,
        translateX: moveX,
        translateY: moveY,
        scale: 1.01,
        duration: 150,
        easing: 'easeOutQuad',
      })
    },
    [hover]
  )

  const handleMouseLeave = useCallback(() => {
    if (!hover || !cardRef.current) return
    if (animRef.current) animRef.current.pause()
    animRef.current = anime({
      targets: cardRef.current,
      translateX: 0,
      translateY: 0,
      scale: 1,
      duration: 600,
      easing: 'easeOutElastic(1, .5)',
    })
  }, [hover])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-white dark:bg-surface-850 rounded-2xl border border-surface-200/80 dark:border-surface-800 shadow-sm dark:shadow-md overflow-hidden ${
        hover ? 'hover:shadow-lg dark:hover:shadow-xl hover:border-surface-300/80 dark:hover:border-surface-700' : ''
      } transition-all duration-300 ${className}`}
      style={{ willChange: hover ? 'transform' : 'auto' }}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/5 dark:border-white/10 hidden dark:block" />
      {children}
    </div>
  )
}
