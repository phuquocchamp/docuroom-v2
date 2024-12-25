// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#3572EF',
        'purpe': '#9197B3',
      },
    },
  },
  daisyui: {
    themes: ["light"],
 },
  plugins: [
    require('daisyui'),
  ],
}
