/**
 * LE LINGUE DEL SITO E I LORO INDIRIZZI.
 *
 * Fino a S384 queste quattro cose stavano in `i18n/index.ts`, insieme allo
 * schema `Translations` del telaio vecchio. Tolto il telaio vecchio (corsia
 * B6) resta solo cio' che il telaio nuovo usa: l'elenco delle lingue, il loro
 * nome e la costruzione degli indirizzi. I testi stanno in `testi.ts` e nella
 * cartella `testi/`.
 */
export type Locale = 'it' | 'en' | 'es' | 'fr' | 'de' | 'pt';

export const LOCALES: Locale[] = ['it', 'en', 'es', 'fr', 'de', 'pt'];
export const DEFAULT_LOCALE: Locale = 'it';

/**
 * L'UNICA costruzione di URL del sito. Non riscriverla a mano nei componenti.
 *
 * `astro.config.mjs` ha `build.format: 'file'`: gli URL NON hanno lo slash
 * finale. `/en` e' 200, `/en/` e' 404 (verificato sul sito servito). La prima
 * pagina italiana e' `/`: una stringa vuota in un `href` punterebbe alla
 * pagina corrente invece che alla prima.
 */
export function localePath(locale: Locale, path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const page = path ? `/${path}` : '';
  return `${base}${prefix}${page}` || '/';
}

/** Il nome di ogni lingua, scritto nella lingua stessa. */
export const LOCALE_NAMES: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
};

/**
 * I DUE PUNTI dopo un'etichetta ("Lingue: ...", "Stampa: ..."). Il francese
 * vuole uno spazio insecabile prima dei due punti; le altre cinque lingue no.
 * Prima il colophon scriveva `{etichetta}:` per tutte e in francese usciva
 * "Langues:" (rilievo dei traduttori, S384). Si usa U+00A0 e non lo spazio
 * fine U+202F, come nel resto di `testi/fr.ts`.
 */
export function duePunti(locale: Locale): string {
  return locale === 'fr' ? '\u00a0:' : ':';
}
