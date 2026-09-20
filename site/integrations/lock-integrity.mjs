/**
 * Integrita' di `package-lock.json`: ogni dipendenza DICHIARATA da una voce
 * della lock deve risolvere a un'altra voce della lock.
 *
 * PERCHE' ESISTE (tre volte lo stesso difetto: 2026-07-25, 2026-08-08,
 * 2026-09-19). Quando la lock viene rigenerata su Windows, npm POTA le voci
 * di primo livello `@emnapi/core` e `@emnapi/wasi-threads`: sono peer
 * richiesti da `@napi-rs/wasm-runtime`, che su quella piattaforma non serve.
 * Su Windows `npm ci` resta VERDE. Sul runner Linux della CI no:
 *
 *   npm error Missing: @emnapi/core@1.11.3 from lock file
 *
 * e il deploy del sito si ferma a "Install dependencies" - insieme alla
 * pubblicazione notturna dei dati di mercato, che passa dallo stesso
 * workflow. Le due cure precedenti erano PROCEDURALI ("esegui npm ci prima di
 * pushare", "il set dei pacchetti deve coincidere") e non hanno retto: la
 * prima passa su Windows, la seconda non vale per un bump che cambia il set.
 * Questo controllo e' STATICO: legge il file, quindi da' lo stesso verdetto
 * su ogni piattaforma, prima del commit.
 *
 * LA REGOLA, validata sui dati veri prima di scriverla (lock buona pre-bump:
 * 0; lock curata: 0; lock potata del 2026-09-19: 1, ed e' proprio
 * `@napi-rs/wasm-runtime -> @emnapi/core`). Devono risolvere:
 *   - `dependencies` (e le `devDependencies` della radice);
 *   - `optionalDependencies`: la lock le registra per TUTTE le piattaforme,
 *     ed e' cosi' che un solo file serve Windows e Linux;
 *   - `peerDependencies` NON marcate `optional` in `peerDependenciesMeta`.
 * NON devono risolvere i peer OPZIONALI: sulla lock buona ne mancano 31, ed
 * e' legittimo (nessuno installa i driver Azure di `unstorage`).
 *
 * La risoluzione e' quella di Node: `node_modules` del pacchetto, poi dei
 * suoi antenati, poi la radice. Per questo una copia ANNIDATA altrove non
 * conta: la lock potata aveva `@emnapi/core` sotto
 * `@rolldown/binding-wasm32-wasi/node_modules/`, invisibile da
 * `node_modules/@napi-rs/wasm-runtime`.
 *
 * CIO' CHE NON GUARDA, e va saputo: che la versione trovata SODDISFI il range
 * dichiarato (servirebbe un parser semver, e `npm ci` lo controlla gia'), e
 * che `package.json` e lock siano in pari. Guarda le voci MANCANTI, che e' la
 * forma che si e' ripresentata.
 */

const SEGMENTO = 'node_modules/';

/**
 * I percorsi in cui Node cercherebbe `nome` partendo dalla voce `percorso`,
 * dal piu' vicino alla radice. `percorso` vuoto = la radice del progetto.
 *
 * Presupposto dichiarato: nessun NOME di pacchetto contiene `node_modules/`
 * (npm lo vieta), quindi l'ultima occorrenza nel percorso e' sempre un
 * confine fra pacchetti e mai un pezzo di nome.
 */
export function candidati(percorso, nome) {
  const out = [];
  let p = percorso;
  for (;;) {
    out.push((p ? `${p}/` : '') + SEGMENTO + nome);
    if (!p) return out;
    const i = p.lastIndexOf(SEGMENTO);
    p = i > 0 ? p.slice(0, i - 1) : '';
  }
}

/**
 * Le dipendenze dichiarate e non risolte. Ogni elemento:
 * `{ da, nome, campo, range }`. Una lista vuota e' il verde.
 *
 * Lancia se `lock.packages` manca: una lock senza quella mappa (formato v1) non
 * e' verificabile, e restituire [] la farebbe sembrare sana.
 */
export function dipendenzeNonRisolte(lock) {
  const voci = lock && lock.packages;
  if (!voci || typeof voci !== 'object' || Object.keys(voci).length === 0) {
    throw new Error('lock senza la mappa "packages" (serve lockfileVersion 2 o 3): non verificabile');
  }
  const mancanti = [];
  for (const [percorso, voce] of Object.entries(voci)) {
    const meta = voce.peerDependenciesMeta || {};
    const gruppi = [
      ['dependencies', voce.dependencies || {}],
      ['optionalDependencies', voce.optionalDependencies || {}],
      ['peerDependencies', Object.fromEntries(
        Object.entries(voce.peerDependencies || {})
          .filter(([nome]) => !(meta[nome] && meta[nome].optional === true)),
      )],
    ];
    if (percorso === '') gruppi.push(['devDependencies', voce.devDependencies || {}]);
    for (const [campo, deps] of gruppi) {
      for (const [nome, range] of Object.entries(deps)) {
        const trovata = candidati(percorso, nome).some((c) => Object.hasOwn(voci, c));
        if (!trovata) mancanti.push({ da: percorso || '(radice)', nome, campo, range });
      }
    }
  }
  return mancanti;
}
