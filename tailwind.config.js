/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/*.html"],
  theme: {
    extend: {
      fontSize: {
        xs: ["0.75rem", "1.125rem"]
      },
      colors: {
        primary: {
          25: "#F5FEFF",
          50: "#ECFDFF",
          100: "#CFF9FE",
          200: "#A5F0FC",
          300: "#67E3F9",
          400: "#22CCEE",
          500: "#06AED4",
          600: "#088AB2",
          700: "#0E7090",
          800: "#155B75",
          900: "#164C63"
        }
      },
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
