/** @type {import('tailwindcss').Config} */
const preset = require('./design-system/preset.cjs');

module.exports = {
  presets: [preset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
