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
        brand: {
          50: '#f0f4fa',
          100: '#dbe5f4',
          200: '#bdcfeb',
          300: '#91b1de',
          400: '#608dce',
          500: '#3d6ebc',
          600: '#2b549f',
          700: '#234281',
          800: '#1e386b',
          900: '#0F172A', // Primary Navy
          950: '#0A192F', // Deep Brand Tone
        },
        saffron: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f97316',
          600: '#d97706', // Indian Saffron Accent
          700: '#b45309',
        },
        emeraldGov: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669', // Indian Green Accent
          700: '#047857',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.08)',
        'kiosk': '0 10px 35px -5px rgba(10, 25, 47, 0.25)',
      }
    },
  },
  plugins: [],
}
