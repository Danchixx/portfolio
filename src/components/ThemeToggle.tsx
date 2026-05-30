import { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import anime from 'animejs';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const iconRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        rotate: theme === 'dark' ? '180deg' : '-180deg',
        scale: [1, 0.8, 1],
        duration: 400,
        easing: 'easeInOutBack'
      });
    }
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg text-surface-600 hover:text-accent-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-accent-400 dark:hover:bg-surface-800 transition-colors"
      aria-label="Toggle theme"
    >
      <div ref={iconRef}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </div>
    </button>
  );
}
