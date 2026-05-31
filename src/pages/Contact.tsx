import { useState, useRef, useCallback } from 'react'
import type { FormEvent } from 'react'
import { Send, Mail, MapPin, Github, Linkedin } from 'lucide-react'
import anime from 'animejs'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Button from '../components/Button'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)
  const submitBtnRef = useRef<HTMLDivElement>(null)

  const infoRef = useScrollReveal({
    translateX: -30,
    translateY: 0,
    duration: 600,
  })

  const formRef = useScrollReveal({
    translateX: 30,
    translateY: 0,
    duration: 600,
    delay: 100,
  })

  // Ripple effect on submit button
  const handleRipple = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ripple.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `

    btn.style.position = 'relative'
    btn.style.overflow = 'hidden'
    btn.appendChild(ripple)

    anime({
      targets: ripple,
      width: [0, 300],
      height: [0, 300],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutCubic',
      complete: () => ripple.remove(),
    })
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitted(true)
      form.reset()

      // Animate success state
      setTimeout(() => {
        if (successRef.current) {
          anime({
            targets: successRef.current,
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 500,
            easing: 'easeOutCubic',
          })

          // SVG checkmark draw
          const checkPath = successRef.current.querySelector('.check-path') as SVGElement
          if (checkPath) {
            const length = 50
            checkPath.style.strokeDasharray = `${length}`
            checkPath.style.strokeDashoffset = `${length}`
            anime({
              targets: checkPath,
              strokeDashoffset: [length, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutCubic',
            })
          }
        }
      }, 50)

      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Input focus animation
  const handleInputFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    anime({
      targets: e.currentTarget,
      boxShadow: ['0 0 0 0px rgba(99, 102, 241, 0)', '0 0 0 4px rgba(99, 102, 241, 0.1)'],
      duration: 300,
      easing: 'easeOutCubic',
    })
  }, [])

  const handleInputBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    anime({
      targets: e.currentTarget,
      boxShadow: ['0 0 0 4px rgba(99, 102, 241, 0.1)', '0 0 0 0px rgba(99, 102, 241, 0)'],
      duration: 300,
      easing: 'easeOutCubic',
    })
  }, [])

  const inputStyles =
    'w-full px-4 py-3 text-sm text-surface-900 dark:text-surface-50 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl outline-none transition-all duration-200 placeholder:text-surface-400 focus:border-accent-400 dark:focus:border-accent-400 focus:bg-white dark:focus:bg-surface-850'

  return (
    <div className="pt-2">
      <Section>
        <SectionHeading
          title="Contact"
          align="left"
        />

        <div className="grid md:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div
            ref={infoRef}
            className="md:col-span-2 space-y-6"
            style={{ opacity: 0 }}
          >
            <div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50 mb-2">
                Let's work together
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                I'm always open to discussing new projects, creative ideas,
                or opportunities to be part of your team.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <a
                href="mailto:danilogatch@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-accent-50 dark:bg-surface-800 rounded-xl flex items-center justify-center group-hover:bg-accent-100 dark:group-hover:bg-surface-700 transition-colors">
                  <Mail size={18} className="text-accent-500" />
                </div>
                <div>
                  <p className="text-xs text-surface-400">Email</p>
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    danilogatch@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-50 dark:bg-surface-800 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-accent-500" />
                </div>
                <div>
                  <p className="text-xs text-surface-400">Location</p>
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-300">
                    Pasig City, Metro Manila
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-3">
                Find me online
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Danchixx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-100 rounded-xl flex items-center justify-center text-surface-500 hover:bg-surface-900 hover:text-white transition-all duration-200"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-100 rounded-xl flex items-center justify-center text-surface-500 hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className="md:col-span-3"
            style={{ opacity: 0 }}
          >
            <Card hover={false} className="p-6 md:p-8">
              {submitted ? (
                <div
                  ref={successRef}
                  className="flex flex-col items-center justify-center py-12 text-center"
                  style={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path
                        className="check-path"
                        d="M20 6L9 17l-5-5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-surface-900">Message Sent!</h3>
                  <p className="text-sm text-surface-500 mt-2">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-surface-700 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className={inputStyles}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className={inputStyles}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-surface-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      required
                      className={`${inputStyles} resize-none`}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>

                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div ref={submitBtnRef} onClick={!isLoading ? handleRipple : undefined}>
                    <Button type="submit" variant="primary" size="lg" className={`w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      <Send size={16} className={isLoading ? 'animate-pulse' : ''} />
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
