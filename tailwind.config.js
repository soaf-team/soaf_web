/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#57C2FF",
        black: "#121212",
        white: "#ffffff",
        warn: "#FF3A39",
        border: "#8A91A820",
        gray50: "#F0F1F4",
        gray100: "#E2E3E9",
        gray200: "#A7ACBD",
        gray300: "#8A91A8",
        gray400: "#6D7592",
        gray500: "#575E75",
        gray600: "#414658",
        gray700: "#2C2F3A",
        gray800: "#2C2F3A",
        kakao: "#FFEB00",
        naver: "#2DB400",
        overlay: "rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        main_gradient: "linear-gradient(90deg, #8CE3FF 0%, #57C2FF 100%)",
        red_gradient:
          "linear-gradient(152.17deg, #FFA5A5 9.31%, #EE4F75 88.11%)",
        orange_gradient:
          "linear-gradient(154.83deg, #FFD4A5 8.94%, #FF795B 82.53%)",
        yellow_gradient:
          "linear-gradient(161.28deg, #FFEC87 9.09%, #FFAA59 92.75%)",
        green_gradient:
          "linear-gradient(153.65deg, #C3F6CE 9.28%, #4FD1B2 92.33%)",
        purple_gradient:
          "linear-gradient(143.48deg, #C9A6FF 16.68%, #8589FF 92.2%)",
        blue_gradient:
          "linear-gradient(165.44deg, #93E5FD 10.31%, #69BBF9 94.31%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        shadow1: "0px 1px 16px 0px rgba(62, 62, 62, 0.16)",
        bottomTab: "0px 1px 24px 0px rgba(62, 62, 62, 0.1)",
        hover: "0px 0px 8px 3px rgba(87, 164, 255, 0.5)",
        overlay: "0px 0px 4px 0px #0000001A",
      },
      maxWidth: {
        window: "440px",
      },
      keyframes: {
        "loading-dots": {
          "0%, 100%": { transform: "scale(0.8)", bgColor: "#57C2FF" },
          "50%": {
            transform: "scale(1)",
            bgColor: "linear-gradient(90deg, #8CE3FF 0%, #57C2FF 100%)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        spin: "spin 1s linear infinite",
        "loading-dots": "loading-dots 1s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
