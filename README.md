# PetroarsaWeb

Sitio institucional y de catálogo de **Petroarsa S.A.** — Astro 4 + Tailwind 3, 100% estático,
pensado para GitHub Pages.

- Home institucional con la identidad Petroarsa (verde + naranja).
- Tres secciones de unidad de negocio, cada una con la paleta de su marca partner:
  **Bridgestone** (rojo/negro), **YPF Agro** y **Estaciones** (azul/amarillo YPF), con un
  sub-bloque **VARTA** (azul oscuro/amarillo) dentro de YPF Agro.
- Catálogo navegable con filtros, fichas técnicas descargables y detalle por producto.

---

## 1. Requisitos

- **Node.js 20 LTS** o superior (hay un `.nvmrc` con `20`).
- **pnpm** recomendado (`npm i -g pnpm`). Si preferís npm, funciona igual: cambiá `pnpm` por `npm`
  en todos los comandos.

> En esta PC todavía no está instalado Node. Descargalo de <https://nodejs.org> (versión LTS),
> reiniciá la terminal y verificá con `node -v`.

## 2. Instalar y levantar en local

```bash
pnpm install
```

```bash
pnpm dev
```

Abre <http://localhost:4321/PetroarsaWeb/> (el sub-path `/PetroarsaWeb` viene del `base` de
`astro.config.mjs`, igual que en producción).

Otros comandos:

```bash
pnpm build
```

```bash
pnpm preview
```

`pnpm build` corre `astro check` primero, así que también valida los tipos y el frontmatter de
todos los productos.

---

## 3. Cómo agregar un producto nuevo

**Paso 1 — Elegí la carpeta.** La carpeta define en qué sección del sitio aparece:

| Carpeta en `src/content/productos/` | Aparece en |
|---|---|
| `bridgestone/` | `/bridgestone/` |
| `ypf/` (combustibles y lubricantes mayoristas) | `/ypf-agro/` |
| `ypf-agro/` (fertilizantes, agroquímicos, semillas, silobolsas) | `/ypf-agro/` |
| `varta/` (baterías) | `/ypf-agro/`, en el bloque VARTA |
| `estaciones/` | `/estaciones/` |

**Paso 2 — Creá el archivo `.md`.** El nombre del archivo es la URL:
`src/content/productos/bridgestone/ecopia-ep150.md` → `/bridgestone/ecopia-ep150/`.

```markdown
---
titulo: "Ecopia EP150"
marca: "Bridgestone"          # Bridgestone | Firestone | YPF | YPF Agro | Elaion | VARTA
categoria: "Auto"             # ver tabla de categorías abajo
subcategoria: "Bajo consumo"  # opcional
descripcionCorta: "Una línea que se lee en la tarjeta del catálogo."
imagenPrincipal: "/imagenes/productos/bridgestone/ecopia-ep150.jpg"
imagenesSecundarias:          # opcional
  - "/imagenes/productos/bridgestone/ecopia-ep150-dibujo.jpg"
fichaTecnica: "/fichas-tecnicas/bridgestone/ecopia-ep150.pdf"   # opcional
medidas:                      # neumáticos
  - "175/65 R14"
presentaciones:               # lubricantes, fertilizantes, agroquímicos
  - "20 litros"
especificaciones:
  - label: "Tipo"
    value: "Auto"
tags:
  - "Bajo consumo"
destacado: false              # true = medalla "Destacado" en la tarjeta
disponibleEn:                 # ids de src/data/sucursales.json
  - "cs-bridgestone-yerba-buena"
orden: 50                     # menor = aparece antes
---

## Características

Texto libre en markdown. Se renderiza al final del detalle del producto.
```

**Paso 3 — Poné la foto.** Guardala en `public/imagenes/productos/<carpeta>/` (mínimo 1200 px de
lado mayor, fondo blanco o transparente) y apuntá `imagenPrincipal` a esa ruta.

> Mientras no haya foto real, dejá el placeholder que corresponda:
> `/imagenes/productos/placeholder-bridgestone.svg`, `-ypf.svg`, `-ypf-agro.svg`, `-varta.svg` o
> `-estaciones.svg`.

**Paso 4 — Poné la ficha técnica.** Guardá el PDF en `public/fichas-tecnicas/<carpeta>/` y apuntá
`fichaTecnica` ahí. Si dejás el campo vacío (`""`), el sitio muestra un aviso de "ficha pendiente"
en lugar del botón de descarga: no se rompe nada.

**Paso 5 — Listo.** El producto aparece solo en el catálogo, en los filtros y en "productos
relacionados". No hay que tocar ningún otro archivo.

### Categorías que ya conoce el sitio

En **YPF Agro** el catálogo se agrupa por familia, y la familia sale de la `categoria`. Estas son
las que ya están mapeadas (en `src/pages/ypf-agro/index.astro`):

| Familia | Categorías |
|---|---|
| Combustibles | `Combustible` |
| Lubricantes | `Lubricante para auto`, `Lubricante para camión`, `Lubricante agrícola`, `Lubricante industrial`, `Lubricante para moto` |
| Fertilizantes | `Fertilizante` |
| Agroquímicos | `Agroquímico` |
| Semillas | `Semilla` |
| Silobolsas | `Silobolsa` |

Si usás una categoría nueva, el producto cae en el bloque **"Otros productos"**. Para que tenga su
propia familia, agregala al array `familias` de `src/pages/ypf-agro/index.astro`.

---

## 4. Cómo agregar o editar una sucursal

Todo vive en `src/data/sucursales.json`. Agregá un objeto al array:

```json
{
  "id": "nueva-sucursal",
  "nombre": "Nombre visible",
  "tipo": "Estación de Servicios",
  "unidad": "estaciones",
  "direccion": "Calle 123",
  "localidad": "Ciudad, Tucumán",
  "coordenadas": { "lat": null, "lng": null },
  "telefono": null,
  "horarios": "Lunes a viernes de 8 a 18 hs",
  "servicios": ["Combustibles"],
  "imagen": "/imagenes/sucursales/nueva-sucursal.jpg",
  "desde": 2026
}
```

- `unidad` tiene que ser `bridgestone`, `ypf-agro` o `estaciones`: define en qué sección aparece.
- `id` es el que usás en el `disponibleEn` de los productos.
- La foto va en `public/imagenes/sucursales/`.

La sucursal aparece automáticamente en la home, en el footer, en la página de contacto y en la
sección de su unidad.

---

## 5. Cómo cambiar el email destinatario del formulario

El formulario usa **Web3Forms** (sin backend, funciona incluso con JavaScript deshabilitado).

1. Entrá a <https://web3forms.com>, poné el email institucional y te llega una **Access Key**.
2. Abrí `src/data/empresa.json` y reemplazá:

```json
"formulario": {
  "servicio": "web3forms",
  "accessKey": "REEMPLAZAR-CON-TU-ACCESS-KEY-DE-WEB3FORMS"
}
```

3. Listo: los mensajes llegan al email que registraste. Para cambiar el destinatario, generás una
   Access Key nueva con el otro email.

> Los demás datos de contacto (email visible, teléfono, WhatsApp, dirección) también salen de
> `src/data/empresa.json`. El WhatsApp va en formato internacional sin `+` ni espacios:
> `5493810000000`.

---

## 6. Deploy en GitHub Pages

**Una sola vez:**

1. Creá el repositorio en GitHub con el nombre exacto **`PetroarsaWeb`**.
2. En `astro.config.mjs`, cambiá `SITE` por `https://<TU-USUARIO>.github.io`.
3. Subí el proyecto:

```bash
git init && git add . && git commit -m "Initial commit" && git branch -M main
```

```bash
git remote add origin https://github.com/<TU-USUARIO>/PetroarsaWeb.git && git push -u origin main
```

4. En **Settings → Pages**, elegí **Source: GitHub Actions** (no "Deploy from a branch").

**De ahí en adelante:** cada `git push` a `main` dispara el workflow de
`.github/workflows/deploy.yml` y publica solo.

La URL final es `https://<TU-USUARIO>.github.io/PetroarsaWeb/`.

### Si más adelante se compra un dominio propio

1. Creá `public/CNAME` con una sola línea: `petroarsa.com.ar`.
2. En `astro.config.mjs`: `site: 'https://petroarsa.com.ar'` y **borrá** la línea `base`.
3. En el DNS del dominio, un registro `CNAME` apuntando a `<TU-USUARIO>.github.io`.

---

## 7. Cómo funciona el sistema de temas

Es la parte menos obvia del proyecto, así que vale la pena entenderla.

1. Cada paleta vive en `src/styles/themes/*.css` como un set de **variables CSS** bajo un selector
   `[data-theme="..."]`.
2. `BaseLayout.astro` escribe `<html data-theme="bridgestone">` según la unidad.
3. Tailwind está configurado (`tailwind.config.mjs`) para que `bg-brand-primary`,
   `text-brand-accent`, etc. **lean esas variables**, no colores fijos.

Resultado: el mismo `ProductCard.astro` se ve rojo en Bridgestone y azul en YPF Agro sin una sola
condición en el código. Por eso la regla es **nunca hardcodear un color en un componente**: siempre
`brand-primary`, `brand-accent`, `brand-ink`, etc.

Como las variables CSS se heredan por el árbol del DOM, también se puede aplicar un tema a un
bloque suelto. Eso es lo que hace la sección de baterías dentro de YPF Agro:

```astro
<section data-theme="varta">…</section>
```

Para agregar un tema nuevo: creá el `.css` en `src/styles/themes/`, importalo en
`src/styles/global.css`, sumá el nombre al tipo `Tema` en `src/lib/temas.ts` y usalo en
`src/data/unidades.json`.

---

## 8. Estructura del proyecto

```
public/                     Archivos servidos tal cual (logos, fotos, PDFs)
  logo-petroarsa.svg        Logo institucional (PROVISORIO, ver pendientes)
  logos-partners/           YPF, Bridgestone, Firestone, VARTA, Elaion (PROVISORIOS)
  imagenes/
    hero/                   Banner institucional
    sucursales/             Fotos reales de los 6 puntos de venta
    productos/              Fotos de catálogo + placeholders
  fichas-tecnicas/          PDFs por unidad

src/
  components/
    layout/                 Nav, Footer, breadcrumb
    home/                   Secciones de la home
    unidad/                 Hero de unidad, grilla, tarjeta y filtros de catálogo
    producto/               Galería, especificaciones, descarga de ficha
    shared/                 Título de sección, CTA, formulario
  content/
    config.ts               Schema (Zod) de producto
    productos/              Un .md por producto
  data/                     JSON de sucursales, unidades, timeline, valores, marcas, empresa
  layouts/                  Base, Home, Unidad, Producto
  lib/                      Helpers de URL, catálogo y temas
  pages/                    Rutas del sitio
  styles/                   global.css + themes/
```

### Rutas

| Ruta | Qué es |
|---|---|
| `/` | Home institucional |
| `/bridgestone/` | Unidad Bridgestone + catálogo |
| `/bridgestone/<slug>/` | Detalle de producto |
| `/ypf-agro/` | Unidad YPF Agro + catálogo por familias + VARTA |
| `/ypf-agro/<slug>/` | Detalle de producto |
| `/estaciones/` | Estaciones de servicio + combustibles y servicios |
| `/estaciones/<slug>/` | Detalle de producto/servicio |
| `/contacto/` | Formulario, datos y mapa |
| `/404` | Página no encontrada |

---

## 9. De dónde salió el contenido

El copy institucional (historia, visión, misión, valores, política de calidad, RSE, hitos) está
tomado de las gacetillas internas N° 01, 02, 04, 06 y 07. Las fotos de los seis puntos de venta y
el banner del hero también salen de esos PDFs.

> **Revisar:** la asignación de cada foto a cada sucursal se dedujo del contenido de las imágenes.
> Antes de publicar, confirmá que la foto de `ypf-thames.jpg` y la de `ypf-agro-cevil-pozo.jpg`
> correspondan efectivamente a esas sucursales.

---

## 10. Pendientes antes de publicar

- [ ] **Logo oficial** de Petroarsa en SVG → reemplazar `public/logo-petroarsa.svg` y
      `public/logo-petroarsa-blanco.svg`. Los actuales son una construcción provisoria con la
      paleta institucional, **no** el logo oficial.
- [ ] **Logos oficiales de partners** en SVG → reemplazar los de `public/logos-partners/`
      (también provisorios; respetan los colores de cada marca pero no son los logos originales).
- [ ] **Datos de contacto reales** en `src/data/empresa.json`: email, teléfono, WhatsApp y
      dirección administrativa (hoy hay placeholders).
- [ ] **Access Key de Web3Forms** (sección 5).
- [ ] **Horarios reales** por sucursal en `src/data/sucursales.json` (los actuales son estimados).
- [ ] **Coordenadas GPS** de cada sucursal, para reemplazar el mapa genérico por uno con
      marcadores.
- [ ] **Redes sociales** en `src/data/empresa.json` (hoy en `null`, por eso no se muestran).
- [ ] **Catálogo real**: los productos cargados son ejemplos. Cada `.md` tiene un comentario
      arriba avisando que las especificaciones deben validarse contra la ficha técnica oficial del
      proveedor antes de publicar.
- [ ] **Fotos y fichas técnicas** de los productos.
- [ ] **Copy revisado** por Marketing.
- [ ] **Usuario de GitHub** en `astro.config.mjs` (`SITE`).

---

## 11. Nota técnica

La especificación pedía usar `<Image />` de `astro:assets` para el catálogo. Está implementado con
`<img>` común porque las fotos viven en `public/` y `astro:assets` solo optimiza imágenes
importadas desde `src/`. Se eligió `public/` para que agregar un producto sea *copiar una foto y
crear un `.md`*, sin tocar imports. Todas las imágenes llevan `width`, `height`, `loading="lazy"`
y `decoding="async"`, así que no hay saltos de layout (CLS) ni descargas innecesarias.

Si más adelante se prefiere la optimización automática, hay que mover las fotos a `src/assets/` y
resolverlas con `import.meta.glob` en `ProductCard.astro` y `ProductGallery.astro`.
