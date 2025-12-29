/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        // 70% Dominant (Beige/Warm Neutrals)
        dominant: {
          50: '#FDFCFA', 100: '#FAF8F5', 200: '#F5F1EB', 300: '#EBE4D9',
          400: '#DFD4C4', 500: '#D3C4AF', 600: '#BBA896', 700: '#9B8873',
          800: '#7A6A58', 900: '#5A4F42',
        },
        // 30% Secondary (Deep Charcoals/Grays)
        secondary: {
          50: '#F5F5F6', 100: '#E8E9EB', 200: '#C8CACD', 300: '#A8ABB0',
          400: '#888C93', 500: '#2A2831', 600: '#1F1D24', 700: '#18161C',
          800: '#131116', 900: '#0D0B0F',
        },
        // 10% Accent (The Magic Purple)
        accent: {
          DEFAULT: '#7B00FF',
          light: '#9533FF',
          dark: '#6200CC',
          50: '#F5EBFF', 100: '#EBD6FF', 200: '#D6ADFF', 300: '#C285FF',
          400: '#AD5CFF', 500: '#7B00FF', 600: '#6200CC', 700: '#4A0099',
          800: '#310066', 900: '#190033',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(123, 0, 255, 0.3)',
      }
    },
  },
  plugins: [],
};