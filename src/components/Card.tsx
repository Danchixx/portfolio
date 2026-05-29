import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-2xl border border-surface-200/80 shadow-sm overflow-hidden ${
        hover ? 'hover:shadow-lg hover:border-surface-300/80' : ''
      } transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}
