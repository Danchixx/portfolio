import { motion } from 'framer-motion'
import { Code2, Palette, Zap, Globe } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function About() {
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: 'Projects', value: '10+' },
                { label: 'Technologies', value: '15+' },
                { label: 'Cups of Coffee', value: '∞' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-surface-50 rounded-xl border border-surface-100">
                  <p className="text-2xl font-bold text-accent-500">{stat.value}</p>
                  <p className="text-xs text-surface-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((highlight) => (
              <motion.div key={highlight.title} variants={item}>
                <Card className="p-5 h-full">
                  <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center mb-3">
                    <highlight.icon size={20} className="text-accent-500" />
                  </div>
                  <h3 className="font-semibold text-surface-900 text-sm">{highlight.title}</h3>
                  <p className="text-xs text-surface-500 mt-1.5 leading-relaxed">{highlight.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Skills */}
      <Section className="bg-white border-y border-surface-100">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I use to bring ideas to life"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skills.map((skillGroup) => (
            <motion.div key={skillGroup.category} variants={item}>
              <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-4">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium text-surface-600 bg-surface-50 border border-surface-200 rounded-lg hover:border-accent-300 hover:text-accent-600 hover:bg-accent-50 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  )
}
