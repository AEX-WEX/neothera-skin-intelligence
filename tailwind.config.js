/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        card: '#FFFFFF',
        primary: {
          DEFAULT: '#0D9488',
          hover: '#0F766E',
        },
        negative: '#F87171',
        neutral: '#64748B',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
        glow: '0 0 20px rgba(13, 148, 136, 0.15)',
      },
    },
  },
  plugins: [],
};
