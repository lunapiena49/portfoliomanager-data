// I DATI STRUTTURATI (JSON-LD): il testo del blocco nasce in un posto solo.
//
// Un blocco `<script type="application/ld+json">` non viene eseguito, ma il
// lettore di HTML lo chiude al primo `</script` che incontra, dovunque stia:
// anche dentro una stringa del JSON. `JSON.stringify` non scappa `<`, quindi
// un testo che contenesse `</script>` (una risposta delle Domande, una
// descrizione) chiuderebbe il blocco e il resto diventerebbe HTML della pagina,
// sull'origine dove la demo tiene chiavi e portafogli (revisione di chiusura
// S384). Qui ogni `<` esce come `\u003c`. In JSON un `<` puo' stare solo dentro
// una stringa, e li' `\u003c` e' lo stesso carattere: chi legge il blocco
// riceve gli stessi dati, e nel sorgente HTML non resta nessun `<` (quindi ne'
// `</script` ne' `<!--`).
//
// Passano di qui Pagina.astro (ogni pagina) e Domande.astro (FAQPage). Un
// presidio sui sorgenti (integrations/dati-strutturati.test.mjs) pretende che
// ogni blocco ld+json sia scritto con questa funzione, e uno sul costruito
// (integrations/costruito/sito.test.mjs) che nessun blocco contenga un `<`.

/**
 * Il JSON di un blocco di dati strutturati, pronto per `set:html`.
 * @param {unknown} dati
 * @returns {string}
 */
export function datiStrutturati(dati) {
  return JSON.stringify(dati).replace(/</g, '\\u003c');
}
