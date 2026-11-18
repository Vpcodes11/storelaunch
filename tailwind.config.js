/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Newsreader"', '"Playfair Display"', 'Georgia', 'Cambria', 'ui-serif', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4ECE1',
          300: '#E9DDD0',
          400: '#DCCBBA',
        },
        pinred: {
          500: '#E60023',
          600: '#CC001F',
          700: '#A30018',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#F9ECE5',
          200: '#F1D4C6',
          500: '#C25E3E',
          600: '#A94A2D',
        },
        sage: {
          50: '#F3F6F3',
          100: '#E4ECE4',
          500: '#466B50',
          600: '#385540',
        },
        warmnoir: {
          800: '#2B2623',
          900: '#1D1A18',
          950: '#141211',
        },
        primary: {
          50: '#FAF7F2',
          100: '#F4ECE1',
          500: '#E60023',
          600: '#CC001F',
          700: '#1D1A18',
          800: '#141211',
          900: '#0F0E0D',
        },
      },
      boxShadow: {
        'pin': '0 8px 30px -6px rgba(29, 26, 24, 0.07), 0 3px 10px -2px rgba(29, 26, 24, 0.04)',
        'pin-hover': '0 20px 40px -10px rgba(29, 26, 24, 0.12), 0 8px 20px -4px rgba(29, 26, 24, 0.06)',
        'pin-glow': '0 0 40px -10px rgba(230, 0, 35, 0.15)',
      },
      borderRadius: {
        '2.5xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
    },
  },
  plugins: [],
};
