import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// ────────────────────────────────────────────────────────────────────────────
// Deploy en VERCEL: el sitio se sirve desde la raíz del dominio, así que NO
// lleva `base`. Todos los links y assets se arman con los helpers de
// src/lib/url.ts, que respetan import.meta.env.BASE_URL ('/' en este caso).
//
// `site` se usa para el sitemap, las URLs canónicas y las metatags Open Graph.
// Cambialo por el dominio definitivo cuando se compre (ej. petroarsa.com.ar) y
// configuralo también en Vercel → Settings → Domains.
//
// Si algún día se vuelve a GitHub Pages bajo el repo `PetroarsaWeb`, hay que
// agregar `base: '/PetroarsaWeb'` y poner site: 'https://cesanoenzo.github.io'.
// ────────────────────────────────────────────────────────────────────────────
const SITE = 'https://petroarsa-web.vercel.app';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap(), icon()],
  build: {
    format: 'directory',
  },
});
