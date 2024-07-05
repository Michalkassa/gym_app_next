import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'atlantis_blue' : '#264d8d',
      'sleek_gray' : '#121212',
      'white' : '#fff',
      'black' : '#000'
    },
    gridTemplateColumns: {
      'dashboard_body_weights': '200px 1fr',
    }
  },
  plugins: [],
};
export default config;
