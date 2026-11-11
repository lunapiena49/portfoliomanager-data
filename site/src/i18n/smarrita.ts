/**
 * I TESTI DELLA PAGINA 404. GitHub Pages serve un solo `/404.html` per tutto
 * il sito, in qualunque lingua fosse l'indirizzo sbagliato: per questo la
 * pagina parla tutte e sei le lingue insieme, e questi testi stanno qui e non
 * nei dizionari per lingua.
 */
import type { Locale } from './lingue';

export interface Smarrita {
  titolo: string;
  testo: string;
  ritorno: string;
}

export const SMARRITA: Record<Locale, Smarrita> = {
  it: {
    titolo: 'Questa pagina non c’è',
    testo: 'L’indirizzo non porta da nessuna parte: può essere cambiato, o non essere mai esistito.',
    ritorno: 'Torna alla prima pagina',
  },
  en: {
    titolo: 'This page isn’t here',
    testo: 'The address leads nowhere: it may have changed, or never existed.',
    ritorno: 'Back to the front page',
  },
  es: {
    titolo: 'Esta página no existe',
    testo: 'La dirección no lleva a ninguna parte: puede haber cambiado o no haber existido nunca.',
    ritorno: 'Volver a la portada',
  },
  fr: {
    titolo: 'Cette page n’existe pas',
    testo: 'L’adresse ne mène nulle part : elle a pu changer, ou n’avoir jamais existé.',
    ritorno: 'Retour à la une',
  },
  de: {
    titolo: 'Diese Seite gibt es nicht',
    testo: 'Die Adresse führt nirgendwohin: Sie wurde geändert oder hat nie existiert.',
    ritorno: 'Zur Startseite',
  },
  pt: {
    titolo: 'Esta página não existe',
    testo: 'O endereço não leva a lado nenhum: pode ter mudado ou nunca ter existido.',
    ritorno: 'Voltar à primeira página',
  },
};
