import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          success: "var(--text-success)",
          danger: "var(--text-danger)",
          info: "var(--text-info)",
          warning: "var(--text-warning)",
        },
        border: {
          secondary: "var(--border-secondary)",
        },
        badge: {
          primary: "var(--badge-primary)",
          success: "var(--badge-success)",
          danger: "var(--badge-danger)",
          info: "var(--badge-info)",
          warning: "var(--badge-warning)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
