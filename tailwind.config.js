/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Environmental & Sahyadri Palette
        forest: {
          950: '#030805',
          900: '#06130B',
          850: '#0A1A10',
          800: '#0F2618',
          750: '#143321',
          700: '#1B422B',
          600: '#235A3B',
          500: '#2F754E',
        },
        sahyadri: {
          dark: '#050D08',
          card: '#0A1910',
          cardHover: '#0E2217',
          border: 'rgba(52, 211, 153, 0.15)',
          borderHover: 'rgba(52, 211, 153, 0.35)',
          neon: '#10B981',
          glow: '#00FF87',
          mint: '#6EE7B7',
          muted: '#94A3B8'
        },
        // Existing Admin Palette (Preserved for backward compatibility)
        primary: {
          DEFAULT: '#F59E0B', // Amber 500
          dark: '#D97706',
          light: '#FBBF24',
          subtle: 'rgba(245, 158, 11, 0.12)'
        },
        admin: {
          bg: '#0F172A',
          card: '#1E293B',
          cardHover: '#334155',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#38BDF8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.25)',
        'emerald-glow-lg': '0 0 50px rgba(0, 255, 135, 0.25)',
        'emerald-glow-sm': '0 0 12px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
