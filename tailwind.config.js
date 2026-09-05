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
        surface: {
          DEFAULT: "#ffffff",
          soft: "#f5f0eb",
          cream: "#f5f0eb",
          alabaster: "#f5f0eb",
          muted: "#ece6de",
          card: "#ffffff",
          hover: "#fbf9f6",
          dark: "#f5f0eb",
          raised: "#ffffff",
        },
        cream: {
          DEFAULT: "#ffffff",
          soft: "#f5f0eb",
          warm: "#f5f0eb",
          muted: "#ece6de",
        },
        taupe: "#334155",
        muted: "#475569",
        rose: {
          DEFAULT: "#c83b74",
          light: "#df548f",
          vibrant: "#e13b82",
          dark: "#a81d52",
          deep: "#8b1240",
          tint: "#fdf2f7",
          subtle: "rgba(200, 59, 116, 0.12)",
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
        subtle: "rgba(0, 0, 0, 0.08)",
        rose: "rgba(200, 59, 116, 0.25)",
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
        '3d': '0 2px 4px rgba(0, 0, 0, 0.03), 0 10px 20px -3px rgba(15, 23, 42, 0.08), 0 16px 28px -6px rgba(200, 59, 116, 0.08)',
        '3d-hover': '0 6px 12px rgba(0, 0, 0, 0.05), 0 20px 38px -4px rgba(15, 23, 42, 0.14), 0 32px 52px -8px rgba(200, 59, 116, 0.22)',
        'button-3d': '0 4px 14px 0 rgba(200, 59, 116, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -2px 0 rgba(0, 0, 0, 0.18)',
        'button-secondary-3d': '0 2px 6px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(0, 0, 0, 0.06)',
        'inset-groove': 'inset 0 2px 5px rgba(0, 0, 0, 0.12), inset 0 -1px 0 rgba(255, 255, 255, 0.8)',
        'dial-3d': '0 4px 14px rgba(200, 59, 116, 0.48), 0 1px 3px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.45)',
        'card-elevated': '0 1px 3px rgba(0, 0, 0, 0.05), 0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 20px 32px -8px rgba(200, 59, 116, 0.08)',
        'rose-glow': '0 8px 25px -5px rgba(200, 59, 116, 0.32)',
        'rose-subtle': '0 4px 15px 0 rgba(200, 59, 116, 0.16)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
};
