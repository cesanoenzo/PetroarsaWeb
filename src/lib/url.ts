/**
 * Helpers de URL.
 *
 * En Vercel el sitio se sirve desde la raíz, así que hoy `BASE` es '/' y estos
 * helpers no agregan nada. Existen igual para que, si alguna vez el sitio se
 * mueve a un hosting con sub-path (GitHub Pages, por ejemplo), alcance con
 * poner `base` en astro.config.mjs: ningún href ni src queda hardcodeado.
 */

const BASE = import.meta.env.BASE_URL; // '/' en Vercel

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
