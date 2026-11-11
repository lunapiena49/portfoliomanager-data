/**
 * I broker che Portfolio Manager legge nativamente. Sono UNDICI: la fonte e'
 * `lib/services/parsers/parser_factory.dart` righe 21-31 del repo dell'app (la
 * dodicesima voce, `other`, e' il lettore CSV generico e non e' un broker).
 * I nomi sono nomi propri: non si traducono.
 *
 * `esempio` e' un importo di ESEMPIO per il palco della home: non e' un dato
 * di nessuno, e la pagina lo dichiara.
 */
export interface Broker {
  nome: string;
  esempio: number;
}

export const BROKER: readonly Broker[] = [
  { nome: 'Interactive Brokers', esempio: 21408.0 },
  { nome: 'Charles Schwab', esempio: 4987.35 },
  { nome: 'Fidelity', esempio: 8240.1 },
  { nome: 'TD Ameritrade', esempio: 6115.72 },
  { nome: 'E*TRADE', esempio: 3020.0 },
  { nome: 'Robinhood', esempio: 1250.4 },
  { nome: 'Vanguard', esempio: 12330.9 },
  { nome: 'DEGIRO', esempio: 9870.25 },
  { nome: 'Trading 212', esempio: 2415.6 },
  { nome: 'XTB', esempio: 5660.0 },
  { nome: 'Revolut', esempio: 1980.15 },
];

/** Il totale del portafoglio d'esempio, in centesimi interi per non perdere cifre. */
export function totaleEsempio(broker: readonly Broker[] = BROKER): number {
  const centesimi = broker.reduce((somma, b) => somma + Math.round(b.esempio * 100), 0);
  return centesimi / 100;
}
