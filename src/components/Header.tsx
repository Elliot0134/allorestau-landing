import { useTheme } from '@/contexts/ThemeContext';
import { ThemeType, themeContents } from '@/types/theme';
import { motion } from 'framer-motion';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const themes: ThemeType[] = ['pizzeria', 'snack', 'restaurant'];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none" role="banner">
      <nav className="pointer-events-auto flex gap-4" role="navigation" aria-label="Sélection de thème">
        {themes.map((t) => {
          const isActive = theme === t;
          return (
            <motion.button
              key={t}
              onClick={() => setTheme(t)}
              initial={false}
              animate={{
                width: isActive ? 'auto' : '3rem',
                backgroundColor: '#fdefd5',
                color: isActive ? 'hsl(var(--theme-bg))' : 'hsl(var(--theme-bg))'
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`
                relative flex items-center justify-center rounded-full h-12 px-0 overflow-hidden
                focus:outline-none
              `}
              style={{
                '--tw-ring-color': 'hsl(var(--theme-accent))',
                fontFamily: 'Fredoka, sans-serif',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
              } as React.CSSProperties}
              aria-label={`Changer le thème en ${themeContents[t].name}`}
              aria-pressed={isActive}
            >
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-xl relative z-10">{themeContents[t].icon}</span>
              </div>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  width: isActive ? 'auto' : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <span className="font-bold whitespace-nowrap pr-5 text-base uppercase tracking-wider">
                  {themeContents[t].name}
                </span>
              </motion.div>
            </motion.button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
