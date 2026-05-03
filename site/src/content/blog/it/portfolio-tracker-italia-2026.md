---
title: "Come tracciare il tuo portafoglio investimenti in Italia nel 2026"
summary: "Una guida pratica per smettere di tenere posizioni su Excel, scegliere uno strumento privacy-first e capire cosa cercare in un portfolio tracker per il mercato italiano."
publishedAt: 2026-05-02
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: "it"
tags: ["portfolio-tracker", "investimenti", "guida", "italia", "etf", "privacy"]
draft: false
---

Tracciare il proprio portafoglio investimenti suona banale finche' non si
prova a farlo davvero. Multi-broker, valute diverse, ETF accumulating vs
distributing, dividendi reinvestiti, fiscalita' italiana sui capital gain
e sul bollo titoli, magari un ETF americano non armonizzato che ti
costringe a tirare fuori il quadro RW: la cosa scala male su Excel piu'
in fretta di quanto pensi.

Questo articolo nasce dall'esperienza di costruire **Portfolio Manager**
sotto il brand **PluriFin** -- un'app gratuita su Google Play (con un
anno Premium a 0,99 EUR) che ho scritto per togliermi il problema di
dosso. Qui sotto trovi i criteri pratici che uso per scegliere uno
strumento di tracking, validi indipendentemente dall'app che alla fine
adotti.

## 1. La domanda zero: dove vivono i tuoi dati?

Prima di tutto: dove vanno a finire le tue posizioni quando le inserisci?

Le opzioni concrete sono tre:

- **Sui server dell'app** (modello SaaS classico). Comodo per
  multi-device, ma significa fidarsi della loro security: data breach,
  accesso da parte di dipendenti, vincoli legali del paese di hosting,
  pagamento mensile/annuale per restare attivi.
- **Sul tuo dispositivo, in chiaro** (Excel, Numbers, Google Sheets).
  Qualsiasi app che ottiene accesso al file system o all'account Google
  vede tutto.
- **Sul tuo dispositivo, cifrati** (modello local-first). Dati protetti
  da una chiave generata sul tuo device, niente upload, niente account.

PluriFin sta nella terza categoria. Non c'e' un server PluriFin a cui i
tuoi dati vengono mandati: tutto vive nel keystore di sistema (Android
Keystore / iOS Keychain / DPAPI Windows) cifrato AES-256.

Se vuoi capire come un'app fa la cosa giusta su questo fronte, leggi il
campo "Data Safety" su Play Store: quante voci sono "Data not
collected" vs "Data shared with third parties"? Una vera app local-first
ha tutto il primo blocco vuoto.

## 2. Import dai broker: il vero collo di bottiglia

Inserire 80 posizioni a mano e' tedioso e fragile. Ogni broker pubblica
estratti in formato proprio:

- **IBKR**: CSV "Activity Statement" + PDF complesso
- **Schwab / Fidelity / E*TRADE**: CSV con colonne disordinate
- **DEGIRO / Trading 212 / XTB**: CSV europei con virgola decimale
- **Revolut**: CSV con valuta in colonna separata
- **Robinhood / Vanguard**: CSV americano, settlement date diversa da
  trade date
- **TD Ameritrade**: CSV legacy, colonne miste

Un buon portfolio tracker nel 2026 deve riconoscere automaticamente il
formato e mappare i campi senza farti aprire il CSV in Excel per
sistemarlo. PluriFin supporta 12 broker al lancio piu' un parser
generico per CSV custom (vedi `formati_brokers.md` nel repo per la lista
completa). Se non vedi il tuo broker, il parser generico ti permette di
mappare ogni colonna.

Domanda da fare prima di scaricare un'app:

> Posso provare l'import del MIO estratto del MIO broker prima di
> pagare?

Se la risposta e' no, lascia perdere: scoprirai che funziona male
proprio sull'unico broker che ti interessa.

## 3. Privacy delle chiavi API per AI e dati real-time

I migliori tracker oggi integrano:

- Modelli **AI** per analisi del portafoglio (Gemini, Claude, GPT)
- **Prezzi real-time** da provider come EODHD, FMP, Alpha Vantage

Domanda critica: **chi paga la chiamata API e dove va la chiave**?

PluriFin segue il principio "bring your own key" (BYOK):

- La chiave AI / market data e' inserita da te, salvata nel keystore di
  sistema
- Le chiamate vanno **direttamente** dal tuo dispositivo al provider
  (Google Gemini, EODHD, FMP), senza passare da un server PluriFin
- Tu paghi al provider quello che usi (di solito 0 EUR per il free tier)
- PluriFin non sa cosa chiedi all'AI ne' quanto

Il modello "tutto incluso" che ti fa pagare 9 EUR/mese per "AI
unlimited" in genere significa: i tuoi prompt passano per i loro server,
vengono loggati, il margine paga la loro chiave Gemini condivisa.

## 4. Fiscalita' italiana: cosa il tracker NON fara' per te

Spoiler: nessun portfolio tracker italiano (ne' PluriFin) sostituisce un
commercialista per la dichiarazione dei redditi. La normativa cambia
ogni anno e i casi limite sono troppi:

- Capital gain 26% vs 12,5% (titoli di Stato e equiparati)
- Bollo titoli 0,2% annuo
- IVAFE per attivita' detenute all'estero
- Compensazione minusvalenze per 4 anni
- ETF UCITS vs non-UCITS, "armonizzati" vs "non armonizzati"
- Quadro RW per chi ha conti broker esteri
- PIR e fondi pensione con regimi agevolati
- Doppia imposizione USA (W-8BEN)

Quello che un buon tracker DEVE darti per il commercialista:

- Export annuale di tutte le transazioni in CSV
- Plus/minusvalenze raw (prezzo vendita - prezzo medio) * quantita'
- Lista degli strumenti con ISIN e flag UCITS / non-UCITS se nota

Quello che un tracker NON deve farti credere di calcolare:

- Aliquote effettive
- Detrazioni
- Imposte dovute

Se un'app pubblicizza "calcolo automatico dell'imposta sui capital
gain", verifica con cautela: di solito significa "applichiamo il 26% a
tutto" e ignora gli edge case.

## 5. Costi: il modello "una tantum molto basso" funziona

Il pricing di PluriFin e' pensato per togliere l'attrito:

- **Web demo gratuita** per provarla nel browser (max 5 posizioni, no
  import)
- **7 giorni di prova gratuita** sull'app Android, **senza carta
  upfront**
- **0,99 EUR / anno** dopo il trial

Il prezzo cosi' basso non e' marketing: e' che l'app e' local-first, non
ha server, e quindi non ha costi ricorrenti che giustifichino una
subscription da 5-10 EUR/mese. La promessa e' che i primi 1000
abbonati restano a 0,99 EUR/anno per sempre, anche dopo aumenti futuri
per nuovi utenti.

## Cosa fare adesso

Se vuoi provare PluriFin:

1. Apri la **web demo** gratuita (no install): puoi inserire fino a 5
   posizioni manuali e vedere subito come funziona la UI
2. Se ti convince, scarica l'app Android (link in basso quando l'app
   sara' live su Play) e importa il tuo CSV vero
3. Hai 7 giorni gratis, senza carta. Se non ti convince, basta chiudere
   e l'abbonamento non parte

Se vuoi rimanere su Excel ma applicare i criteri qui sopra: bene lo
stesso, l'importante e' che tu sappia dove vivono i tuoi dati e cosa
serve davvero al tuo commercialista.

---

*Articolo informativo. PluriFin non fornisce consulenza finanziaria. Per
decisioni di investimento consulta un consulente abilitato all'Albo OCF
(<https://www.organismocf.it>).*
