/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          light: '#3291ff',
          dark: '#0761d1',
        },
        success: {
          DEFAULT: '#0070f3',
          light: '#3291ff',
          dark: '#0761d1',
        },
      },
    },
  },
  plugins: [],
};