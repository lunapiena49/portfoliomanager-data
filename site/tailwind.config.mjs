/** @type {import('tailwindcss').Config} */
// Token PluriFin -- speculari a src/styles/global.css.
// Sorgente canonica: C:\Plurifin\company\BRAND_GUIDELINES.md
//
// I colori del TERRENO (bg/surface/text/divider) sono esposti come
// `var(--token)` e non come hex: cambiano col tema chiaro/scuro, quindi una
// classe Tailwind come `bg-surface` resta corretta in entrambi i temi.
// Gli accenti di DIVISIONE sono hex: non cambiano col tema (per scelta).
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // marchio madre
        ink:            '#0A0E14',
        'ink-2':        '#171B22',
        'ink-3':        '#212733',
        'silver-hi':    '#F2F4F7',
        silver:         '#D5DAE2',
        'silver-lo':    '#B6BDC8',
        mint:           '#26D896',
        'mint-hi':      '#5BFCBE',
        'mint-deep':    '#0B7F5A',
        paper:          '#F8F9FA',

        // divisione Finance
        finance:        '#1E88E5',
        'finance-deep': '#1565C0',
        'finance-soft': '#7FC0F5',
        accent:         '#00BFA5',

        // divisione Games
        ember:          '#FF8A3D',
        'ember-deep':   '#A8431E',
        'ember-soft':   '#FFA867',
        astral:         '#9B6BFF',
        amber:          '#FFC24B',
        'games-outline':'#3A3153',
        'games-cream':  '#FFF6EA',
        'sky-hi':       '#B8E0FF',
        'sky-lo':       '#FFE8C8',

        // semantica mercati
        success:        '#4CAF50',
        warning:        '#FF9800',
        'app-dark':     '#0E1116',
        'app-surf':     '#171B22',
        'app-text':     '#E8ECF1',
        'app-muted':    '#8A93A0',
        'app-green':    '#34D399',
        'app-red':      '#F87171',

        // terreno (theme-aware: passano dai custom properties)
        bg:             'var(--bg)',
        surface:        'var(--surface)',
        'surface-2':    'var(--surface-2)',
        'text-primary': 'var(--text)',
        'text-2':       'var(--text-2)',
        'text-3':       'var(--text-3)',
        divider:        'var(--divider)',
        'divider-soft': 'var(--divider-soft)',
        'warn-bg':      'var(--warn-bg)',
        'warn-border':  'var(--warn-border)',

        // accento di sezione (mint / blu / ember secondo [data-section])
        sec:            'var(--sec)',
        'sec-text':     'var(--sec-text)',
        'sec-ink':      'var(--sec-ink)',

        // legacy: primary segue l'accento di sezione
        primary:        'var(--sec-text)',
        'primary-dark': 'var(--sec-text)',
        'primary-light':'var(--sec)',
        'bg-light':     '#F8F9FA',
      },
      fontFamily: {
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        games: ['Baloo 2', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:  ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        h1:      ['clamp(40px,5.4vw,60px)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        h2:      ['clamp(28px,3.4vw,40px)', { lineHeight: '1.15', letterSpacing: '-0.022em' }],
        h3:      ['20px',  { lineHeight: '1.3',  letterSpacing: '-0.012em' }],
        lead:    ['18px',  { lineHeight: '1.6' }],
        body:    ['17px',  { lineHeight: '1.6' }],
        small:   ['14px',  { lineHeight: '1.5' }],
        caption: ['13px',  { lineHeight: '1.4' }],
        micro:   ['12px',  { lineHeight: '1.4' }],
      },
      borderRadius: {
        sm:  '6px',
        DEFAULT: '10px',
        lg:  '14px',
        xl:  '20px',
        full:'9999px',
      },
      boxShadow: {
        card:    'var(--shadow-card)',
        elev:    'var(--shadow-elev)',
        primary: '0 6px 14px -4px var(--sec-glow)',
      },
      maxWidth: {
        site: '1200px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px',
        '2xl': '64px',
        '3xl': '96px',
      },
    },
  },
  plugins: [],
};
