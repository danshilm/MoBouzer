/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        // TODO find a way to set a default font
        // sans: ['Inter', 'sans-serif'],
        'inter-thin': 'inter-thin',
        'inter-extralight': 'inter-extralight',
        'inter-light': 'inter-light',
        inter: 'inter',
        'inter-medium': 'inter-medium',
        'inter-semibold': 'inter-semibold',
        'inter-bold': 'inter-bold',
        'inter-extrabold': 'inter-extrabold',
        'inter-black': 'inter-black',
        'space-mono': 'space-mono',
        'space-mono-italic': 'space-mono-italic',
        'space-mono-bold': 'space-mono-bold',
        'space-mono-bold-italic': 'space-mono-bold-italic',
      },
    },
  },
  plugins: [],
};
