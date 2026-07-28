import { getCollection, type CollectionEntry } from 'astro:content';

export type Producto = CollectionEntry<'productos'>;
export type UnidadId = 'bridgestone' | 'ypf-agro' | 'estaciones';

/**
 * Qué carpetas de src/content/productos/ alimentan cada unidad del sitio.
 * YPF Agro concentra el catálogo mayorista: combustibles y lubricantes YPF,
 * insumos agro y baterías VARTA.
 */
const CARPETAS_POR_UNIDAD: Record<UnidadId, string[]> = {
  bridgestone: ['bridgestone'],
  'ypf-agro': ['ypf', 'ypf-agro', 'varta'],
  estaciones: ['estaciones'],
};

/** Carpeta (primer segmento del id, ej. "ypf-agro/urea-granulada.md" → "ypf-agro"). */
export function carpetaDe(p: Producto): string {
  return p.id.split('/')[0];
}

/** Slug final del producto, sin carpeta ni extensión. Respeta `slug:` del frontmatter. */
export function slugDe(p: Producto): string {
  return p.data.slug ?? p.slug.split('/').pop()!;
}

/** Ruta pública del producto, ej. "/ypf-agro/urea-granulada/" (sin la base del sitio). */
export function rutaProducto(unidad: UnidadId, p: Producto): string {
  return `/${unidad}/${slugDe(p)}/`;
}

/** Productos de una unidad, ya ordenados (orden asc, después alfabético). */
export async function productosDeUnidad(unidad: UnidadId): Promise<Producto[]> {
  const carpetas = CARPETAS_POR_UNIDAD[unidad];
  const todos = await getCollection('productos', ({ id }) =>
    carpetas.includes(id.split('/')[0])
  );
  return todos.sort(
    (a, b) => a.data.orden - b.data.orden || a.data.titulo.localeCompare(b.data.titulo, 'es')
  );
}

/** Categorías únicas presentes en un set de productos, para armar los filtros. */
export function categoriasDe(productos: Producto[]): string[] {
  return [...new Set(productos.map((p) => p.data.categoria))].sort((a, b) =>
    a.localeCompare(b, 'es')
  );
}

/** Marcas únicas presentes en un set de productos. */
export function marcasDe(productos: Producto[]): string[] {
  return [...new Set(productos.map((p) => p.data.marca))].sort((a, b) => a.localeCompare(b, 'es'));
}

/**
 * Productos relacionados: misma categoría primero, después misma marca.
 * Se usa al pie del detalle de producto (RF-14).
 */
export function relacionados(actual: Producto, universo: Producto[], max = 4): Producto[] {
  const otros = universo.filter((p) => p.id !== actual.id);
  const mismaCategoria = otros.filter((p) => p.data.categoria === actual.data.categoria);
  const mismaMarca = otros.filter(
    (p) => p.data.categoria !== actual.data.categoria && p.data.marca === actual.data.marca
  );
  return [...mismaCategoria, ...mismaMarca].slice(0, max);
}

/**
 * Normaliza texto para los filtros del cliente: sin acentos, minúsculas.
 * Se guarda en data-attributes del ProductCard.
 */
export function normalizar(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}
