/**
 * Temas disponibles. Cada valor tiene que existir como selector
 * [data-theme="..."] en src/styles/themes/.
 *
 * BaseLayout lo escribe en <html data-theme="...">, así que todo el subárbol
 * (incluido el nav y el footer) hereda la paleta sin tocar un solo componente.
 * `varta` además se usa como sub-tema en una sección suelta dentro de YPF Agro.
 */
export type Tema = 'petroarsa' | 'bridgestone' | 'ypf' | 'varta';
