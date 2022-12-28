/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./frontend/index.html', './frontend/**/*.{vue,js,ts}', './node_modules/tw-elements/dist/js/**/*.js'],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui"), require('tw-elements/dist/plugin')],
  };