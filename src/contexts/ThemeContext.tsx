import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeType } from '@/types/theme';

const THEME_STORAGE_KEY = 'allorestau-selected-theme';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const getInitialTheme = (): ThemeType => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme && (savedTheme === 'pizzeria' || savedTheme === 'snack' || savedTheme === 'restaurant')) {
    return savedTheme as ThemeType;
  }
  return 'pizzeria'; // Default fallback
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeType>(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setTheme = (newTheme: ThemeType) => {
    if (newTheme === theme) return;

    setIsTransitioning(true);

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    // Start the theme change immediately
    setThemeState(newTheme);
    updateCSSVariables(newTheme);

    // Wait for the transition to complete before removing transitioning state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match the CSS transition duration
  };

  const updateCSSVariables = (newTheme: ThemeType) => {
    const root = document.documentElement;
    
    const themeVars = {
      pizzeria: {
        bg: '0 81% 44%',           // #cc1616
        secondary: '0 81% 49%',    // #e31918
        light: '0 81% 49%',
        dark: '0 81% 35%',
        accent: '51 100% 50%'      // #ffd700
      },
      snack: {
        bg: '48 96% 41%',          // #cda404
        secondary: '48 96% 41%',   // #cda404 (identique)
        light: '48 100% 55%',
        dark: '48 100% 35%',
        accent: '16 100% 60%'      // #ff6b35
      },
      restaurant: {
        bg: '200 100% 14%',        // #003049
        secondary: '201 66% 23%',  // #144660
        light: '201 66% 23%',
        dark: '200 100% 9%',
        accent: '28 100% 48%'      // #f77f00
      }
    };

    const vars = themeVars[newTheme];
    root.style.setProperty('--theme-bg', vars.bg);
    root.style.setProperty('--theme-secondary', vars.secondary);
    root.style.setProperty('--theme-light', vars.light);
    root.style.setProperty('--theme-dark', vars.dark);
    root.style.setProperty('--theme-accent', vars.accent);
    root.style.setProperty('--background', vars.bg);
    root.style.setProperty('--primary', vars.accent);
    root.style.setProperty('--primary-foreground', vars.bg);
  };

  useEffect(() => {
    updateCSSVariables(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
