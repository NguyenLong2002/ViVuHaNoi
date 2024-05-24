// tailwind.config.js
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '4px 4px 10px 0px rgba(0, 0, 0, 0.3)',
        'full': '0px 0px 10px 6px rgba(0, 0, 0, 0.3)'
      },
      colors: {
        textColor: '#101828',
        primary: '#77dada',
        secondary:'#0d4949',
      },
      backgroundImage: {
        bgPattern: "url('./assets/images/section-background.png')"
      }
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
    require('flowbite/plugin')
  ],
}