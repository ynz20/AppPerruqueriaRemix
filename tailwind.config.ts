import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "black-japan": "#2D2D2D",
        // "white-japan": "#F3F2E0",
        // "red-japan": "#8A0303",
        // "yellow-japan": "#FFD166",
        // "green-japan": "#607E42",
        "black-japan": "#1A202C",
        "white-japan": "#F3F2E0",
        "red-japan": "#8A0303",
        "yellow-japan": "#F7C948",
        "green-japan": "#607E42",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
