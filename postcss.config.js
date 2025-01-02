// postcss.config.js
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default {
  plugins: [
    tailwindcss,  // Ensure TailwindCSS is being used
    autoprefixer,  // Automatically add vendor prefixes
  ],
};
