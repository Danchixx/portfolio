import { useEffect, useRef } from 'react';
import { BookOpen, Briefcase, Cpu } from 'lucide-react';
import anime from 'animejs';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';

const education = [
  {
    title: 'BS Information Technology',
    date: '2022 — 2026',
    description: 'Pamantasan ng Lungsod ng Pasig. Consistent Honor (Dean\'s Lister | President Lister). Capstone: "LMS with AI Generated Reviewer".'
  },
  {
    title: 'Senior High School (ICT Strand)',
    date: '2020 — 2022',
    description: 'Rizal High School. Graduated with Honors.'
  },
  {
    title: 'Junior High School (CSS Elective)',
    date: '2016 — 2020',
    description: 'Rizal High School. Computer Systems Servicing (CSS) elective.'
  },
  {
    title: 'Elementary',
    date: '2010 — 2016',
    description: 'Bagong Ilog Elementary School (6 years).'
  }
];

const experience = [
  {
    title: 'Developer (OJT)',
    date: 'Feb 2026 — Apr 2026',
    description: 'SPARK. Contributed to the development of the company\'s LMS. Integrated backend services using Supabase. Designed and developed the UI/UX.'
  },
  {
    title: 'Clerk',
    date: 'Jun 2023 — Oct 2025',
    description: 'SPES. Assisted in processing documents, provided front-desk support, and performed basic administrative tasks such as encoding and sorting forms.'
  }
];

const skills = [
  {
    category: 'Tech Stack',
    items: ['Python', 'PHP', 'JavaScript', 'MySQL', 'PostgreSQL', 'Java', 'C++', 'HTML', 'CSS', 'React.js']
  },
  {
    category: 'Tools',
    items: ['Microsoft Excel', 'GitHub', 'Git', 'VSCode', 'Antigravity', 'Bootstrap', 'Jquery', 'Visual Basic', 'Figma', 'Xampp', 'Supabase']
  },
  {
    category: 'Soft Skills',
    items: ['Problem Solving', 'Communication', 'Adaptability', 'Collaboration', 'Design Thinking', 'Logical Thinking']
  }
];

export default function Home() {
  const eduRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const edu = eduRef.current;
    const exp = expRef.current;
    if (!edu || !exp) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const items = document.querySelectorAll('.timeline-item');
            items.forEach(item => {
              (item as HTMLElement).style.opacity = '0';
              (item as HTMLElement).style.transform = 'translateX(20px)';
            });

            anime({
              targets: items,
              opacity: [0, 1],
              translateX: [20, 0],
              duration: 600,
              delay: anime.stagger(100),
              easing: 'easeOutCubic'
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(edu);

    // Skills animation observer
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach(tag => {
              (tag as HTMLElement).style.opacity = '0';
              (tag as HTMLElement).style.transform = 'translateY(10px)';
            });

            anime({
              targets: tags,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 400,
              delay: anime.stagger(30),
              easing: 'easeOutCubic'
            });

            skillsObserver.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillsEl = document.querySelector('.skills-section');
    if (skillsEl) skillsObserver.observe(skillsEl);

    return () => {
      observer.disconnect();
      skillsObserver.disconnect();
    };
  }, []);

  return (
    <div className="pt-2">
      <Section>
        <SectionHeading title="Resume" align="left" />

        <div className="space-y-12">
          {/* Education Timeline */}
          <div ref={eduRef}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center text-accent-500 shadow-sm">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50">Education</h3>
            </div>

            <div className="ml-5 relative border-l border-surface-200 dark:border-surface-800 space-y-8 pl-8">
              {education.map((item, index) => (
                <div key={index} className="timeline-item relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[37px] top-1.5 w-4 h-4 bg-accent-500 rounded-full border-4 border-white dark:border-surface-850 shadow-sm" />
                  
                  <h4 className="text-base font-semibold text-surface-900 dark:text-surface-50 mb-1">{item.title}</h4>
                  <span className="inline-block text-accent-600 dark:text-accent-400 text-sm font-medium mb-3">{item.date}</span>
                  <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div ref={expRef}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center text-accent-500 shadow-sm">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50">Experience</h3>
            </div>

            <div className="ml-5 relative border-l border-surface-200 dark:border-surface-800 space-y-8 pl-8">
              {experience.map((item, index) => (
                <div key={index} className="timeline-item relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[37px] top-1.5 w-4 h-4 bg-accent-500 rounded-full border-4 border-white dark:border-surface-850 shadow-sm" />
                  
                  <h4 className="text-base font-semibold text-surface-900 dark:text-surface-50 mb-1">{item.title}</h4>
                  <span className="inline-block text-accent-600 dark:text-accent-400 text-sm font-medium mb-3">{item.date}</span>
                  <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Skills Section */}
          <div className="skills-section">
            <div className="flex items-center gap-4 mb-6 mt-12">
              <div className="w-10 h-10 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center text-accent-500 shadow-sm">
                <Cpu size={20} />
              </div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50">My Skills</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 bg-surface-50/50 dark:bg-surface-800/20 p-6 rounded-2xl border border-surface-200 dark:border-surface-800">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="skill-group">
                  <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-50 uppercase tracking-wider mb-4">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag px-3 py-1.5 text-sm font-medium text-surface-600 dark:text-surface-300 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg hover:border-accent-300 dark:hover:border-accent-600 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-surface-700 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
