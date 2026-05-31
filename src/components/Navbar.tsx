import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import anime from 'animejs';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'About', path: '/' }, // Changed Home to About like vcard
  { name: 'Resume', path: '/resume' }, // We'll map Projects/Contact into this flow
  { name: 'Portfolio', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Animate the active indicator
  useEffect(() => {
    const container = navContainerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    // Use '/' for 'About' since it's now our main page
    const activeIndex = navLinks.findIndex(
      (link) => link.path === location.pathname || (link.path === '/' && location.pathname === '/about')
    );
    
    if (activeIndex === -1) {
      anime({ targets: indicator, opacity: 0, duration: 200, easing: 'easeOutCubic' });
      return;
    }

    const activeLinkEl = linkRefs.current[activeIndex];
    if (!activeLinkEl) return;

    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLinkEl.getBoundingClientRect();

      const indicatorLeft = linkRect.left - containerRect.left;
      const indicatorWidth = linkRect.width;

      anime({
        targets: indicator,
        left: indicatorLeft,
        width: indicatorWidth,
        opacity: 1,
        duration: 400,
        easing: 'easeOutCubic',
      });
    });
  }, [location.pathname]);

  return (
    <nav className="flex items-center justify-between bg-white/80 dark:bg-surface-850/80 backdrop-blur-xl border border-surface-200 dark:border-surface-800 rounded-2xl px-6 py-4 shadow-sm dark:shadow-md mb-6 relative overflow-hidden z-20">
      {/* Container border overlay for dark mode */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/5 dark:border-white/10" />

      {/* Nav Links */}
      <div ref={navContainerRef} className="flex items-center gap-2 relative overflow-x-auto no-scrollbar">
        {/* Animated indicator bar */}
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-0.5 bg-accent-500 rounded-full pointer-events-none"
          style={{ opacity: 0, width: 0, left: 0 }}
        />
        {navLinks.map((link, i) => {
          const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '/about');
          return (
            <Link
              key={link.name}
              ref={(el) => { linkRefs.current[i] = el; }}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'text-accent-600 dark:text-accent-400'
                  : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center pl-4 border-l border-surface-200 dark:border-surface-700 ml-2">
        <ThemeToggle />
      </div>
    </nav>
  );
}
