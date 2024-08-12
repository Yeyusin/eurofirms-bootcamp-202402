/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        'happy-logo': "url('src/img/logo.png')",
        'happy-bg': "url('src/img/background.png')",
      }
    },
  },
  plugins: [],
}

