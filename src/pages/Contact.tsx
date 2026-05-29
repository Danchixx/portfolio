import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputStyles =
    'w-full px-4 py-3 text-sm text-surface-900 bg-surface-50 border border-surface-200 rounded-xl outline-none transition-all duration-200 placeholder:text-surface-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-100 focus:bg-white'

  return (
    <div className="pt-16">
      <Section>
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or just want to say hello? I'd love to hear from you."
        />

        <div className="grid md:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">
                Let's work together
              </h3>
              <p className="text-sm text-surface-500 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, 
                or opportunities to be part of your team.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <a
                href="mailto:danilo@example.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center group-hover:bg-accent-100 transition-colors">
                  <Mail size={18} className="text-accent-500" />
                </div>
                <div>
                  <p className="text-xs text-surface-400">Email</p>
                  <p className="text-sm font-medium text-surface-700 group-hover:text-accent-600 transition-colors">
                    danilo@example.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-accent-500" />
                </div>
                <div>
                  <p className="text-xs text-surface-400">Location</p>
                  <p className="text-sm font-medium text-surface-700">
                    Available Worldwide
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            <Card hover={false} className="p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-surface-900">Message Sent!</h3>
                  <p className="text-sm text-surface-500 mt-2">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
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
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    <Send size={16} />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
