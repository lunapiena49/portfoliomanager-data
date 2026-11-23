// IN QUALE REPO GIRANO I TEST DEL SITO (S398, rilievo del code-reviewer).
//
// Il sito vive in due posti: il MODELLO nel repo portfolio_manager
// (scripts/release/repo_split_templates/data/site/, accanto ci sono i .md
// dell'app in assets/legal/) e il repo PUBBLICO portfoliomanager-data (site/,
// accanto ci sono legal/ e dist/legal/, e assets/legal/ non c'e').
// Un confronto che ha bisogno di un file del repo pubblico puo' saltare (SKIP)
// solo nel modello; nel repo pubblico la mancanza e' ROSSA, perche' li' il
// salto spegnerebbe in silenzio la guardia che deve fermare il deploy.
// ASCII-only: questo file e' codice.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/** I .md dell'app: ci sono solo nel repo portfolio_manager. */
export const LEGALI_APP = path.resolve(SITO, '..', '..', '..', '..', '..', 'assets', 'legal');

/** Vero nel repo pubblico (o in qualunque copia del sito senza l'app accanto). */
export function nelRepoPubblico(legaliApp = LEGALI_APP) {
  return !existsSync(legaliApp);
}

/** Manca `cosa`: nel modello il test salta e lo DICE; nel repo pubblico fa rosso. */
export function mancaNelRepo(t, cosa, legaliApp = LEGALI_APP) {
  if (nelRepoPubblico(legaliApp)) {
    assert.fail(`${cosa}: nel repo pubblico non puo' mancare (assets/legal/ assente = repo pubblico), la guardia non si salta`);
  }
  t.skip(`${cosa}: nel modello del repo portfolio_manager, confronto possibile solo nel repo pubblico`);
}
