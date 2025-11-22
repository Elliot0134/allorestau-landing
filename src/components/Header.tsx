import { useTheme } from '@/contexts/ThemeContext';
import { ThemeType, themeContents } from '@/types/theme';
import { motion } from 'framer-motion';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const themes: ThemeType[] = ['pizzeria', 'snack', 'restaurant'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 theme-transition">
      <div className="glass h-24 px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <div className="text-4xl">{themeContents[theme].icon}</div>
          <h1 className="text-2xl font-bold text-universal tracking-tight">
            AlloRestau
          </h1>
        </motion.div>

        {/* Theme Tabs */}
        <div className="flex gap-2">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`
                px-6 py-3 rounded-full font-semibold text-base transition-all duration-300
                ${theme === t
                  ? 'bg-white/20 text-universal border-b-2 scale-105'
                  : 'text-universal/60 hover:bg-white/10 hover:text-universal hover:scale-102'
                }
              `}
              style={{
                borderBottomColor: theme === t ? 'hsl(var(--theme-accent))' : 'transparent'
              }}
            >
              <span className="mr-2">{themeContents[t].icon}</span>
              {themeContents[t].name}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="px-6 py-3 rounded-full font-semibold border-2 text-universal transition-all duration-300 hover:scale-105"
          style={{
            borderColor: 'hsl(var(--text-universal))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'hsl(var(--text-universal))';
            e.currentTarget.style.color = 'hsl(var(--theme-bg))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'hsl(var(--text-universal))';
          }}
        >
          Nous contacter
        </button>
      </div>
    </header>
  );
};

export default Header;
