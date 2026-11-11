/**
 * I PREZZI NEL FORMATO NATIVO DI OGNI LINGUA (S384, corsia B6).
 *
 * IL DIFETTO. Il presidio di prima (giorno.test.mjs) pretendeva da ogni
 * dizionario la forma `cifra, spazio non separabile, simbolo`: giusta in
 * italiano, spagnolo, francese, tedesco e portoghese, sbagliata in inglese,
 * dove il simbolo va davanti e senza spazio. Per restare verdi i testi inglesi
 * erano stati scritti nella forma italiana col punto al posto della virgola
 * (rilievo dei traduttori). Un presidio che impone la forma di una lingua a
 * tutte le altre produce il difetto che dovrebbe fermare.
 *
 * LA REGOLA, in due meta' separate:
 *  1. I NUMERI. Una lingua non ha un listino suo: in ogni chiave gli importi
 *     sono gli stessi dell'italiano, che e' la lingua sorgente (e la coppia
 *     piano/importo dell'italiano la verifica check_listino.py dell'app
 *     contro il listino canonico). Un importo cambiato, tolto o aggiunto in
 *     traduzione e' un difetto.
 *  2. LA FORMA. Ogni importo e' scritto come lo scrive la lingua. L'oracolo
 *     non e' una regola a mano: e' `Intl.NumberFormat` con la valuta EUR, cioe'
 *     i dati CLDR di Node. Misurato (Node 22.18): simbolo davanti, senza
 *     spazio, punto decimale per `en`; cifra, virgola, U+00A0, simbolo per le
 *     altre cinque. Il portoghese del sito e' europeo (`pt-PT`): quello
 *     brasiliano mette il simbolo davanti.
 *
 * Modulo puro: non legge file. Lo usano integrations/sei-lingue.test.mjs e
 * integrations/giorno.test.mjs.
 */

/** La variante regionale con cui si chiede il formato a Intl. */
export const VARIANTE = {
  it: 'it-IT',
  en: 'en',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  pt: 'pt-PT',
};

const EURO = '€';
const SPAZI = '[ \\u00a0\\u202f]';
// Un importo con due decimali accanto al simbolo dell'euro (davanti o dietro,
// con o senza spazio) oppure seguito dalla parola: tutte le forme in cui un
// prezzo puo' essere scritto, giuste o sbagliate che siano.
const IMPORTO = '\\d{1,3}[.,]\\d{2}';
const PREZZO = new RegExp(
  `${EURO}${SPAZI}?${IMPORTO}|${IMPORTO}${SPAZI}?${EURO}|${IMPORTO}${SPAZI}?(?:EUR|euros?)(?![\\p{L}])`,
  'giu',
);

/** Come la lingua scrive un importo in euro (CLDR via Intl). */
export function formatoNativo(lingua, importo) {
  const variante = VARIANTE[lingua];
  if (!variante) throw new Error(`lingua senza variante dichiarata: ${lingua}`);
  if (!Number.isFinite(importo)) throw new Error(`importo non numerico: ${importo}`);
  return new Intl.NumberFormat(variante, { style: 'currency', currency: 'EUR' }).format(importo);
}

/** Gli importi in euro scritti in una stringa: `[{ grezzo, importo }]`. */
export function prezziIn(testo) {
  if (typeof testo !== 'string') throw new Error('prezziIn vuole una stringa');
  return [...testo.matchAll(PREZZO)].map((m) => ({
    grezzo: m[0],
    importo: Number.parseFloat(m[0].match(new RegExp(IMPORTO))[0].replace(',', '.')),
  }));
}

function foglie(o, prefisso = '', uscita = []) {
  if (typeof o === 'string') uscita.push([prefisso, o]);
  else if (Array.isArray(o)) o.forEach((v, i) => foglie(v, `${prefisso}[${i}]`, uscita));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) foglie(v, prefisso ? `${prefisso}.${k}` : k, uscita);
  return uscita;
}

const centesimi = (lista) => lista.map((p) => Math.round(p.importo * 100)).sort((a, b) => a - b);

/**
 * I difetti dei prezzi di un dizionario rispetto alla lingua sorgente: `[]`
 * se regge. Lancia se la sorgente non porta prezzi: un presidio che non
 * giudica nulla e' verde senza provare nulla.
 */
export function difettiPrezzi(lingua, dizionario, sorgente) {
  const attesi = new Map(foglie(sorgente).map(([k, v]) => [k, prezziIn(v)]));
  const quanti = [...attesi.values()].reduce((n, l) => n + l.length, 0);
  if (quanti === 0) throw new Error('la lingua sorgente non porta nessun prezzo: presidio non verificabile');
  const difetti = [];
  const viste = new Set();
  for (const [chiave, v] of foglie(dizionario)) {
    viste.add(chiave);
    const trovati = prezziIn(v);
    const dovuti = attesi.get(chiave) ?? [];
    if (JSON.stringify(centesimi(trovati)) !== JSON.stringify(centesimi(dovuti))) {
      difetti.push(
        `${chiave}: importi [${trovati.map((p) => p.importo).join(', ')}], la sorgente ha [${dovuti.map((p) => p.importo).join(', ')}]`,
      );
      continue;
    }
    for (const p of trovati) {
      const nativo = formatoNativo(lingua, p.importo);
      if (p.grezzo !== nativo) {
        difetti.push(`${chiave}: "${p.grezzo}" non e' il formato di ${lingua} (atteso "${nativo}")`);
      }
    }
  }
  for (const [chiave, dovuti] of attesi) {
    if (dovuti.length > 0 && !viste.has(chiave)) difetti.push(`${chiave}: la chiave coi prezzi manca`);
  }
  // Il prezzo di un piano apre la cella del listino: prima l'importo, poi il periodo.
  for (const piano of dizionario?.prezzi?.piani ?? []) {
    const primo = prezziIn(piano.prezzo)[0];
    if (!primo || !piano.prezzo.startsWith(primo.grezzo)) {
      difetti.push(`prezzi.piani (${piano.id}): il prezzo non apre la cella: "${piano.prezzo}"`);
    }
  }
  return difetti;
}
