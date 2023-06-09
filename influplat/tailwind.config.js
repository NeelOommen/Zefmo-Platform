/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'harsh10px': '10px 10px 0px 0px rgba(0,0,0,1)',
        'harsh5px': '5px 5px 0px 0px rgba(0,0,0,1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        zYellow: {
          100: '#fae3b4',
          500: '#f2b944'
        },
        zRed: {
          500: '#e5222f'
        },
        zPink: {
          100: '#f8bbd7',
          500: '#e61b7b'
        },
        zPurple: {
          100: '#c5bed7',
          500: '#3d277b'
        },
        zGreen: {
          500: "#93c255"
        },
        softBlack: {
          500: '#111111'
        },
        softWhite: {
          500: '#f0f0f0'
        }
      },
    },
  },
  plugins: [],
}
