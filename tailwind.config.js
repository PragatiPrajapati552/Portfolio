/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee-left': 'marquee-left 22s linear infinite',
        'marquee-right': 'marquee-right 26s linear infinite',
      },
    },
  },
  plugins: [],
}
