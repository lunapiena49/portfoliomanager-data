// Tailwind 3 wired directly into Vite's PostCSS pipeline (Astro 6: the
// @astrojs/tailwind integration is gone; this is what it did under the hood).
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
