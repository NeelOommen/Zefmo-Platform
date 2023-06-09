/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'oldmacbookfix': {'raw': '(min-height: 700px)'}
      },
      animation: {
        bgAnim: 'bgKeyFrames 8s infinite',
      },
      keyframes: {
        bgKeyFrames: {
          '0%': {
            transform: 'translate(0px,0px) scale(0.8)'
          },
          '25%': {
            transform: 'translate(-100%,60px) scale(1)'
          },
          '50%': {
            transform: 'translate(0px,0px) scale(1.5)'
          },
          '75%': {
            transform: 'translate(100%,-60px) scale(1)'
          },
          '100%': {
            transform: 'translate(0px,0px) scale(0.8)'
          }
        },
      },
      fontFamily: {
        'opensans': ['Open Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'harsh10px': '10px 10px 0px 0px rgba(0,0,0,1)',
        'harsh5px': '5px 5px 0px 0px rgba(0,0,0,1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'desktopBg': "url('public/bg1.svg)"
      },
      colors: {
        zBlueGreen: {
          100: '#afd4cf',
          500: '#389488',
          900: '#112c29'
        },
        zYellow: {
          100: '#fae3b4',
          500: '#f2b944',
          900: '#795d22'
        },
        zRed: {
          100: '#f5a7ac',
          500: '#e5222f',
          900: '#2e0709'
        },
        zPink: {
          100: '#f8bbd7',
          500: '#e61b7b',
          900: '#8a104a'
        },
        zPurple: {
          100: '#c5bed7',
          500: '#3d277b'
        },
        zGreen: {
          100: '#dfedcc',
          500: '#93c255',
          900: '#2c3a19'
        },
        pinkComplement: {
          500: '#1be686'
        },
        yellowComplement: {
          500: '#447df2'
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
