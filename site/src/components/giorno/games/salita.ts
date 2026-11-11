/**
 * LO SCRIPT DELLA SALITA (pagina Games). Scrive cinque numeri e due parole.
 *
 * Misura quanto della pagina e' passato e a che tappa e' chi legge, e scrive
 * sul palco: `--p` (la camera lungo la torre), `--q` (la quota in segmenti:
 * accende le finestre e le tacche del binario), `--rx`, `--rz`, `--su` (il
 * dado), il tono delle sei facce e l'etichetta dell'Ascesa. Posizioni,
 * rotazioni e opacita' le deriva games.css.
 *
 * Tre regole, le stesse dei palchi della prima pagina:
 *  1. Con `prefers-reduced-motion` lo script non parte: resta lo stato di
 *     riposo del CSS (camera ferma sull'ultima Ascesa mostrata, le sue
 *     finestre accese, dado fermo sul sei).
 *  2. Si legge e si scrive al piu' una volta per fotogramma, e solo mentre la
 *     salita e' vicina alla finestra.
 *  3. Le misure che non cambiano con lo scorrimento si prendono quando cambia
 *     la forma della pagina, non a ogni fotogramma.
 *
 * I conti stanno in `salita-conti.mjs`, provati senza browser.
 */
import { ASCESE, ascesa, avanzamento, cifra, dadoAllaTappa, quotaBassa, tappa, toni } from './salita-conti.mjs';

/** La riga di lettura, in frazione della finestra: a colonne affiancate e a palco sopra il testo. */
const LINEA_LARGA = 0.45;
const LINEA_STRETTA = 0.72;

function avvia(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const radice = document.querySelector<HTMLElement>('[data-salita]');
  if (!radice) return;
  const palco = radice.querySelector<HTMLElement>('[data-scena-salita]');
  if (!palco) return;
  const fusto = palco.querySelector<HTMLElement>('.fusto');
  const tratto = palco.querySelector<HTMLElement>('.tratto');
  const etichetta = palco.querySelector<HTMLElement>('[data-quota]');
  const lati = Array.from(palco.querySelectorAll<HTMLElement>('.lato'));
  const tappe = Array.from(radice.querySelectorAll<HTMLElement>('[data-tappa]'));
  if (!fusto || !tratto || tappe.length === 0) return;

  const stretto = window.matchMedia('(max-width: 860px)');
  let altaTorre = 0;
  let altoPalco = 0;
  let altoTratto = 0;
  let scarti: number[] = [];
  let ultimaAscesa = -1;
  let ultimiToni = '';
  let vicino = true;
  let inAttesa = false;

  function misura(): void {
    altaTorre = fusto!.offsetHeight;
    altoPalco = palco!.clientHeight;
    altoTratto = tratto!.offsetHeight;
    const cima = radice!.getBoundingClientRect().top;
    scarti = tappe.map((t) => t.getBoundingClientRect().top - cima);
  }

  function fotogramma(): void {
    inAttesa = false;
    if (!vicino) return;
    // Prima le letture, poi le scritture.
    const r = radice!.getBoundingClientRect();
    const vista = window.innerHeight;
    const p = avanzamento(r.top, r.height, vista);
    const q = quotaBassa(p, altaTorre, altoPalco, altoTratto);
    const linea = vista * (stretto.matches ? LINEA_STRETTA : LINEA_LARGA);
    const d = dadoAllaTappa(tappa(scarti.map((s) => r.top + s), linea));
    const n = ascesa(q, altoPalco, altoTratto, ASCESE);
    const t = toni(d.rx, d.rz);

    const stile = palco!.style;
    stile.setProperty('--p', cifra(p));
    stile.setProperty('--q', cifra(q));
    stile.setProperty('--rx', `${cifra(d.rx)}deg`);
    stile.setProperty('--rz', `${cifra(d.rz)}deg`);
    stile.setProperty('--su', cifra(d.su));
    const chiave = t.join(' ');
    if (chiave !== ultimiToni) {
      ultimiToni = chiave;
      lati.forEach((lato, i) => { lato.dataset.tono = t[i]; });
    }
    if (etichetta && n !== ultimaAscesa) {
      ultimaAscesa = n;
      const dati = etichetta.dataset;
      etichetta.textContent = n === 0 ? (dati.cima ?? '') : `${dati.ascesa ?? ''} ${n}`;
    }
  }

  function chiedi(): void {
    if (inAttesa) return;
    inAttesa = true;
    requestAnimationFrame(fotogramma);
  }
  function rimisura(): void {
    misura();
    chiedi();
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (voci) => {
        for (const voce of voci) vicino = voce.isIntersecting;
        chiedi();
      },
      { rootMargin: '50% 0px 50% 0px' },
    ).observe(radice);
  }
  // Font e immagini che arrivano dopo cambiano le altezze delle tappe.
  if ('ResizeObserver' in window) new ResizeObserver(rimisura).observe(radice);
  window.addEventListener('scroll', chiedi, { passive: true });
  window.addEventListener('resize', rimisura);
  window.addEventListener('load', rimisura);

  misura();
  palco.dataset.viva = '';
  fotogramma();
}

avvia();
