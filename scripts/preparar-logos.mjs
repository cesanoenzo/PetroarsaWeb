/**
 * Prepara los logos para la web.
 *
 * Toma los originales de `Logos/` (arte plano sobre fondo blanco, JPG o PNG) y
 * genera PNG con fondo transparente, sin márgenes y a una altura razonable:
 *   1. recorta el blanco sobrante de los bordes
 *   2. arma el canal alfa por umbral: lo casi-blanco queda transparente
 *   3. escala a la altura objetivo
 *
 * Uso:  node scripts/preparar-logos.mjs
 *
 * Cuando lleguen los logos que faltan (Firestone, Elaion), agregalos al array
 * TRABAJOS y volvé a correrlo.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const ORIGEN = 'Logos/';
const ALTO = 160; // px; se muestran a ~36-44px, así que alcanza para pantallas 2x/3x

const TRABAJOS = [
  { src: 'logo_petroarsa.jpg', out: 'public/logo-petroarsa.png' },
  { src: 'logo_YPF.jpg', out: 'public/logos-partners/ypf.png' },
  { src: 'Ypf_agro.jpg', out: 'public/logos-partners/ypf-agro.png' },
  { src: 'YPF_estacionservicio.jpg', out: 'public/logos-partners/ypf-estaciones.png' },
  { src: 'Bridgestone-Logo.png', out: 'public/logos-partners/bridgestone.png' },
  { src: 'VARTA_logo.jpg', out: 'public/logos-partners/varta.png' },
];

for (const t of TRABAJOS) {
  const recortado = await sharp(ORIGEN + t.src)
    .flatten({ background: '#ffffff' })
    .trim({ background: '#ffffff', threshold: 12 })
    .toBuffer();

  // threshold(246) deja el blanco en 255 y el arte en 0; negate lo invierte
  // para que el arte sea lo opaco.
  const alfa = await sharp(recortado).greyscale().threshold(246).negate().toBuffer();
  const conAlfa = await sharp(recortado).ensureAlpha().joinChannel(alfa).png().toBuffer();

  mkdirSync(dirname(t.out), { recursive: true });
  // `palette` reduce a PNG-8: son logos de pocos colores planos, así que baja
  // muchísimo el peso sin diferencia visible.
  const info = await sharp(conAlfa)
    .resize({ height: ALTO, fit: 'inside' })
    .png({ compressionLevel: 9, palette: true, colours: 64 })
    .toFile(t.out);

  console.log(
    `${t.src.padEnd(26)} -> ${t.out.padEnd(40)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`
  );
}

// ── Extras derivados del logo de Petroarsa ────────────────────────────────────

const logo = 'public/logo-petroarsa.png';
const { width: lw, height: lh } = await sharp(logo).metadata();

// 1. Versión monocroma blanca, para fondos oscuros (footer).
//    Se toma el alfa del logo y se lo usa como máscara sobre un lienzo blanco.
const alfaLogo = await sharp(logo).extractChannel('alpha').toBuffer();
const blanco = await sharp({
  create: { width: lw, height: lh, channels: 3, background: '#ffffff' },
})
  .png()
  .toBuffer();

const infoBlanco = await sharp(blanco)
  .ensureAlpha()
  .joinChannel(alfaLogo)
  .png({ compressionLevel: 9, palette: true, colours: 16 })
  .toFile('public/logo-petroarsa-blanco.png');

console.log(
  `(derivado)                 -> ${'public/logo-petroarsa-blanco.png'.padEnd(40)} ${infoBlanco.width}x${infoBlanco.height}  ${(infoBlanco.size / 1024).toFixed(1)} KB`
);

// 2. Favicon: sólo el isotipo, que es el cuadrado de la izquierda del logo.
const infoFav = await sharp(logo)
  .extract({ left: 0, top: 0, width: lh, height: lh })
  .resize(180, 180)
  .png({ compressionLevel: 9, palette: true, colours: 64 })
  .toFile('public/favicon.png');

console.log(
  `(derivado)                 -> ${'public/favicon.png'.padEnd(40)} ${infoFav.width}x${infoFav.height}  ${(infoFav.size / 1024).toFixed(1)} KB`
);
