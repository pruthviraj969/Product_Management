/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          bg:      '#080c10',
          surface: '#0d1117',
          card:    '#111820',
          border:  '#1c2432',
          lime:    '#a3e635',
          cyan:    '#22d3ee',
          muted:   '#4a5568',
          text:    '#d1dbe8',
          danger:  '#f43f5e',
          success: '#10b981',
        },
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'none' }},
        toastIn: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'none' }},
        spin2:   { to: { transform: 'rotate(360deg)' }},
        pulse2:  { '0%,100%': { opacity: '1' }, '50%': { opacity: '.4' }},
      },
      animation: {
        fadeUp:  'fadeUp 0.35s ease forwards',
        toastIn: 'toastIn 0.3s ease forwards',
        spin2:   'spin2 0.7s linear infinite',
        pulse2:  'pulse2 1.4s ease infinite',
      },
    },
  },
  plugins: [],
}