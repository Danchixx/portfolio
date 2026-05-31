import { Github, Linkedin, Mail, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial entrance animation
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
  }, []);

  const toggleExpand = () => {
    const el = expandRef.current;
    if (!el) return;

    if (!isExpanded) {
      setIsExpanded(true);
      el.style.display = 'block';
      anime({
        targets: el,
        height: [0, el.scrollHeight],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutCubic'
      });
    } else {
      anime({
        targets: el,
        height: [el.scrollHeight, 0],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInCubic',
        complete: () => {
          el.style.display = 'none';
          setIsExpanded(false);
        }
      });
    }
  };

  return (
    <aside
      ref={cardRef}
      className="relative bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-800 rounded-3xl p-6 shadow-sm dark:shadow-xl w-full xl:w-[280px] flex-shrink-0 z-20 overflow-hidden"
    >
      {/* Dark mode gradient border overlay effect */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5 dark:border-white/10" />

      {/* Profile Header */}
      <div className="flex xl:flex-col items-center gap-6 xl:gap-0 relative">
        <div className="w-24 h-24 xl:w-32 xl:h-32 rounded-3xl overflow-hidden bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex-shrink-0 mb-0 xl:mb-6 shadow-inner">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Danilo&backgroundColor=f59e0b"
            alt="Danilo Gonzales"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 xl:w-full xl:text-center">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50 tracking-tight mb-2">
            Danilo Gonzales
          </h1>
          <div className="inline-block px-3 py-1 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 text-xs font-medium rounded-lg">
            Web Developer
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleExpand}
          className="absolute top-0 right-0 xl:hidden p-2 text-accent-500 hover:bg-accent-50 dark:hover:bg-surface-800 rounded-xl transition-colors"
        >
          <ChevronDown
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            size={20}
          />
        </button>
      </div>

      {/* Expandable Content (Contacts & Socials) */}
      <div
        ref={expandRef}
        className="xl:!block xl:!h-auto xl:!opacity-100"
        style={{ display: 'none', height: 0, opacity: 0 }}
      >
        <div className="w-full h-px bg-surface-200 dark:bg-surface-800 my-6" />

        <ul className="space-y-4">
          <ContactItem icon={<Mail size={16} />} label="Email" value="danilogatch@gmail.com" href="mailto:danilogatch@gmail.com" />
          <ContactItem icon={<Calendar size={16} />} label="Phone" value="09934225139" href="tel:09934225139" />
          <ContactItem icon={<MapPin size={16} />} label="Location" value="Pasig City, Metro Manila" />
        </ul>

        <div className="w-full h-px bg-surface-200 dark:bg-surface-800 my-6" />

        <div className="flex items-center justify-center xl:justify-start gap-4">
          <SocialLink icon={<Github size={20} />} href="https://github.com" />
          <SocialLink icon={<Linkedin size={20} />} href="https://linkedin.com" />
        </div>
      </div>
    </aside>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) {
  return (
    <li className="flex items-start gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-accent-500 shadow-sm">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-wider font-medium mb-0.5">
          {label}
        </p>
        {href ? (
          <a href={href} className="text-sm text-surface-900 dark:text-surface-100 hover:text-accent-500 dark:hover:text-accent-400 transition-colors truncate block">
            {value}
          </a>
        ) : (
          <p className="text-sm text-surface-900 dark:text-surface-100 truncate block">
            {value}
          </p>
        )}
      </div>
    </li>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-surface-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
    >
      {icon}
    </a>
  );
}
