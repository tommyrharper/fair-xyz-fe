module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cotton: "#E5E5E5",
        'hard-cotton': "#F5F4F2",
        carbon: "#28282A",
      },
      transitionDuration: {
        '1500': '1500ms',
      }
    },
  },
  variants: {},
  plugins: [],
};
