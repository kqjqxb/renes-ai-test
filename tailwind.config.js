/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*{js,jsx,ts,tsx}",
    "./src/*{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'custom-border': 'solid #d1d5db',
      'custom-silver-space': '#eeeeee', 
      colors: {
        'status-purple': '#d7aefb',
        'text-purple': '#5f6368',
        'dim-blue': '#e8f0fe',
        'text-blue': '#1a73e8',
        'gen-button': '#fbbc04',
        'gen-button-hover': '#e89c00',
        'result-green': '#34a853',
        'result-green-hover': '#2c8a45',
      },
      borderRadius: {
        'lg': '12px',
        'md': '4px',
      }
    },
  },
  plugins: [],
}
