/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'group-hover:bg-blue-600',
    'group-hover:bg-purple-600',
    'group-hover:bg-green-600',
    'group-hover:bg-pink-600',
    'group-hover:bg-yellow-600',
    'group-hover:bg-cyan-600',
    'skill-animate-rotate',
    'skill-animate-bounce',
    'skill-animate-scale',
    'skill-animate-pulse',
    'skill-animate-wiggle',
    'skill-animate-float',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
