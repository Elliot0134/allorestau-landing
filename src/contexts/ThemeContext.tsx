import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeType } from '@/types/theme';

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

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeType>('pizzeria');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setTheme = (newTheme: ThemeType) => {
    if (newTheme === theme) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setThemeState(newTheme);
      updateCSSVariables(newTheme);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 200);
  };

  const updateCSSVariables = (newTheme: ThemeType) => {
    const root = document.documentElement;
    
    const themeVars = {
      pizzeria: {
        bg: '356 80% 41%',
        light: '356 79% 60%',
        dark: '356 80% 33%',
        accent: '51 100% 50%'
      },
      snack: {
        bg: '42 87% 45%',
        light: '44 89% 61%',
        dark: '43 87% 38%',
        accent: '16 100% 60%'
      },
      restaurant: {
        bg: '200 100% 14%',
        light: '200 80% 24%',
        dark: '200 100% 9%',
        accent: '28 100% 48%'
      }
    };

    const vars = themeVars[newTheme];
    root.style.setProperty('--theme-bg', vars.bg);
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
