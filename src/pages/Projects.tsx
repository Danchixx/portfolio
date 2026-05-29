import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
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
    description: 'A full-featured Learning Management System built with React and TypeScript. Features course management, progress tracking, and an admin dashboard.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    githubUrl: 'https://github.com/Danchixx/spark-lms',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce application with product catalog, shopping cart, user authentication, and payment integration.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Task Manager Pro',
    description: 'A productivity app for managing tasks and projects with drag-and-drop Kanban boards, real-time collaboration, and analytics.',
    techStack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with interactive maps, 7-day forecasts, and location-based weather alerts using OpenWeather API.',
    techStack: ['React', 'JavaScript', 'REST API', 'Chart.js'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Portfolio Website',
    description: 'This very portfolio! A modern, responsive site built with React, TypeScript, Tailwind CSS, and Framer Motion.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/Danchixx/portfolio',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Chat Application',
    description: 'Real-time messaging app with WebSocket integration, user presence indicators, and message encryption.',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/Danchixx',
    gradient: 'from-indigo-500 to-blue-600',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Projects() {
  return (
    <div className="pt-16">
      <Section>
        <SectionHeading
          title="Projects"
          subtitle="A selection of projects I've worked on. Each one taught me something new."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <Card className="h-full flex flex-col">
                {/* Gradient header */}
                <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
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
                  <p className="text-sm text-surface-500 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-accent-600 bg-accent-50 rounded-md border border-accent-100"
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
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  )
}
