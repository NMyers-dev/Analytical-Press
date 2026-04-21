import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', '"Nimbus Roman"', "Times", "serif"],
        sans: ['"Times New Roman"', '"Nimbus Roman"', "Times", "serif"]
      },
      colors: {
        pitch: {
          50: "#F4EFE6",
          100: "#E8DFCE",
          200: "#CDBFA0",
          300: "#9CA893",
          400: "#556B5A",
          500: "#2C4A3A",
          600: "#0B3D2E",
          700: "#082E22",
          800: "#051E17",
          900: "#03100C"
        },
        chalk: "#FAF7F0",
        ink: "#121212",
        stripe: "#1F2A24",
        accent: "#B08968"
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink"),
            "--tw-prose-headings": theme("colors.pitch.700"),
            "--tw-prose-lead": theme("colors.pitch.500"),
            "--tw-prose-links": theme("colors.pitch.600"),
            "--tw-prose-bold": theme("colors.ink"),
            "--tw-prose-quotes": theme("colors.pitch.500"),
            "--tw-prose-quote-borders": theme("colors.accent"),
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: "1.125rem",
            lineHeight: "1.75",
            maxWidth: "68ch"
          }
        }
      })
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
