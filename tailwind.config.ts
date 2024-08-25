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
      'black' : '#000',
      'red' : "#f00",
      'light_gray' : '#D3D3D3'
    },
    gridTemplateColumns: {
      'dashboard': '288px 1fr',
      'dashboard_phone': '288px 1fr',
      'dashboard_body_weights': '1fr 1fr',
      'dashboard_elements': '1fr 1fr'
    },
    width: {
      '90' : '340px'
    },
  },
  plugins: [],
};
export default config;
