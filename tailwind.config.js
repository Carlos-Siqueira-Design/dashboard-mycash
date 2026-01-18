/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',   // Tablet
        'lg': '1280px',  // Desktop
        'xl': '1920px',  // Wide / 4K
      },
      colors: {
        // Tokens primitivos serão adicionados via CSS variables
      },
      spacing: {
        // Espaçamentos serão adicionados via CSS variables
      },
    },
  },
  plugins: [],
}
