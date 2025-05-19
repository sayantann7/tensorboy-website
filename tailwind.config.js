/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
          neon: "#00FFFF",
        },
        violet: {
          300: "#5724ff",
          neon: "#9D00FF",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
        neon: {
          green: "#39FF14",
          pink: "#FF00FF", 
        },
        dark: {
          100: "#121212",
          200: "#1E1E1E",
          300: "#2D2D2D",
        },
      },
    },
  },
  plugins: [],
};