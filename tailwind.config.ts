import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#F9ED32',
        'brand-purple': '#A78BFA',
        'brand-cyan': '#55E6D1',
        'brand-orange': '#FF7547',
        'brand-bg': '#F5F0E8',
        'brand-black': '#171717',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px #171717',
        'brutal-sm': '2px 2px 0px #171717',
        'brutal-lg': '6px 6px 0px #171717',
        'brutal-yellow': '4px 4px 0px #F9ED32',
        'brutal-purple': '4px 4px 0px #A78BFA',
        'brutal-cyan': '4px 4px 0px #55E6D1',
        'brutal-orange': '4px 4px 0px #FF7547',
      },
      borderRadius: {
        brutal: '6px',
        'brutal-lg': '12px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideDown: 'slideDown 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
