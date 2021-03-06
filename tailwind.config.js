module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cotton: "#F5F4F2",
        carbon: "#28282A",
        "mid-gray": "#8C8B89",
        white: "#FFFFFF",
      },
      transitionDuration: {
        1500: "1500ms",
      },
      boxShadow: {
        reminder: "0 4px 4px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        NeueMontreal: "NeueMontreal",
        "NeueMontreal-medium": "NeueMontreal-medium",
        RobotoMono: "RobotoMono",
      },
    },
  },
  variants: {},
  plugins: [],
};
