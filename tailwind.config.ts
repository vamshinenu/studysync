import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme")

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",

  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: { "50": "#92e3a9", "100": "#92e3a9", "200": "#92e3a9", "300": "#92e3a9", "400": "#5ae3a6", "500": "#5ae3a6", "600": "#5ae3a6", "700": "#17cd7b", "800": "#15c174", "900": "#15c174", "950": "#172554" }
      }
    },
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
