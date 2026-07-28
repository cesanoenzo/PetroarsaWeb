import { defineCollection, z } from 'astro:content';

/**
 * Schema de producto.
 *
 * La UNIDAD de negocio no es un campo: se deduce de la carpeta donde vive el
 * archivo (src/content/productos/<carpeta>/...). Ver src/lib/catalogo.ts.
 * De esa forma agregar un producto = crear un .md en la carpeta correcta.
 */
const productoSchema = z.object({
  titulo: z.string(),
  slug: z.string().optional(),
  marca: z.enum(['Bridgestone', 'Firestone', 'YPF', 'YPF Agro', 'Elaion', 'VARTA']),
  categoria: z.string(), // ej. "Neumático SUV", "Lubricante sintético"
  subcategoria: z.string().optional(),
  descripcionCorta: z.string(),
  imagenPrincipal: z.string(), // /imagenes/productos/.../foo.jpg
  imagenesSecundarias: z.array(z.string()).optional(),
  fichaTecnica: z.string().optional(), // /fichas-tecnicas/.../foo.pdf
  medidas: z.array(z.string()).optional(), // Neumáticos: ["225/60 R17", ...]
  presentaciones: z.array(z.string()).optional(), // Lubricantes: ["1L", "4L", "20L"]
  especificaciones: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  tags: z.array(z.string()).optional(), // ["Alto rendimiento", "Diésel", ...]
  destacado: z.boolean().default(false),
  disponibleEn: z.array(z.string()).optional(), // ids de sucursales.json
  orden: z.number().default(100), // Para ordenar en el catálogo
});

const productos = defineCollection({
  type: 'content',
  schema: productoSchema,
});

export const collections = { productos };
export type ProductoSchema = z.infer<typeof productoSchema>;
