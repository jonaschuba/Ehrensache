/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#DBEAFE',
          dark: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
          dark: '#15803D',
        },
        gold: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
        },
        surface: '#FFFFFF',
        background: '#F1F5F9',
      },
      boxShadow: {
        card: '0 4px 24px rgba(37, 99, 235, 0.08), 0 1px 4px rgba(0,0,0,0.06)',
        'card-lg': '0 12px 40px rgba(37, 99, 235, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
