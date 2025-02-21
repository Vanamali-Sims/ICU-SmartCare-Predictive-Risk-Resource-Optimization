/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        medical: {
          50: '#f0f9ff',  // Lightest blue, almost white
          100: '#e0f2fe', // Very light blue
          200: '#bae6fd', // Light blue
          300: '#7dd3fc', // Medium light blue
          400: '#38bdf8', // Medium blue
          500: '#0ea5e9', // Primary blue
          600: '#0284c7', // Medium dark blue
          700: '#0369a1', // Dark blue
          800: '#075985', // Very dark blue
          900: '#0c4a6e', // Darkest blue
        },
        accent: {
          50: '#f0fdfa',  // Mint
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};