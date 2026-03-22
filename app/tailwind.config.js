/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
        label: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        // Stitch Design System - Ehrensache
        primary: {
          DEFAULT: '#0061FF',
          container: '#0061ff',
          fixed: '#dbe1ff',
          'fixed-dim': '#b4c5ff',
        },
        secondary: {
          DEFAULT: '#006d37',
          container: '#6bfe9c',
          fixed: '#6bfe9c',
          'fixed-dim': '#4ae183',
        },
        tertiary: {
          DEFAULT: '#745b00',
          container: '#d0a600',
          fixed: '#ffe08b',
          'fixed-dim': '#f1c100',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        surface: {
          DEFAULT: '#faf8ff',
          dim: '#d8d9e6',
          bright: '#faf8ff',
          container: '#ecedfa',
          'container-high': '#e7e7f4',
          'container-highest': '#e1e1ee',
          'container-low': '#f2f3ff',
          'container-lowest': '#ffffff',
          variant: '#e1e1ee',
        },
        'on-surface': '#191b24',
        'on-surface-variant': '#424656',
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        'on-tertiary': '#ffffff',
        outline: '#737687',
        'outline-variant': '#c2c6d9',
        'inverse-surface': '#2e303a',
        'inverse-on-surface': '#eff0fd',
        'inverse-primary': '#b4c5ff',

        // Shadcn compatibility
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#faf8ff',
        foreground: '#191b24',
        muted: {
          DEFAULT: '#e1e1ee',
          foreground: '#424656',
        },
        accent: {
          DEFAULT: '#f2f3ff',
          foreground: '#191b24',
        },
        destructive: {
          DEFAULT: '#ba1a1a',
          foreground: '#ffffff',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#191b24',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#191b24',
        },
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        md: '1.5rem',
        sm: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
