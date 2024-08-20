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
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-out forwards',
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
