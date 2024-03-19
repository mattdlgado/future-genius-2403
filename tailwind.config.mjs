/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Montserrat Variable"', "sans-serif"],
        accent: ["Oswald Variable", "sans-serif"],
        mono: ["Kode Mono Variable", "monospace"],
      },
      dropShadow: {
        big: "0 40px 40px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
