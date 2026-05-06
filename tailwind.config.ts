import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      },
      colors: {
        paper: "#fffef8",
        ink: "#1d1d1b",
        faded: "#66615a",
        line: "#ded8cb"
      }
    }
  },
  plugins: [typography]
};

export default config;
