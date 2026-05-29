import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import Button from '../components/Button'

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-50/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-accent-700 bg-accent-100 rounded-full border border-accent-200/50">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-5xl md:text-7xl font-bold tracking-tight text-surface-900 leading-[1.1]"
          >
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-accent-700">
              Danilo
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-2xl md:text-3xl font-semibold text-surface-600"
          >
            Web Developer
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-lg text-surface-500 leading-relaxed max-w-xl mx-auto"
          >
            I build modern, responsive web applications with clean code and 
            thoughtful design. Passionate about creating exceptional digital experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button to="/projects" variant="primary" size="lg">
              View Projects
              <ArrowRight size={18} />
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              <Download size={18} />
              Contact Me
            </Button>
          </motion.div>

          {/* Tech stack row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 flex items-center justify-center gap-8 flex-wrap"
          >
            <p className="text-xs font-medium text-surface-400 uppercase tracking-widest">
              Tech I work with
            </p>
            <div className="flex items-center gap-6">
              {['React', 'TypeScript', 'Tailwind', 'Node.js', 'Next.js'].map((tech) => (
                <span
                  key={tech}
                  className="text-sm font-medium text-surface-400 hover:text-accent-500 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-surface-300 rounded-full flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-surface-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
