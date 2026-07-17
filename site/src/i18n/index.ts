export type Locale = 'it' | 'en' | 'es' | 'fr' | 'de' | 'pt';

export const LOCALES: Locale[] = ['it', 'en', 'es', 'fr', 'de', 'pt'];
export const DEFAULT_LOCALE: Locale = 'it';

export interface Translations {
  lang: Locale;
  dir: 'ltr';
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    features: string;
    privacy: string;
    brokers: string;
    faq: string;
    openApp: string;
    notifyLaunch: string;
    langLabel: string;
  };
  hero: {
    h1Line1: string;
    h1Line2: string;
    sub: string;
    ctaPre1: string;
    ctaPre2: string;
    ctaPre3: string;
    ctaLive1: string;
    ctaLive2: string;
    ctaLive3: string;
    trust1: string;
    trust2: string;
    trust3: string;
    comingSoon: string;
    availableOn: string;
  };
  features: {
    eyebrow: string;
    h2: string;
    lede: string;
    card1Title: string;
    card1Body: string;
    card2Title: string;
    card2Body: string;
    card3Title: string;
    card3Body: string;
    card4Title: string;
    card4Body: string;
  };
  brokers: {
    eyebrow: string;
    h2: string;
    lede: string;
    foot: string;
  };
  privacy: {
    eyebrow: string;
    h2: string;
    intro: string;
    b1Title: string;
    b1Body: string;
    b2Title: string;
    b2Body: string;
    b3Title: string;
    b3Body: string;
    b4Title: string;
    b4Body: string;
    techCallout: string;
    cta: string;
  };
  how: {
    eyebrow: string;
    h2: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
  };
  faq: {
    h2: string;
    q1: string; a1: string;
    q2: string; a2: string;
    q3: string; a3: string;
    q4: string; a4: string;
    q5: string; a5: string;
    q6: string; a6: string;
    q7: string; a7: string;
    q8: string; a8: string;
  };
  disclaimer: {
    h3: string;
    body: string;
    cta: string;
  };
  about: {
    eyebrow: string;
    h2: string;
    body: string;
    role: string;
    location: string;
    type: string;
    conflict: string;
  };
  newsletter: {
    h2: string;
    sub: string;
    cta: string;
  };
  modal: {
    title: string;
    sub: string;
    emailLabel: string;
    langLabel: string;
    gdpr: string;
    submit: string;
    success: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    colProduct: string;
    colLegal: string;
    colContact: string;
    linkWebapp: string;
    linkPlayStore: string;
    linkChangelog: string;
    linkPrivacy: string;
    linkTerms: string;
    linkDisclaimer: string;
    linkGdpr: string;
    /** La voce "Contattaci". Prima qui il footer riusava linkGdpr: due voci
     *  diverse, in due colonne diverse, con la stessa etichetta. */
    linkContact: string;
    linkEmail: string;
    linkGithub: string;
    linkAbout: string;
    bundleId: string;
  };
  legal: {
    backHome: string;
  };

  /** La pagina /contact, x6. Prima esisteva SOLO in italiano, mentre il footer
   *  ci linkava da ogni pagina in ogni lingua: /en/contact e gli altri quattro
   *  erano 404 (verificato sul sito live). */
  contact: {
    eyebrow: string;
    h1: string;
    intro: string;
    generalTitle: string;
    gdprTitle: string;
    githubTitle: string;
    pressTitle: string;
  };
  webdemo: {
    eyebrow: string;
    h2: string;
    lede: string;
    demo: {
      title: string;
      subtitle: string;
      limits: string[];
      cta: string;
    };
    android: {
      title: string;
      subtitle: string;
      features: string[];
      cta_pre: string;
      cta_live: string;
      pricing: string;
    };
  };

  /* ==================================================================
   * PLURIFIN, LO STUDIO - la soglia (/), la home aziendale (/home), lo studio.
   *
   * NON e' il Portfolio Manager e NON e' ROLLQUEST: e' il marchio che li
   * contiene. Qui dentro non entrano prezzi, broker, o promesse di download:
   * quelli appartengono alla divisione che li possiede.
   *
   * Le stringhe marcate `html` contengono <b> e <span class="f|g"> e vengono
   * rese con set:html. E' contenuto nostro, scritto qui, non input di nessuno.
   * ================================================================== */
  company: {
    gate: {
      kicker: string;
      /** html */ line1: string;
      /** html */ line2: string;
      /** html */ line3: string;
      enter: string;
      skip: string;
      /** html */ divFinance: string;
      /** html */ divGames: string;
    };
    nav: {
      finance: string;
      games: string;
      studio: string;
    };
    hero: {
      h1a: string;
      /** in corsivo, con il gradiente del marchio */ h1b: string;
      lede: string;
    };
    /** La BANDA Finance della home aziendale: un rimando al Portfolio Manager.
     *  Niente prezzo qui: il prezzo vive in /pricing, che e' la sua sede. */
    financeBand: {
      lab: string;
      h2: string;
      /** html */ lede: string;
      /** html */ fact1: string;
      /** html */ fact2: string;
      /** html */ fact3: string;
      statBrokers: string;
      statLangs: string;
      statServers: string;
      cta: string;
      tickerCap: string;
    };
    /** La BANDA Games: ROLLQUEST. E' IN SVILUPPO: nessuno store, nessun
     *  download, nessuna data. "Entra nel cantiere" e' la verita'. */
    gamesBand: {
      lab: string;
      h2: string;
      /** html */ lede: string;
      /** html */ fact1: string;
      /** html */ fact2: string;
      /** html */ fact3: string;
      cta: string;
      dieHint: string;
      dieAria: string;
      sceneAlt: string;
    };
    studio: {
      h3: string;
      body: string;
      press: string;
      pressKit: string;
    };
  };

  /* ==================================================================
   * ROLLQUEST - la pagina /games. Divisione Games, progetto Unity.
   * In sviluppo: zero scene, zero build, zero store. Il sito non promette
   * una data che non esiste.
   * ================================================================== */
  games: {
    meta: {
      title: string;
      description: string;
    };
    hero: {
      eyebrow: string;
      h1: string;
      /** html */ lede: string;
      status: string;
    };
    pillars: {
      h2: string;
      p1Title: string;
      p1Body: string;
      p2Title: string;
      p2Body: string;
      p3Title: string;
      p3Body: string;
    };
    cast: {
      h2: string;
      lede: string;
      rolloName: string;
      rolloBody: string;
      corvaxName: string;
      corvaxBody: string;
    };
    followUp: {
      h2: string;
      body: string;
      cta: string;
    };
  };
}

export async function getTranslations(locale: Locale): Promise<Translations> {
  switch (locale) {
    case 'en': return (await import('./en')).default;
    case 'es': return (await import('./es')).default;
    case 'fr': return (await import('./fr')).default;
    case 'de': return (await import('./de')).default;
    case 'pt': return (await import('./pt')).default;
    default:   return (await import('./it')).default;
  }
}

/**
 * L'UNICA costruzione di URL del sito. Non riscriverla a mano nei componenti.
 *
 * `astro.config.mjs` ha `build.format: 'file'`: gli URL NON hanno lo slash
 * finale. `/en` e' 200, **`/en/` e' 404** - verificato sul sito live, non
 * dedotto. Navbar, Footer e LegalLayout avevano ognuno la propria copia di
 * questa funzione, e tutte e tre emettevano `${base}/${l}/`: il selettore di
 * lingua mandava in 404 tutte e cinque le lingue non italiane, su ogni pagina
 * del sito.
 *
 * La causa a monte della triplicazione era QUI: `localePath('it')` restituiva
 * la stringa vuota (base vuota + nessun prefisso + nessuna pagina), e un
 * `href=""` punta alla pagina corrente invece che alla home. Non potendo usarla
 * per la home, ognuno si e' scritto la sua - e ha sbagliato. Ora la home
 * italiana torna `/`, e non c'e' piu' motivo di reimplementarla.
 */
export function localePath(locale: Locale, path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const page = path ? `/${path}` : '';
  return `${base}${prefix}${page}` || '/';
}

export const LOCALE_NAMES: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
};
