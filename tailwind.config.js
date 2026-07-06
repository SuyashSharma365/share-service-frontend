/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7c3aed',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.08)',
        glow: '0 0 0 1px rgba(124, 58, 237, 0.08), 0 24px 60px rgba(124, 58, 237, 0.12)',
      },
    },
  },
  plugins: [],
};
