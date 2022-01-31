module.exports = {
  content: ["./src/**/*.{jsx,js,tsx,ts}"],
  theme: {
    fontFamily: {
      'logo': ['Comfortaa']
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))'
      }
    },
  },
  plugins: [],
}