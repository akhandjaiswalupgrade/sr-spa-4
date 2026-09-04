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
          DEFAULT: "#181416",
          deep: "#120e10",
        },
        surface: {
          dark: "#201a1e",
          raised: "#2c2427",
          overlay: "rgba(44, 36, 39, 0.85)",
          card: "#2c2427",
          hover: "#382f34",
        },
        cream: {
          DEFAULT: "#FFFFFF",
          soft: "#FAF7F8",
          muted: "#DDD4D8",
        },
        taupe: "#DDD4D8",
        muted: "#A89DA2",
        rose: {
          DEFAULT: "#e88cb2",
          light: "#f3b1cb",
          dark: "#c4688b",
          subtle: "rgba(232, 140, 178, 0.15)",
        },
        // Mapped to soft pink to eliminate old yellow/gold across any residual styles
        gold: {
          DEFAULT: "#e88cb2",
          light: "#f3b1cb",
          dark: "#c4688b",
          subtle: "rgba(232, 140, 178, 0.15)",
        },
        botanical: {
          DEFAULT: "#2d2328",
          dark: "#20181d",
          accent: "#3d2b33",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'card-sm': '12px',
        'card': '16px',
        'visual': '20px',
        'feature': '24px',
        'btn': '12px',
      },
      borderColor: {
        subtle: "rgba(255, 255, 255, 0.08)",
        rose: "rgba(232, 140, 178, 0.3)",
        gold: "rgba(232, 140, 178, 0.3)",
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'luxury-glow': '0 0 35px -5px rgba(232, 140, 178, 0.25)',
        'rose-glow': '0 0 35px -5px rgba(232, 140, 178, 0.25)',
        'rose-subtle': '0 0 20px 0 rgba(232, 140, 178, 0.15)',
        'gold-subtle': '0 0 20px 0 rgba(232, 140, 178, 0.15)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
};
