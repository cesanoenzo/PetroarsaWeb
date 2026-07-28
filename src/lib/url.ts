/**
 * Helpers de URL.
 *
 * El sitio vive bajo un sub-path en GitHub Pages (`/PetroarsaWeb/`), así que
 * NINGÚN href ni src puede empezar con "/" a secas: hay que prefijar la base.
 * Estos helpers centralizan eso para que el día que se compre un dominio propio
 * alcance con borrar `base` en astro.config.mjs y todo siga funcionando.
 */

const BASE = import.meta.env.BASE_URL; // '/PetroarsaWeb/' o '/'

/** Link a una página interna. Devuelve siempre con barra final (trailingSlash: 'always'). */
export function ruta(path = '/'): string {
  const limpio = path.replace(/^\/+/, '');
  const conBase = `${BASE.replace(/\/+$/, '')}/${limpio}`;
  if (conBase === '/') return '/';
  // Los anchors (#) y los archivos con extensión no llevan barra final.
  if (conBase.includes('#') || /\.[a-z0-9]+$/i.test(conBase)) return conBase;
  return conBase.endsWith('/') ? conBase : `${conBase}/`;
}

/** Link a un asset dentro de public/ (imágenes, PDFs, logos). Sin barra final. */
export function asset(path: string): string {
  const limpio = path.replace(/^\/+/, '');
  return `${BASE.replace(/\/+$/, '')}/${limpio}`;
}
