// I CONTI DEL PALCO DEL TELEFONO (pagina Finance). Funzioni pure, senza DOM:
// le usa lo script del browser (telefono.ts) e le prova
// `integrations/finance.test.mjs`.
//
// Il palco di Finance non segue una percentuale fissa del capitolo: segue i
// PASSI del testo. Una "riga di lettura" taglia la finestra a una certa
// altezza; il passo che la attraversa e' quello che si sta leggendo, e decide
// che cosa fa il telefono. Cosi' scena e testo restano insieme a ogni altezza
// di finestra e in ogni lingua (in tedesco i passi sono piu' lunghi).
import { stringi } from '../../../lib/palco-conti.mjs';

/**
 * Quanto di un passo e' salito sopra la riga di lettura. NON e' stretto fra 0
 * e 1: negativo prima che il passo arrivi alla riga, oltre 1 quando l'ha
 * superata. Un passo senza altezza vale 1 se sta sopra la riga, 0 se sotto.
 */
export function passato(cima, altezza, riga) {
  if (!(altezza > 0)) return cima <= riga ? 1 : 0;
  return (riga - cima) / altezza;
}

/**
 * L'avanzamento, fra 0 e 1, di un gruppo di passi contigui: 0 quando la cima
 * del primo tocca la riga, 1 quando la tocca il fondo dell'ultimo.
 */
export function gruppo(cimaPrimo, fondoUltimo, riga) {
  return stringi(passato(cimaPrimo, fondoUltimo - cimaPrimo, riga));
}

/**
 * L'indice del passo che si sta leggendo: l'ultimo la cui cima ha superato la
 * riga. -1 quando nessun passo ci e' ancora arrivato.
 */
export function corrente(cime, riga) {
  let indice = -1;
  for (let k = 0; k < cime.length; k++) {
    if (cime[k] <= riga) indice = k;
  }
  return indice;
}

/**
 * La schermata da mostrare mentre si legge un passo: `lista` sono le schermate
 * che il passo attraversa, `t` quanto del passo e' passato. Il passo si divide
 * in parti uguali, una per schermata. Lista vuota: -1 (nessuna indicazione).
 */
export function schermata(lista, t) {
  if (!Array.isArray(lista) || lista.length === 0) return -1;
  const n = lista.length;
  return lista[Math.min(n - 1, Math.floor(stringi(t) * n))];
}

/**
 * Legge l'elenco delle schermate di un passo dal suo attributo ("0 1 2").
 * Tiene solo gli interi fra 0 e `quante - 1`: un attributo rotto non puo'
 * chiedere una schermata che non esiste.
 */
export function elenco(testo, quante) {
  if (typeof testo !== 'string') return [];
  return testo
    .split(/\s+/)
    .filter((pezzo) => /^\d+$/.test(pezzo))
    .map((pezzo) => Number.parseInt(pezzo, 10))
    .filter((n) => n < quante);
}

/**
 * La riga di lettura, in frazione dell'altezza della finestra, letta dalla
 * variabile CSS `--linea`. Un valore assente o fuori da (0, 1) torna al
 * predefinito: mai una riga fuori dalla finestra.
 */
export function linea(valore, predefinita = 0.55) {
  const v = Number.parseFloat(valore);
  return Number.isFinite(v) && v > 0 && v < 1 ? v : predefinita;
}
