/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        zYellow: {
          500: '#f2b944'
        },
        zRed: {
          500: '#e5222f'
        },
        zPink: {
          500: '#e61b7b'
        },
        zPurple: {
          500: '#3d277b'
        },
        zGreen: {
          500: "#93c255"
        },
      },
    },
  },
  plugins: [],
}
