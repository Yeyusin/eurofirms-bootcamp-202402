/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        'happy-logo': "url('/images/logo.png')",
        'happy-bg': "url('/images/background.png')",
      }
    },
  },
  plugins: [],
}

