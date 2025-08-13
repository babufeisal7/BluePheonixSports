/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'big-noodle': ['Big Noodle', 'sans-serif'],
        'acumin': ['Acumin Variable Concept', 'sans-serif'],
        'neo-sans': ['Neo Sans', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slide: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,165,0,0.7)' },
          '50%': { boxShadow: '0 0 20px rgba(255,165,0,1)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'slide': 'slide 1s ease-in-out',
        'glow': 'glow 2s infinite ease-in-out',
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'], // Ensure group-hover is enabled for scale
    },
  },
  plugins: [],
}
