import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        'text-universal': "hsl(var(--text-universal))",
        'theme-bg': "hsl(var(--theme-bg))",
        'theme-light': "hsl(var(--theme-light))",
        'theme-dark': "hsl(var(--theme-dark))",
        'theme-accent': "hsl(var(--theme-accent))",
        pizza: {
          DEFAULT: "hsl(var(--pizza-bg))",
          light: "hsl(var(--pizza-light))",
          dark: "hsl(var(--pizza-dark))",
          accent: "hsl(var(--pizza-accent))",
        },
        snack: {
          DEFAULT: "hsl(var(--snack-bg))",
          light: "hsl(var(--snack-light))",
          dark: "hsl(var(--snack-dark))",
          accent: "hsl(var(--snack-accent))",
        },
        restaurant: {
          DEFAULT: "hsl(var(--restaurant-bg))",
          light: "hsl(var(--restaurant-light))",
          dark: "hsl(var(--restaurant-dark))",
          accent: "hsl(var(--restaurant-accent))",
        },
        white: "hsl(var(--white))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
