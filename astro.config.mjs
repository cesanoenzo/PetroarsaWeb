import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// ────────────────────────────────────────────────────────────────────────────
// CAMBIAR <USUARIO> por el usuario/organización real de GitHub.
// Mientras el sitio viva en GitHub Pages bajo el repo `PetroarsaWeb`, el sitio
// se sirve desde https://<USUARIO>.github.io/PetroarsaWeb/ , por eso `base`.
//
// Cuando se compre un dominio propio (ej. petroarsa.com.ar):
//   1. crear public/CNAME con el dominio
//   2. site: 'https://petroarsa.com.ar'
//   3. ELIMINAR la línea `base`
// ────────────────────────────────────────────────────────────────────────────
const SITE = 'https://USUARIO.github.io'; // ← CAMBIAR por tu usuario de GitHub
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
