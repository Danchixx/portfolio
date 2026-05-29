import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-surface-900">
              danilo<span className="text-accent-500">.</span>
            </p>
            <p className="text-sm text-surface-500 mt-1">
              Web Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Danchixx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:danilo@example.com"
              className="p-2.5 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-surface-100 text-center">
          <p className="text-xs text-surface-400">
            © {currentYear} Danilo Gonzales. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
