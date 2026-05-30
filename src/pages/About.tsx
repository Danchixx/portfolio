import { useEffect, useRef } from 'react'
import { Code2, Palette, Zap, Globe } from 'lucide-react'
import anime from 'animejs'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { useScrollReveal } from '../hooks/useScrollReveal'

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Tools & Others',
    items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vite', 'Docker', 'Linux'],
  },
]

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing readable, maintainable code with modern best practices and strong TypeScript typing.',
  },
  {
    icon: Palette,
    title: 'UI/UX Focus',
    description: 'Creating intuitive interfaces with attention to design details, accessibility, and user experience.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing web applications for speed, ensuring fast load times and smooth interactions.',
  },
  {
    icon: Globe,
    title: 'Responsive',
    description: 'Building applications that work flawlessly across all devices and screen sizes.',
  },
]

export default function About() {
  const bioRef = useScrollReveal({
    translateX: -30,
    translateY: 0,
    duration: 700,
  })

  const highlightsRef = useScrollReveal({
    stagger: 100,
    duration: 600,
    scale: 0.95,
  })

  const skillsRef = useScrollReveal({
    stagger: 120,
    duration: 600,
  })

  // Counter animation for stats
  const statsRef = useRef<HTMLDivElement>(null)
  const statsAnimated = useRef(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated.current) {
            statsAnimated.current = true

            // Animate stat numbers
            const statValues = el.querySelectorAll('.stat-value')
            statValues.forEach((statEl) => {
              const target = (statEl as HTMLElement).dataset.value
              if (target && !isNaN(Number(target))) {
                const obj = { val: 0 }
                anime({
                  targets: obj,
                  val: Number(target),
                  round: 1,
                  duration: 1200,
                  easing: 'easeOutExpo',
                  update: () => {
                    statEl.textContent = obj.val + '+'
                  },
                })
              }
            })

            // Scale-in animation for stat cards
            anime({
              targets: el.querySelectorAll('.stat-card'),
              scale: [0.8, 1],
              opacity: [0, 1],
              delay: anime.stagger(100),
              duration: 600,
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

  // Skill tags wave animation
  const skillWaveRef = useRef<HTMLDivElement>(null)
  const skillWaveAnimated = useRef(false)

  useEffect(() => {
    const el = skillWaveRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !skillWaveAnimated.current) {
            skillWaveAnimated.current = true

            const tags = el.querySelectorAll('.skill-tag')
            tags.forEach((tag) => {
              ;(tag as HTMLElement).style.opacity = '0'
              ;(tag as HTMLElement).style.transform = 'translateY(10px) scale(0.9)'
            })

            anime({
              targets: tags,
              opacity: [0, 1],
              translateY: [10, 0],
              scale: [0.9, 1],
              delay: anime.stagger(30, { grid: [7, 3], from: 'first' }),
              duration: 400,
              easing: 'easeOutCubic',
            })

            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="pt-16">
      {/* Intro */}
      <Section>
        <SectionHeading
          title="About Me"
          subtitle="A bit about who I am and what I do"
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div ref={bioRef} style={{ opacity: 0 }}>
            <div className="space-y-4 text-surface-600 leading-relaxed">
              <p>
                I'm <span className="font-semibold text-surface-900">Danilo Gonzales</span>,
                a passionate web developer with a keen eye for design and a love for building
                things that live on the web — from polished frontends to robust backends.
              </p>
              <p>
                I enjoy creating clean, elegant solutions to complex problems. My approach combines
                modern technologies with thoughtful design to build applications that are both
                beautiful and functional.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to
                open-source projects, or learning about the latest trends in web development.
              </p>
            </div>

            {/* Quick stats */}
            <div ref={statsRef} className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: 'Projects', value: '10' },
                { label: 'Technologies', value: '15' },
                { label: 'Cups of Coffee', value: '∞' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card text-center p-4 bg-surface-50 rounded-xl border border-surface-100"
                  style={{ opacity: 0 }}
                >
                  <p
                    className="stat-value text-2xl font-bold text-accent-500"
                    data-value={stat.value === '∞' ? undefined : stat.value}
                  >
                    {stat.value === '∞' ? '∞' : '0+'}
                  </p>
                  <p className="text-xs text-surface-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights grid */}
          <div ref={highlightsRef} className="grid grid-cols-2 gap-4">
            {highlights.map((highlight) => (
              <div key={highlight.title} style={{ opacity: 0 }}>
                <Card className="p-5 h-full">
                  <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center mb-3">
                    <highlight.icon size={20} className="text-accent-500" />
                  </div>
                  <h3 className="font-semibold text-surface-900 text-sm">{highlight.title}</h3>
                  <p className="text-xs text-surface-500 mt-1.5 leading-relaxed">{highlight.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section className="bg-white border-y border-surface-100">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I use to bring ideas to life"
        />

        <div ref={skillsRef} className="grid md:grid-cols-3 gap-8">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} style={{ opacity: 0 }}>
              <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-4">
                {skillGroup.category}
              </h3>
              <div ref={skillWaveRef} className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-3 py-1.5 text-sm font-medium text-surface-600 bg-surface-50 border border-surface-200 rounded-lg hover:border-accent-300 hover:text-accent-600 hover:bg-accent-50 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
