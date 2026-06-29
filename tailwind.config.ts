import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F1',
        ivory: '#F2EBDD',
        espresso: {
          DEFAULT: '#3A2E2A',
          soft: '#5C4A44',
        },
        terracotta: {
          DEFAULT: '#C2744A',
          dark: '#A45D38',
        },
        sage: {
          DEFAULT: '#8A9A82',
          dark: '#6E7E68',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '70ch',
      },
    },
  },
  plugins: [],
};

export default config;
