/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'custom-gray': 'rgba(245, 245, 245, 0.5)',
        'custom-pink': 'rgba(217, 194, 192, 0.5)',
        'custom-purple': 'rgba(159, 136, 200, 0.5)',
      },
      fontFamily: {
        'manrope': ['Manrope'],
      },
      fontWeight: {
        'thin-var': '100',
        'extralight-var': '200',
        'light-var': '300',
        'normal': '400',
        'medium-var': '500',
        'semibold-var': '600',
        'extrabold-var': '800',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}