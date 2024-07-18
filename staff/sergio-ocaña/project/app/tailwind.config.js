/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        'happy faces': "url('src/img/')",
      }
    },
  },
  plugins: [],
}

