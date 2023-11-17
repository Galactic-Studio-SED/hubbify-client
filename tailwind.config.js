/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        transparent: 'transparent',
        white: "rgba(255, 255, 255, 1)",
        background: "#F2F2F2",
        "royal-purple": "rgba(86, 88, 255, 1)",
        "banana-gold": "rgba(255, 222, 89, 1)",
        "mighty-gray": "rgba(32, 33, 36, 1)",
        "deep-dark": "rgba(0, 0, 0, 1)",
        "text-primary": "rgba(32, 33, 36, 1)",
        "text-secondary": "rgba(122, 122, 122, 1)",
        "text-tertiary": "rgba(46, 54, 70, 1)",
        "text-quaternary": "rgba(95, 109, 126, 1)",
      },
      boxShadow: {
        shadow1: "0px 16px 40px rgba(112, 144, 11, 0.2)",
        shadow2: "0px 8px 25px rgba(0, 0, 0, 0.15)",
        "full-shadow": "16px 16px 0px rgba(0, 0, 0, 1)",
        "shadow-suspicious":
          "0px 6.755102157592773px 21.10969352722168px rgba(0, 0, 0, 0.15)",
      },
      backgroundImage: {
        'hero-bg': "url('../src/assets/img/hero-bg.png')",
        
      }
    },
  },
  plugins: [],
};
