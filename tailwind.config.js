/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0E0F0D",
          deep: "#080907",
        },
        surface: {
          dark: "#151511",
          raised: "#1C1915",
          overlay: "rgba(28, 25, 21, 0.85)",
          card: "#191714",
        },
        cream: {
          DEFAULT: "#F4EEE4",
          soft: "#EAE2D5",
          muted: "#B7AFA3",
        },
        taupe: "#B7AFA3",
        muted: "#8E887F",
        gold: {
          DEFAULT: "#C9A96B",
          light: "#D8BC84",
          dark: "#B39252",
          subtle: "rgba(201, 169, 107, 0.15)",
        },
        botanical: {
          DEFAULT: "#283229",
          dark: "#1B231C",
          accent: "#374538",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'card-sm': '16px',
        'card': '20px',
        'visual': '28px',
        'feature': '32px',
      },
      borderColor: {
        subtle: "rgba(255, 255, 255, 0.08)",
        gold: "rgba(201, 169, 107, 0.3)",
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'luxury-glow': '0 0 35px -5px rgba(201, 169, 107, 0.2)',
        'gold-subtle': '0 0 20px 0 rgba(201, 169, 107, 0.12)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
};
