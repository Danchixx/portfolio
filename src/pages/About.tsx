import { Code2, Palette, Smartphone, Monitor } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import Card from '../components/Card';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    icon: Monitor,
    title: 'Web Design',
    description: 'The most modern and high-quality design made at a professional level.',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'High-quality development of sites at the professional level.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Professional development of applications for iOS and Android.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Turning complex problems into simple, beautiful and intuitive designs.',
  },
];

export default function About() {
  const bioRef = useScrollReveal({
    translateX: -30,
    duration: 700,
  });

  const servicesRef = useScrollReveal({
    stagger: 100,
    duration: 600,
    scale: 0.95,
  });

  return (
    <div className="pt-2">
      <Section>
        <SectionHeading title="About Me" align="left" />

        <div ref={bioRef} style={{ opacity: 0 }}>
          <div className="space-y-4 text-surface-600 dark:text-surface-400 leading-relaxed text-sm">
            <p>
              I'm an Information Technology student and web developer based in Pasig City, Metro Manila.
              I enjoy turning complex problems into simple, beautiful and intuitive designs, and I have a strong enthusiasm for logical thinking and strategic problem-solving.
            </p>
            <p>
              I specialize in creating web applications with solid front-end and back-end integration. 
              My aim is to build products that are functional, user-friendly, and visually appealing, bringing ideas to life with modern technologies.
            </p>
          </div>
        </div>
      </Section>

      {/* Services / What I'm Doing */}
      <Section className="border-t border-surface-200 dark:border-surface-800">
        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50 mb-6">What I'm Doing</h3>

        <div ref={servicesRef} className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.title} style={{ opacity: 0 }}>
              <Card className="p-6 h-full flex flex-col md:flex-row gap-5">
                <div className="w-12 h-12 flex-shrink-0 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl flex items-center justify-center shadow-sm">
                  <service.icon size={24} className="text-accent-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-surface-900 dark:text-surface-50 text-base mb-2">{service.title}</h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{service.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
