/**
 * LO SCRIPT DEL PALCO DEL TELEFONO (pagina Finance). Scrive due numeri e
 * sceglie una scheda; tutto il resto lo deriva il foglio di stile.
 *
 *   --u  0..1  gli undici estratti entrano nel telefono, che si gira di fronte
 *   --v  0..1  quanto del capitolo e' passato: il telefono compie un lento giro
 *
 * Le schermate NON sono dello script: sono un gruppo di pulsanti di opzione
 * che funziona da solo, anche senza JavaScript. Lo script si limita a
 * spuntare quella che corrisponde al passo che si sta leggendo, e solo quando
 * cambia: una scelta fatta a mano resta finche' la lettura non passa oltre.
 *
 * Con `prefers-reduced-motion` lo script non parte: resta lo stato di riposo
 * del CSS (estratti dentro, telefono acceso) e le schede si scelgono a mano.
 * Stessa disciplina dello script dei palchi: letture, poi scritture, al piu'
 * una volta per fotogramma, e solo mentre il capitolo e' vicino alla finestra.
 */
import { avanzamento, cifra, liscia } from '../../../lib/palco-conti.mjs';
import { corrente, elenco, gruppo, linea, passato, schermata } from './telefono-conti.mjs';

function avvia(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const radice = document.querySelector<HTMLElement>('[data-telefono]');
  const scena = radice?.querySelector<HTMLElement>('[data-scena-telefono]');
  if (!radice || !scena) return;
  const passi = Array.from(radice.querySelectorAll<HTMLElement>('[data-passo]'));
  const scelte = Array.from(scena.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
  if (passi.length === 0 || scelte.length === 0) return;

  const liste = passi.map((p) => elenco(p.dataset.schermi ?? '', scelte.length));
  const conFogli = passi.map((p) => p.hasAttribute('data-fogli'));
  const primo = conFogli.indexOf(true);
  const ultimo = conFogli.lastIndexOf(true);

  let riga = 0.55;
  let vicino = false;
  let inAttesa = false;
  let spuntata = -1;

  function misura(): void {
    riga = linea(getComputedStyle(scena as HTMLElement).getPropertyValue('--linea'));
  }

  function fotogramma(): void {
    inAttesa = false;
    if (!vicino || !radice || !scena) return;
    // Prima tutte le letture.
    const vista = window.innerHeight;
    const y = vista * riga;
    const capitolo = radice.getBoundingClientRect();
    const rettangoli = passi.map((p) => p.getBoundingClientRect());
    const u = primo < 0 ? 1 : liscia(gruppo(rettangoli[primo].top, rettangoli[ultimo].bottom, y));
    const v = avanzamento(capitolo.top, capitolo.height, vista);
    const i = corrente(rettangoli.map((r) => r.top), y);
    let s = spuntata < 0 ? 0 : spuntata;
    if (i < 0) s = 0;
    else if (liste[i].length > 0) s = schermata(liste[i], passato(rettangoli[i].top, rettangoli[i].height, y));
    else if (conFogli[i]) s = 0;
    // Poi le scritture.
    scena.style.setProperty('--u', cifra(u));
    scena.style.setProperty('--v', cifra(v));
    if (s !== spuntata && scelte[s]) {
      spuntata = s;
      scelte[s].checked = true;
    }
  }

  function chiedi(): void {
    if (inAttesa) return;
    inAttesa = true;
    requestAnimationFrame(fotogramma);
  }

  const osservatore = new IntersectionObserver(
    (voci) => {
      for (const voce of voci) vicino = voce.isIntersecting;
      chiedi();
    },
    { rootMargin: '50% 0px 50% 0px' },
  );
  misura();
  osservatore.observe(radice);
  window.addEventListener('scroll', chiedi, { passive: true });
  window.addEventListener('resize', () => {
    misura();
    chiedi();
  });
}

avvia();
