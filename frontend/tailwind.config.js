module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          button: "#FF1E43",
        },
        blue: {
          text: "#00BFA5",
          dark: "#00342D",
          light: "#E8FFFC",
          medium: "#45DCC7",
          modal: "#007ABF",
        },
        gray: {
          background: "#FAFAFA",
          light: "rgba(0,0,0,0.08)",
          medium: "rgba(0,0,0,0.6)",
        },
        yellow: {
          light: "#d9d918",
          medium: "#CBCB1E",
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      backgroundColor: ["active, checked"],
      borderColor: ["checked"],
    },
  },
  plugins: [],
};
