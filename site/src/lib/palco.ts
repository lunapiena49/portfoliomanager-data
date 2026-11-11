/**
 * LO SCRIPT DEI PALCHI. Scrive pochi numeri, e nient'altro.
 *
 * Ogni capitolo con `data-palco` ha una scena fissa. Qui si misura quanto del
 * capitolo e' passato e si scrivono sulla scena le variabili CSS che la
 * muovono; posizioni, rotazioni e opacita' le deriva il foglio di stile.
 *   estratti  --a (i fogli si raccolgono), --p (atterrano nelle righe),
 *             --q (il telefono si chiude), e il totale che si somma;
 *   imbrunire --d (dal giorno alla notte);
 *   torre     --p (la salita), i tre angoli del dado, il suo posto sulla
 *             pista, la luce sulle sue facce e l'etichetta dell'Ascesa.
 *
 * Quattro regole:
 *  1. Con `prefers-reduced-motion` lo script non parte: resta lo stato di
 *     riposo del CSS, che e' la pagina completa.
 *  2. Si legge e si scrive al piu' una volta per fotogramma, e solo mentre un
 *     capitolo e' vicino alla finestra (IntersectionObserver).
 *  3. Il numero mostrato INSEGUE quello dello scorrimento (inerzia): il ciclo
 *     dei fotogrammi gira finche' non l'ha raggiunto, poi si ferma.
 *  4. Le misure che non cambiano con lo scorrimento (lato del dado, lunghezza
 *     della pista) si prendono al ridimensionamento, non a ogni fotogramma.
 *
 * I conti stanno in `palco-conti.mjs`, provati senza browser.
 */
import {
  avanzamento, cifra, insegui, liscia, luciDado, quota, sommaAtterrata, tiri, tratto,
} from './palco-conti.mjs';

interface Capitolo {
  radice: HTMLElement;
  tipo: string;
  scena: HTMLElement;
  vicino: boolean;
  bersaglio: number;
  mostrato: number;
  lato: number;
  pista: number;
  etichetta: HTMLElement | null;
  ultimaQuota: number;
  totale: HTMLElement | null;
  centesimi: number[];
  ultimoTotale: number;
  facce: HTMLElement[];
  luci: number[];
}

const TRATTI_TORRE = 3;
const MAI_VISTO = -1;

function prepara(radice: HTMLElement): Capitolo | null {
  const scena = radice.querySelector<HTMLElement>('[data-scena]');
  if (!scena) return null;
  const centesimi = Array.from(scena.querySelectorAll<HTMLElement>('[data-centesimi]'))
    .map((el) => Number.parseInt(el.dataset.centesimi ?? '', 10))
    .filter((n) => Number.isFinite(n));
  return {
    radice,
    tipo: radice.dataset.palco ?? '',
    scena,
    vicino: false,
    bersaglio: 0,
    mostrato: MAI_VISTO,
    lato: 0,
    pista: 0,
    etichetta: scena.querySelector<HTMLElement>('[data-quota]'),
    ultimaQuota: -1,
    totale: scena.querySelector<HTMLElement>('[data-totale]'),
    centesimi,
    ultimoTotale: -1,
    facce: Array.from(scena.querySelectorAll<HTMLElement>('.faccia')),
    luci: [],
  };
}

function misura(c: Capitolo): void {
  if (c.tipo !== 'torre') return;
  const pista = c.scena.querySelector<HTMLElement>('.dado-pista');
  const carrello = c.scena.querySelector<HTMLElement>('.dado-carrello');
  c.lato = carrello ? carrello.offsetWidth : 0;
  c.pista = pista ? Math.max(0, pista.offsetWidth - c.lato) : 0;
}

/** I numeri del portafoglio nella lingua della pagina, come li scrive la build. */
function formatoImporti(): Intl.NumberFormat {
  const lingua = document.documentElement.lang || 'it';
  const cifre = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  try {
    return new Intl.NumberFormat(lingua, { ...cifre, useGrouping: 'always' } as Intl.NumberFormatOptions);
  } catch {
    return new Intl.NumberFormat(lingua, cifre);
  }
}

function scrivi(c: Capitolo, formato: Intl.NumberFormat): void {
  const p = c.mostrato;
  const stile = c.scena.style;
  if (c.tipo === 'estratti') {
    const riunione = tratto(p, 0.24, 0.62);
    stile.setProperty('--a', cifra(liscia(tratto(p, 0.02, 0.24))));
    stile.setProperty('--p', cifra(riunione));
    stile.setProperty('--q', cifra(liscia(tratto(p, 0.68, 0.92))));
    if (c.totale && c.centesimi.length > 0) {
      const somma = sommaAtterrata(riunione, c.centesimi);
      if (somma !== c.ultimoTotale) {
        c.ultimoTotale = somma;
        // A riunione finita torna il testo della build, identico byte per byte.
        c.totale.textContent = riunione >= 1 ? (c.totale.dataset.totale ?? '') : formato.format(somma / 100);
      }
    }
    return;
  }
  if (c.tipo === 'imbrunire') {
    stile.setProperty('--d', cifra(p));
    return;
  }
  if (c.tipo === 'torre') {
    stile.setProperty('--p', cifra(p));
    const d = tiri(p, c.lato, c.pista);
    stile.setProperty('--r1', `${cifra(d.r1)}deg`);
    stile.setProperty('--r2', `${cifra(d.r2)}deg`);
    stile.setProperty('--r3', `${cifra(d.r3)}deg`);
    stile.setProperty('--dado-x', `${cifra(d.dx)}px`);
    stile.setProperty('--dado-y', `${cifra(d.dy)}px`);
    stile.setProperty('--dado-fondo', cifra(d.fondo));
    // La luce sulle facce: tre toni piatti, riscritti solo quando una faccia cambia tono.
    const luci = luciDado(d.r1, d.r2, d.r3);
    for (let i = 0; i < c.facce.length; i += 1) {
      if (luci[i] !== c.luci[i]) {
        c.luci[i] = luci[i];
        c.facce[i].dataset.luce = String(luci[i]);
      }
    }
    const q = quota(p, TRATTI_TORRE);
    if (c.etichetta && q !== c.ultimaQuota) {
      c.ultimaQuota = q;
      const dati = c.etichetta.dataset;
      c.etichetta.textContent = q === 0 ? (dati.cima ?? '') : `${dati.ascesa ?? ''} ${q}`;
    }
  }
}

function avvia(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const capitoli = Array.from(document.querySelectorAll<HTMLElement>('[data-palco]'))
    .map(prepara)
    .filter((c): c is Capitolo => c !== null);
  if (capitoli.length === 0) return;

  // Da qui in poi le scene sono vive: il foglio di stile lo sa da questa classe
  // (l'imbrunire passa da fascia di colore a scena fissa).
  document.documentElement.classList.add('palchi-vivi');
  const formato = formatoImporti();

  let inAttesa = false;
  let ultimo = 0;
  function fotogramma(ora: number): void {
    inAttesa = false;
    const dt = ultimo > 0 ? Math.min(64, ora - ultimo) : 16;
    ultimo = ora;
    const vista = window.innerHeight;
    const vicini = capitoli.filter((c) => c.vicino);
    // Prima tutte le letture, poi tutte le scritture.
    for (const c of vicini) {
      const r = c.radice.getBoundingClientRect();
      c.bersaglio = avanzamento(r.top, r.height, vista);
    }
    let inMoto = false;
    for (const c of vicini) {
      const prima = c.mostrato;
      c.mostrato = prima === MAI_VISTO ? c.bersaglio : insegui(prima, c.bersaglio, dt);
      if (c.mostrato !== prima) scrivi(c, formato);
      if (c.mostrato !== c.bersaglio) inMoto = true;
    }
    if (inMoto) chiedi();
    else ultimo = 0;
  }
  function chiedi(): void {
    if (inAttesa) return;
    inAttesa = true;
    requestAnimationFrame(fotogramma);
  }

  const osservatore = new IntersectionObserver(
    (voci) => {
      for (const voce of voci) {
        const c = capitoli.find((x) => x.radice === voce.target);
        if (c) c.vicino = voce.isIntersecting;
      }
      chiedi();
    },
    { rootMargin: '50% 0px 50% 0px' },
  );
  for (const c of capitoli) {
    misura(c);
    osservatore.observe(c.radice);
  }

  window.addEventListener('scroll', chiedi, { passive: true });
  window.addEventListener('resize', () => {
    for (const c of capitoli) {
      misura(c);
      // Dopo un ridimensionamento i numeri del dado vanno riscritti anche a scorrimento fermo.
      if (c.vicino && c.mostrato !== MAI_VISTO) scrivi(c, formato);
    }
    chiedi();
  });
}

avvia();
