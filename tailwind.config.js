/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        // TODO find a way to set a default font
        // sans: ['Inter', 'sans-serif'],
        'inter-thin': 'Inter_100Thin',
        'inter-extralight': 'Inter_200ExtraLight',
        'inter-light': 'Inter_300Light',
        inter: 'Inter_400Regular',
        'inter-medium': 'Inter_500Medium',
        'inter-semibold': 'Inter_600SemiBold',
        'inter-bold': 'Inter_700Bold',
        'inter-extrabold': 'Inter_800ExtraBold',
        'inter-black': 'Inter_900Black',
        'space-mono': 'SpaceMono_400Regular',
        'space-mono-italic': 'SpaceMono_400Regular_Italic',
        'space-mono-bold': 'SpaceMono_700Bold',
        'space-mono-bold-italic': 'SpaceMono_700Bold_Italic',
      },
      spacing: {
        2.5: '0.625rem',
        7.5: '1.875rem',
        13: '3.25rem',
      },
    },
  },
  plugins: [],
};
