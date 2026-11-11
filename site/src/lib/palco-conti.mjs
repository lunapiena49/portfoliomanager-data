// I CONTI DEI PALCHI. Funzioni pure, senza DOM: le usa lo script del browser
// (src/lib/palco.ts) e le prova `integrations/giorno-palco.test.mjs`.
//
// Un palco e' una scena fissa accanto a un capitolo che scorre. Lo script
// misura quanto del capitolo e' passato (un numero da 0 a 1) e scrive pochi
// numeri sul palco; tutto il resto, posizioni, rotazioni e opacita', lo
// deriva il CSS. Senza script, o con `prefers-reduced-motion`, il CSS vale gia'
// lo stato di riposo (numeri a 1): la pagina e' completa senza JavaScript.

/** Chiude `v` fra `a` e `b`. Un NaN diventa `a`: mai un numero rotto nel CSS. */
export function stringi(v, a = 0, b = 1) {
  if (Number.isNaN(v)) return a;
  return Math.min(b, Math.max(a, v));
}

/** Curva a S fra 0 e 1: parte piano, arriva piano. */
export function liscia(t) {
  const x = stringi(t);
  return x * x * (3 - 2 * x);
}

/**
 * Quanto di un capitolo e' passato sotto il bordo alto della finestra.
 * `cima` e' la distanza del capitolo dal bordo alto (negativa quando e'
 * gia' salito), `altezza` la sua altezza, `vista` l'altezza della finestra.
 * 0 = il capitolo tocca il bordo alto; 1 = resta in vista la sua ultima schermata.
 */
export function avanzamento(cima, altezza, vista) {
  const corsa = Math.max(1, altezza - vista);
  return stringi(-cima / corsa);
}

/** Il pezzo di avanzamento fra `da` e `a`, riportato a 0..1. */
export function tratto(p, da, a) {
  if (a <= da) return p >= a ? 1 : 0;
  return stringi((p - da) / (a - da));
}

/**
 * Il dado che rotola senza strisciare lungo una pista orizzontale.
 * Fa un quarto di giro ogni `lato` percorso; mentre gira su uno spigolo il
 * centro si alza. A `p = 1` e' fermo su una faccia, sempre.
 * Rende: `rot` in gradi, `dx` e `dy` in pixel (`dy` negativo = verso l'alto).
 */
export function dado(p, lato, pista) {
  const quarti = Math.max(2, Math.floor(pista / Math.max(1, lato)));
  const rot = stringi(p) * quarti * 90;
  const dentro = ((rot % 90) + 90) % 90;
  const rad = ((45 - dentro) * Math.PI) / 180;
  const alzata = (lato / 2) * (Math.SQRT2 * Math.cos(rad) - 1);
  return { quarti, rot, dx: (rot / 90) * lato, dy: -alzata };
}

/**
 * A quale tratto della torre e' arrivata la camera: 1..`tratti`, oppure 0
 * quando e' in cima (ultimo decimo della salita).
 */
export function quota(p, tratti) {
  const x = stringi(p);
  if (x >= 0.9) return 0;
  return Math.min(tratti, 1 + Math.floor((x / 0.9) * tratti));
}

/** Un numero per il CSS: quattro decimali, mai notazione esponenziale. */
export function cifra(v) {
  return (Math.round(stringi(v, -1e6, 1e6) * 10000) / 10000).toString();
}

// ---------------------------------------------------------------------------
// S384, rifinitura della prima pagina: inerzia, fogli che atterrano, tiri del dado.
// ---------------------------------------------------------------------------

/**
 * L'inerzia dei palchi: il numero mostrato insegue quello dello scorrimento
 * con un ritardo morbido (costante di tempo `tau`, in millisecondi), invece
 * di saltargli addosso. Vicino al bersaglio ci si posa sopra: il ciclo dei
 * fotogrammi puo' fermarsi. Un numero rotto o un tempo negativo non muovono.
 */
export function insegui(mostrato, bersaglio, dt, tau = 110) {
  if (Number.isNaN(bersaglio)) return mostrato;
  if (Number.isNaN(mostrato)) return bersaglio;
  const passo = 1 - Math.exp(-Math.max(0, dt) / Math.max(1, tau));
  const v = mostrato + (bersaglio - mostrato) * passo;
  return Math.abs(bersaglio - v) < 0.0005 ? bersaglio : v;
}

/**
 * I fogli atterrano nelle righe del portafoglio uno dopo l'altro. Questi due
 * numeri stanno ANCHE in giorno.css (`--t` di `.foglio`): un test li tiene
 * uguali. Con undici fogli l'ultimo si posa esattamente a p = 1.
 */
export const SCALA_FOGLI = Object.freeze({ k: 2.1, d: 0.11 });

/** Quanto del foglio `i` e' atterrato quando la riunione e' a `p` (0..1). */
export function atterrato(p, i) {
  return stringi(stringi(p) * SCALA_FOGLI.k - i * SCALA_FOGLI.d);
}

/**
 * Il totale che si somma mentre i fogli atterrano, in CENTESIMI interi: a
 * p = 0 vale zero, a p = 1 e' la somma esatta, in mezzo non scende mai.
 */
export function sommaAtterrata(p, centesimi) {
  let somma = 0;
  for (let i = 0; i < centesimi.length; i += 1) {
    somma += Math.round(centesimi[i] * atterrato(p, i));
  }
  return somma;
}

/**
 * Il dado del palco e' un dado vero: le facce opposte sommano sette. Ordine
 * delle facce nel markup e in giorno.css: davanti, destra, dietro, sinistra,
 * sopra, sotto. Da fermo, all'inizio, mostra l'uno in alto.
 */
export const FACCE_DADO = Object.freeze([3, 2, 4, 5, 1, 6]);

/**
 * I tre tiri della salita. Ognuno finisce quando la camera arriva al tratto
 * successivo (le soglie di `quota`: 0.3, 0.6, 0.9), cosi' la faccia in alto e'
 * il numero dell'Ascesa mostrata: 1, poi 2, poi 3, e il sei in cima.
 * `z` = rotola verso destra, `x` = rotola verso il fondo della scena.
 */
export const TIRI = Object.freeze([
  Object.freeze({ da: 0.16, a: 0.3, asse: 'z', quarti: 3 }),
  Object.freeze({ da: 0.52, a: 0.6, asse: 'x', quarti: 1 }),
  Object.freeze({ da: 0.8, a: 0.9, asse: 'z', quarti: 3 }),
]);

/**
 * L'andatura di un tiro, in quarti di giro: parte lanciato, rallenta, passa di
 * poco la faccia d'arrivo dondolando sullo spigolo e torna a posarsi. Agli
 * estremi e' ferma: 0 a t = 0, `quarti` esatti a t = 1.
 */
export function andatura(t, quarti) {
  const x = stringi(t);
  const corsa = 1 - Math.pow(1 - stringi(x / 0.8), 2.2);
  const u = stringi((x - 0.8) / 0.2);
  const dondolo = 0.1 * Math.sin(Math.PI * u) * (1 - u);
  return quarti * corsa + dondolo;
}

/** Di quanto si alza il centro di un cubo di lato `lato` mentre gira su uno spigolo. */
export function alzata(gradi, lato) {
  const dentro = ((gradi % 90) + 90) % 90;
  const rad = ((45 - dentro) * Math.PI) / 180;
  return (lato / 2) * (Math.SQRT2 * Math.cos(rad) - 1);
}

/**
 * Lo stato del dado quando la salita e' a `p`: i tre angoli dei tiri (gradi),
 * lo spostamento lungo la pista (`dx`, pixel), quanto e' andato verso il fondo
 * (`fondo`, 0..1) e l'alzata sullo spigolo (`dy`, pixel, negativa = in alto).
 * Rotola senza strisciare: un quarto di giro ogni `passo` percorso. Se la
 * pista e' piu' corta di sei lati il passo si accorcia: il dado non esce mai.
 */
export function tiri(p, lato, pista) {
  const angoli = TIRI.map((t) => 90 * andatura(tratto(stringi(p), t.da, t.a), t.quarti));
  const largo = Math.max(0, lato);
  const passo = Math.min(largo, Math.max(0, pista) / 6);
  const lungo = (angoli[0] + angoli[2]) / 90;
  const su = angoli.reduce((s, g) => s + alzata(g, largo), 0);
  return {
    r1: angoli[0],
    r2: angoli[1],
    r3: angoli[2],
    dx: Math.min(lungo * passo, Math.max(0, pista)),
    fondo: angoli[1] / 90,
    dy: -su,
  };
}

/**
 * Dove guardano le sei facce (davanti, destra, dietro, sinistra, sopra, sotto)
 * dopo i tre tiri, angoli in gradi. Stesse rotazioni e stesso ordine del CSS:
 * rotateZ(r3) rotateX(r2) rotateZ(r1), assi dello schermo (y verso il basso).
 */
export function normaliDado(r1, r2, r3) {
  const rad = (g) => (g * Math.PI) / 180;
  const rz = (v, g) => {
    const c = Math.cos(rad(g));
    const s = Math.sin(rad(g));
    return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
  };
  const rx = (v, g) => {
    const c = Math.cos(rad(g));
    const s = Math.sin(rad(g));
    return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
  };
  const ferme = [[0, 0, 1], [1, 0, 0], [0, 0, -1], [-1, 0, 0], [0, -1, 0], [0, 1, 0]];
  return ferme.map((n) => rz(rx(rz(n, r1), r2), r3));
}

/**
 * Quale numero mostra in alto un dado con le facce `facce` dopo i tre tiri.
 * Rende 0 se nessuna faccia e' in piano (il dado e' a meta' di un tiro).
 */
export function facciaInAlto(r1, r2, r3, facce = FACCE_DADO) {
  const normali = normaliDado(r1, r2, r3);
  for (let i = 0; i < normali.length; i += 1) {
    if (normali[i][1] < -0.999) return facce[i];
  }
  return 0;
}

/**
 * La luce sulle sei facce, a tre toni piatti come nel gioco: 2 = in piena
 * luce (il tono alto), 1 = di taglio, 0 = in ombra. La lampada sta ferma in
 * alto, un po' davanti: una faccia cambia tono mentre il dado rotola.
 */
export function luciDado(r1, r2, r3) {
  const lampada = [0.2, -0.8, 0.56];
  return normaliDado(r1, r2, r3).map((n) => {
    const l = n[0] * lampada[0] + n[1] * lampada[1] + n[2] * lampada[2];
    if (l > 0.66) return 2;
    return l > 0.3 ? 1 : 0;
  });
}
