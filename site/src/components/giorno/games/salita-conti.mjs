// I CONTI DELLA SALITA (pagina Games). Funzioni pure, senza DOM: le usa lo
// script del browser (salita.ts), le usa Dado.astro in build per lo stato di
// riposo, e le prova `integrations/games.test.mjs`.
//
// La pagina e' una salita in sette tappe: l'apertura e sei capitoli. A ogni
// capitolo il dado si ferma su una faccia: 1 al primo, 6 all'ultimo. Fra una
// tappa e l'altra salta e rotola. Senza script (o con movimento ridotto) vale
// lo stato di riposo (RIPOSO, in fondo): camera ferma sull'ultima Ascesa
// mostrata, le sue finestre accese, dado fermo sul 6.
//
// Il modulo non importa nulla: i quattro conti di base sono ripetuti qui
// perche' la pagina di Games non dipenda dai palchi della prima pagina.

/** Quante Ascese ha la Torre: dodici tratti, dodici tacche. */
export const ASCESE = 12;

/**
 * Quante Ascese la pagina mostra col loro fregio, dal basso: le prime di fila
 * gia' in gioco (decisione dell'utente "Solo le prime", S384). Le altre sono
 * una sagoma scura, senza immagine propria. Il numero e' quello che
 * `strumenti/torre.mjs` ricava dal suo elenco IN_GIOCO: lo lega il test.
 */
export const MOSTRATE = 8;

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
 * Quanto della salita e' passato sotto il bordo alto della finestra: 0 quando
 * la sezione tocca il bordo alto, 1 quando ne resta in vista l'ultima schermata.
 */
export function avanzamento(cima, altezza, vista) {
  const corsa = Math.max(1, altezza - vista);
  return stringi(-cima / corsa);
}

/** Un numero per il CSS: quattro decimali, mai notazione esponenziale. */
export function cifra(v) {
  return (Math.round(stringi(v, -1e6, 1e6) * 10000) / 10000).toString();
}

/** Quanta parte di una tappa il dado resta fermo prima di ripartire. */
export const SOSTA = 0.6;

/** La vista del dado: rotateX(VISTA.x) rotateY(VISTA.y), in gradi. La stessa
 *  coppia sta in games.css (`.cubo`): lo verifica il test. */
export const VISTA = { x: -34, y: 32 };

/**
 * Le facce del cubo nell'ordine del DOM, con la normale nello spazio del cubo
 * (assi del CSS: x a destra, y in basso, z verso chi guarda) e il numero.
 * Un dado vero: le facce opposte sommano sette.
 */
export const FACCE = [
  { nome: 'davanti', n: [0, 0, 1], punti: 1 },
  { nome: 'destra', n: [1, 0, 0], punti: 2 },
  { nome: 'dietro', n: [0, 0, -1], punti: 6 },
  { nome: 'sinistra', n: [-1, 0, 0], punti: 5 },
  { nome: 'sopra', n: [0, -1, 0], punti: 3 },
  { nome: 'sotto', n: [0, 1, 0], punti: 4 },
];

/**
 * Le fermate del dado: rotazioni CUMULATIVE in gradi (`rotateX(rx) rotateZ(rz)`).
 * La fermata 0 e' l'apertura: dado in bilico, non ancora tirato. La fermata k
 * (1..6) ha in alto la faccia con k punti. I giri interi in piu' fra una
 * fermata e la successiva sono il rotolamento.
 */
export const FERMATE = [
  { rx: 45, rz: 35 },
  { rx: 450, rz: 0 },
  { rx: 720, rz: -90 },
  { rx: 1080, rz: 0 },
  { rx: 1620, rz: 0 },
  { rx: 2160, rz: 90 },
  { rx: 2430, rz: 0 },
];

const RAD = Math.PI / 180;

/** rotateX del CSS applicata a un vettore. */
function ruotaX(v, gradi) {
  const c = Math.cos(gradi * RAD), s = Math.sin(gradi * RAD);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}
/** rotateY del CSS applicata a un vettore. */
function ruotaY(v, gradi) {
  const c = Math.cos(gradi * RAD), s = Math.sin(gradi * RAD);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}
/** rotateZ del CSS applicata a un vettore. */
function ruotaZ(v, gradi) {
  const c = Math.cos(gradi * RAD), s = Math.sin(gradi * RAD);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
}

/** La normale di una faccia dopo `rotateX(rx) rotateZ(rz)`: prima Z, poi X. */
export function normale(n, rx, rz) {
  return ruotaX(ruotaZ(n, rz), rx);
}

/**
 * Quale faccia guarda in alto. Rende i suoi punti e quanto e' dritta
 * (`dritta` = 1 quando la faccia e' orizzontale: il dado e' fermo su un lato).
 */
export function facciaInAlto(rx, rz) {
  let migliore = { punti: 0, dritta: -2 };
  for (const f of FACCE) {
    const su = -normale(f.n, rx, rz)[1];
    if (su > migliore.dritta) migliore = { punti: f.punti, dritta: su };
  }
  return migliore;
}

/** La luce della scena: dall'alto, un po' da destra e da davanti. */
const LUCE = (() => {
  const v = [0.35, -0.8, 0.5];
  const m = Math.hypot(...v);
  return v.map((x) => x / m);
})();

/**
 * Il tono di ogni faccia, nell'ordine del DOM: tre toni piatti, come nel
 * disegno del gioco. `alto` per la faccia che prende la luce, `medio` per
 * quella di fianco, `ombra` per le altre. La luce e' ferma nella scena: ruota
 * il dado, non lei.
 */
export function toni(rx, rz) {
  return FACCE.map((f) => {
    const n = normale(f.n, rx, rz);
    const b = n[0] * LUCE[0] + n[1] * LUCE[1] + n[2] * LUCE[2];
    if (b >= 0.65) return 'alto';
    if (b >= 0.2) return 'medio';
    return 'ombra';
  });
}

/** Quanto una faccia e' rivolta a chi guarda (z dopo cubo e vista): > 0 = si vede. */
export function versoChiGuarda(n, rx, rz) {
  return ruotaX(ruotaY(normale(n, rx, rz), VISTA.y), VISTA.x)[2];
}

/**
 * A che tappa e' il lettore, come numero con la virgola: 2,5 = a meta' fra la
 * tappa 2 e la 3. `cime` sono le cime delle tappe in ordine (stesse unita' di
 * `linea`); `linea` e' la riga di lettura. Prima della prima tappa rende 0,
 * dall'ultima in poi rende l'indice dell'ultima.
 */
export function tappa(cime, linea) {
  const n = cime.length;
  if (n === 0 || Number.isNaN(linea)) return 0;
  if (linea <= cime[0]) return 0;
  for (let i = 0; i < n - 1; i++) {
    if (linea < cime[i + 1]) {
      const lunga = Math.max(1, cime[i + 1] - cime[i]);
      return i + stringi((linea - cime[i]) / lunga);
    }
  }
  return n - 1;
}

/**
 * Il dado alla tappa `s` (numero con la virgola, 0..6). Sta fermo sulla sua
 * faccia per la prima parte della tappa (SOSTA), poi salta e rotola fino alla
 * fermata successiva. Rende le rotazioni in gradi e `su`: quanto e' alzato
 * da terra, in lati del dado (0 = appoggiato).
 */
export function dadoAllaTappa(s) {
  const ultima = FERMATE.length - 1;
  const x = stringi(s, 0, ultima);
  const k = Math.min(ultima - 1, Math.floor(x));
  const f = x - k;
  const u = f <= SOSTA ? 0 : liscia((f - SOSTA) / (1 - SOSTA));
  const da = FERMATE[k], a = FERMATE[k + 1];
  const bilico = k === 0 ? 0.3 * (1 - u) : 0;
  return {
    rx: da.rx + (a.rx - da.rx) * u,
    rz: da.rz + (a.rz - da.rz) * u,
    su: Math.sin(Math.PI * u) * 0.9 + bilico,
    fermo: u === 0 || u === 1,
  };
}

/**
 * Sotto il primo segmento la torre continua: le nubi e il moncone della base,
 * sospesa nel cielo. La camera parte da li'. `BASE` e' quanta strada c'e'
 * sotto il primo segmento, in frazione dell'altezza della torre (cima e dodici
 * segmenti): la stessa frazione sta in games.css (`.fusto`, 103.6%).
 */
export const BASE = 0.036;

/**
 * Di quanti segmenti il bordo basso del palco e' salito sopra il piede del
 * primo segmento: negativo finche' si guarda la base. `p` e' l'avanzamento
 * della pagina (0..1), `torre` l'altezza della torre senza la base, `palco`
 * quella del palco, `segmento` quella di un segmento.
 */
export function quotaBassa(p, torre, palco, segmento) {
  if (!(segmento > 0)) return 0;
  const corsa = Math.max(0, torre * (1 + BASE) - palco);
  return (stringi(p) * corsa - torre * BASE) / segmento;
}

/**
 * Da quale quota (in segmenti) si accende il segmento `i` (1 = il piu' basso).
 * Il primo si accende appena si comincia a salire; gli altri quando la camera
 * li ha quasi al centro. La stessa regola sta in games.css, per posizione.
 */
export function soglia(i) {
  return Math.max(0.04, i - 1.55);
}

/** Quanto e' acceso il segmento `i` alla quota `q`: 0..1. */
export function accensione(q, i) {
  return stringi((q - soglia(i)) * 4);
}

/**
 * Che cosa scrive l'etichetta: il numero dell'Ascesa al centro del palco
 * (1..`tratti`), oppure 0 quando al centro c'e' la cima.
 */
export function ascesa(q, palco, segmento, tratti) {
  if (!(segmento > 0)) return 0;
  const centro = q + palco / (2 * segmento);
  if (centro > tratti + 0.15) return 0;
  return Math.min(tratti, Math.max(1, Math.ceil(centro)));
}

/**
 * LO STATO DI RIPOSO: quello che si vede senza script o con movimento
 * ridotto, quando la camera non si muove. La camera sta ferma sull'ultima
 * Ascesa mostrata, con le sue finestre accese e, sopra, l'attacco della
 * sagoma scura: un fotogramma solo che dice fin dove la Torre si lascia
 * vedere. (In cima ci sarebbe solo la sagoma.)
 *
 *  - `centro`: la quota al centro del palco, in segmenti dal piede del primo:
 *    un quarto di segmento sotto la cima dell'ultima Ascesa mostrata;
 *  - `fusto`: di quanto il fusto sale sopra la mezzeria del palco, in
 *    percento della propria altezza (la cima e i tratti sono alti uguali: lo
 *    verifica il test sul registro). Non dipende dalla finestra: games.css lo
 *    usa cosi' com'e' (`--camera`);
 *  - `q`: la quota del bordo basso del palco che accende le finestre e le
 *    tacche fino all'ultima mostrata e nessuna oltre. Il palco e' alto fra
 *    1,0 e 1,3 segmenti secondo la larghezza: 0,64 e' meta' del piu' alto, e
 *    la quota regge anche al piu' basso (lo prova il test);
 *  - `p`: l'avanzamento per gli strati che seguono `--p` (nubi, lume del
 *    binario). Il binario mette la tacca dell'Ascesa k a (k - 1) dodicesimi
 *    della sua corsa (la prima in fondo, la cima a 1): a riposo il lume sta
 *    ESATTAMENTE sulla tacca dell'ultima Ascesa mostrata. E' vicino
 *    all'avanzamento che la pagina viva ha a quella quota (0,60-0,62);
 *  - `cielo`: l'avanzamento del solo cielo lontano. A `p` la luna starebbe a
 *    filo del bordo alto del palco, tagliata: nella pagina viva e' un
 *    fotogramma di passaggio, a riposo e' l'unico. Un dodicesimo piu' su la
 *    luna sta tutta dentro (misurato sugli scatti a 360, 1440 e 2560 px).
 */
export const RIPOSO = (() => {
  const centro = MOSTRATE - 0.25;
  const p = (MOSTRATE - 1) / ASCESE;
  return {
    centro,
    fusto: ((ASCESE + 1 - centro) / (ASCESE + 1)) * 100,
    q: centro - 0.64,
    p,
    cielo: p + 1 / ASCESE,
    ascesa: MOSTRATE,
  };
})();
