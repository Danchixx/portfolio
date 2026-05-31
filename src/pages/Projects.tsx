import { useRef, useEffect, useCallback } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import anime from 'animejs'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Button from '../components/Button'

interface Project {
  title: string
  description: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  gradient: string
}

const projects: Project[] = [
  {
    title: 'Spark LMS',
    description: 'Contributed to the development of a multi-tenant and subscription-based Learning Management System. Integrated backend services using Supabase and designed UI/UX features.',
    techStack: ['React', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Salon Appointment System',
    description: 'A scheduling system that allows clients to book salon appointments online and helps staff manage their schedules effectively.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'LMS with AI-Generated Reviewer',
    description: 'Developed a web-based Learning Management System that automatically generates AI-powered reviewers from learning materials to help students review more efficiently.',
    techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'AI / NLP'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Gym Registration System',
    description: 'Built a registration system to manage gym members and streamline the enrollment and record-keeping process for the Ugong community.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Barangay Information System',
    description: 'Created a digital system for managing community records and resident information to improve organization and reduce manual paperwork.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-blue-500 to-cyan-500',
  }
]

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    // Set initial hidden state for all cards
    const cards = el.querySelectorAll('.project-card')
    cards.forEach((card) => {
      ;(card as HTMLElement).style.opacity = '0'
      ;(card as HTMLElement).style.transform = 'translateY(40px) perspective(600px) rotateX(5deg)'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // 3D flip-up stagger
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [40, 0],
              rotateX: [5, 0],
              duration: 700,
              delay: anime.stagger(100),
              easing: 'easeOutCubic',
            })

            // After cards appear, stagger in tech tags
            anime({
              targets: el.querySelectorAll('.project-tech-tag'),
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: anime.stagger(30, { start: 600 }),
              duration: 300,
              easing: 'easeOutCubic',
            })

            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Gradient shimmer on hover
  const handleGradientHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget
      anime({
        targets: target,
        backgroundPosition: ['0% 50%', '100% 50%'],
        duration: 800,
        easing: 'easeInOutSine',
      })
    },
    []
  )

  return (
    <div className="pt-2">
      <Section>
        <SectionHeading
          title="Portfolio"
          align="left"
        />

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '800px' }}
        >
          {projects.map((project) => (
            <div key={project.title} className="project-card">
              <Card className="h-full flex flex-col">
                {/* Gradient header */}
                <div
                  className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                  style={{ backgroundSize: '200% 200%' }}
                  onMouseEnter={handleGradientHover}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-5">
                    <h3 className="text-lg font-bold text-white drop-shadow-sm">
                      {project.title}
                    </h3>
                  </div>
                  {/* Decorative shapes */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/5 rounded-full" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="project-tech-tag px-2.5 py-1 text-xs font-medium text-accent-600 bg-accent-50 rounded-md border border-accent-100"
                        style={{ opacity: 0 }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-surface-100">
                    {project.liveUrl && (
                      <Button href={project.liveUrl} variant="primary" size="sm">
                        <ExternalLink size={14} />
                        Live Demo
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button href={project.githubUrl} variant="secondary" size="sm">
                        <Github size={14} />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
