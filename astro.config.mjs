import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// ────────────────────────────────────────────────────────────────────────────
// El sitio vive en GitHub Pages bajo el repo `PetroarsaWeb`, o sea que se
// sirve desde https://cesanoenzo.github.io/PetroarsaWeb/ — por eso el `base`.
//
// Cuando se compre un dominio propio (ej. petroarsa.com.ar):
//   1. crear public/CNAME con el dominio
//   2. site: 'https://petroarsa.com.ar'
//   3. ELIMINAR la línea `base`
// ────────────────────────────────────────────────────────────────────────────
const SITE = 'https://cesanoenzo.github.io';
const BASE = '/PetroarsaWeb';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap(), icon()],
  build: {
    format: 'directory',
  },
});
