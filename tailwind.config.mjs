/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Todos los colores de marca son variables CSS. El valor concreto lo
      // define el tema activo (ver src/styles/themes/*.css + data-theme).
      // Por eso NUNCA hay que hardcodear un color en un componente.
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          'primary-mid': 'var(--brand-primary-mid)',
          accent: 'var(--brand-accent)',
          'accent-light': 'var(--brand-accent-light)',
          bg: 'var(--brand-bg)',
          'bg-alt': 'var(--brand-bg-alt)',
          ink: 'var(--brand-ink)',
          'ink-soft': 'var(--brand-ink-soft)',
          line: 'var(--brand-line)',
        },
      },
      // `--font-display` cambia por tema: Fraunces en la home institucional,
      // Archivo en las unidades de proveedor (ver themes/*.css).
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['Archivo Variable', 'Archivo', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '78rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
