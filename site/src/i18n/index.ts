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
    linkEmail: string;
    linkGithub: string;
    linkAbout: string;
    bundleId: string;
  };
  legal: {
    backHome: string;
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

export function localePath(locale: Locale, path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const page = path ? `/${path}` : '';
  return `${base}${prefix}${page}`;
}

export const LOCALE_NAMES: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
  es: 'Espanol',
  fr: 'Francais',
  de: 'Deutsch',
  pt: 'Portugues',
};
