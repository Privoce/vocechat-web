/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/*.html"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          from: {
            opacity: 0,
            transform: `translate3d(0, 100%, 0)`
          },

          to: {
            opacity: 1,
            transform: `translate3d(0, 0, 0)`
          }
        }
      }
    }
  },
  plugins: []
};
