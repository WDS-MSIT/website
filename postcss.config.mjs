// Tailwind CSS v4 runs as a PostCSS plugin. It only acts on stylesheets that import 'tailwindcss',
// which today is the public frontend's styles.css; the Payload admin styles are left alone.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
