# Privacy Policy -- Portfolio Manager by PluriFin

**Versione**: 1.0.0
**Ultimo aggiornamento**: 2026-05-02
**Lingua originale**: Italiano (versione di riferimento per il foro competente)
**Hash testo (per audit trail)**: SHA-256 generato dallo script `scripts/legal/build_legal_html.ps1`

---

## 1. Titolare del trattamento

Il titolare del trattamento dei dati personali e':

- **Nome**: Filippo Salemi
- **Forma giuridica**: persona fisica (sviluppatore indipendente)
- **Brand commerciale**: PluriFin
- **Paese**: Italia
- **Email per richieste GDPR e privacy**: `plurifin.app+gdpr@gmail.com`
- **Email contatto generale**: `plurifin.app@gmail.com`

Non e' designato un Data Protection Officer (DPO) in quanto il titolare e' una
persona fisica e l'attivita' non rientra fra i casi obbligatori previsti dall'art.
37 del Regolamento (UE) 2016/679 (GDPR).

## 2. Sintesi (TL;DR)

- Tutti i dati di portafoglio (posizioni, transazioni, obiettivi, impostazioni)
  sono **memorizzati esclusivamente sul dispositivo dell'utente** in formato
  cifrato. Non li riceviamo, non li archiviamo, non li trasmettiamo a server di
  PluriFin.
- L'app **non utilizza analytics di terze parti** (no Google Analytics, no
  Firebase, no Facebook SDK, no AppsFlyer, no Sentry by default).
- L'app **non condivide dati con inserzionisti**. Non e' presente pubblicita'.
- Sono presenti **funzionalita' opzionali** che, se attivate dall'utente,
  comportano la trasmissione di dati a fornitori terzi (sub-processor): AI
  Gemini, prezzi di mercato live (EODHD/FMP), validazione abbonamento
  (Cloudflare Worker). Ognuna richiede un'azione esplicita dell'utente per
  essere attivata.
- L'utente puo' esportare e cancellare tutti i dati in qualsiasi momento dalle
  Impostazioni dell'app, senza dover contattare il titolare.

## 3. Tipologie di dati trattati

### 3.1 Dati raccolti localmente sul dispositivo

I seguenti dati restano **esclusivamente** in cifratura locale (Hive AES-256
con chiave custodita nel keystore del sistema operativo):

| Categoria | Esempi | Base giuridica | Conservazione |
|---|---|---|---|
| Dati di portafoglio | nome posizione, ticker, quantita', prezzo medio, broker, data acquisto | art. 6.1.b GDPR (esecuzione contratto utente) | Finche' l'utente non li cancella |
| Obiettivi finanziari | titolo, importo target, scadenza, contributi mensili | art. 6.1.b GDPR | Finche' l'utente non li cancella |
| Preferenze | lingua, valuta, tema, notifiche, modalita' demo | art. 6.1.b GDPR | Finche' l'utente non disinstalla |
| Audit trail consensi | timestamp, versione documento, decisione (accept/decline), hash testo | art. 6.1.c GDPR (obbligo legale prova del consenso) | Finche' l'utente non li cancella o disinstalla |
| Chiavi API utente | chiavi dei provider attivati: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (inserite manualmente dall'utente) | art. 6.1.b GDPR | Finche' l'utente non le rimuove |

Tutte queste informazioni sono cifrate con AES-256 + HMAC-SHA256, chiave a 32
byte custodita nel keystore di sistema (Android Keystore su Android, Keychain
su iOS, DPAPI su Windows). Le chiavi API sono salvate in `flutter_secure_storage`,
che usa lo stesso keystore di sistema.

### 3.2 Dati raccolti tramite Play Store (Google)

L'installazione, l'aggiornamento, la valutazione e l'eventuale acquisto
dell'abbonamento avvengono tramite Google Play Store. PluriFin riceve da Google
solo i dati strettamente necessari alla validazione dell'abbonamento:

| Dato | Origine | Finalita' |
|---|---|---|
| `purchaseToken` (token di acquisto) | Google Play Billing | Validazione abbonamento via Cloudflare Worker |
| `productId` | Google Play Billing | Identificazione del prodotto acquistato (`pluri_premium_yearly_099`) |
| `device_id_hash` (HMAC-SHA256 di Android ID + salt server) | Calcolato sul dispositivo | Identificazione anonima del dispositivo per gestione del trial 7 giorni |

PluriFin **non** riceve da Google: nome, email, indirizzo, dati pagamento,
numero carta. Il pagamento e' gestito interamente da Google Play.

### 3.3 Dati raccolti per la validazione dell'abbonamento (Cloudflare Worker)

Quando l'utente avvia il trial gratuito o effettua un acquisto, l'app invia al
Cloudflare Worker i seguenti dati:

- `device_id_hash` (HMAC-SHA256 del Android ID con salt server-side, non
  reversibile lato client)
- `purchase_token` + `product_id` (solo in caso di acquisto)
- `JWT` firmato (per richieste di stato successive)

Il Worker risponde con un JWT firmato Ed25519 (entitlement). Nessun PII e' mai
trasmesso. Il `device_id_hash` non e' un identificativo personale: due dispositivi
diversi dello stesso utente hanno hash diversi e non sono collegabili senza il
salt server.

### 3.4 Dati che Claude AI / Gemini riceve (solo se l'utente attiva la feature)

Se l'utente:
1. inserisce manualmente la propria API key Gemini in Impostazioni;
2. apre la chat AI o richiede un'analisi del portafoglio;

allora il **prompt** (composto da: domanda utente + struttura portafoglio in
forma anonima -- ticker, quantita', prezzo medio, allocazione percentuale)
viene trasmesso direttamente da app a Google Gemini.

PluriFin non intermedia ne' archivia questi prompt. La trasmissione avviene
end-to-end fra il dispositivo utente e l'API Gemini di Google. Si applicano le
condizioni d'uso e la privacy policy di Google AI Studio /
[Google Gemini API Terms](https://ai.google.dev/terms).

L'utente puo' revocare la chiave in qualsiasi momento dalle Impostazioni; da
quel momento nessuna richiesta AI viene piu' inviata.

### 3.5 Dati che i provider di mercato ricevono (solo se l'utente attiva la feature)

L'app supporta 10 provider di dati di mercato che l'utente puo' configurare
indipendentemente inserendo la propria API key in Impostazioni. Quando l'utente
richiede un aggiornamento prezzi (manuale o periodico), l'app trasmette i ticker
richiesti direttamente al provider scelto. PluriFin non intermedia ne' archivia.

Provider supportati e relative privacy policy:

- [EODHD Privacy Policy](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP) Privacy Policy](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage Privacy Policy](https://www.alphavantage.co/privacy/)
- [Twelve Data Privacy Policy](https://twelvedata.com/privacy)
- [Finnhub Privacy Policy](https://finnhub.io/privacy-policy)
- [Polygon.io Privacy Policy](https://polygon.io/privacy)
- [Marketstack Privacy Policy](https://marketstack.com/privacy)
- [Tiingo Privacy Policy](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link Privacy Policy](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): download CSV pubblico senza API key (la richiesta
  HTTP avviene direttamente dal dispositivo utente verso stooq.com)

Per ciascun provider, l'invio dati avviene **solo** se l'utente ha:
1. inserito manualmente la propria API key in Impostazioni (Stooq escluso, e' free);
2. selezionato il provider come attivo per il refresh prezzi.

L'utente puo' rimuovere la chiave o disattivare il provider in qualsiasi momento.

## 4. Sub-processor

L'elenco completo dei sub-processor a cui l'app puo' trasmettere dati (solo se
l'utente attiva le feature corrispondenti) e':

| Sub-processor | Finalita' | Dati trasmessi | Quando |
|---|---|---|---|
| **Google LLC** -- Play Billing | Pagamento e gestione abbonamento | `purchaseToken`, `productId`, dati di pagamento (gestiti da Google, non da PluriFin) | Solo se utente acquista subscription |
| **Google LLC** -- Gemini API | Analisi AI del portafoglio | Prompt utente + struttura portafoglio anonima | Solo se utente inserisce chiave Gemini ed apre AI |
| **EODHD** | Prezzi di mercato real-time e storici | Lista ticker | Solo se utente inserisce chiave EODHD e seleziona il provider |
| **Financial Modeling Prep (FMP)** | Prezzi di mercato real-time, fondamentali | Lista ticker | Solo se utente inserisce chiave FMP e seleziona il provider |
| **Alpha Vantage** | Prezzi di mercato storici | Lista ticker | Solo se utente inserisce chiave Alpha Vantage e seleziona il provider |
| **Twelve Data** | Prezzi di mercato real-time e storici | Lista ticker | Solo se utente inserisce chiave Twelve Data e seleziona il provider |
| **Finnhub** | Prezzi di mercato real-time | Lista ticker | Solo se utente inserisce chiave Finnhub e seleziona il provider |
| **Polygon.io** | Prezzi di mercato storici | Lista ticker | Solo se utente inserisce chiave Polygon.io e seleziona il provider |
| **Marketstack** | Prezzi di mercato end-of-day | Lista ticker | Solo se utente inserisce chiave Marketstack e seleziona il provider |
| **Tiingo** | Prezzi di mercato real-time e storici | Lista ticker | Solo se utente inserisce chiave Tiingo e seleziona il provider |
| **Nasdaq Data Link** | Prezzi di mercato storici | Lista ticker | Solo se utente inserisce chiave Nasdaq Data Link e seleziona il provider |
| **Stooq** | Download CSV pubblico prezzi storici | Lista ticker (no API key, richiesta HTTP pubblica) | Solo se utente seleziona Stooq come provider |
| **Cloudflare, Inc.** -- Worker | Validazione trial e subscription | `device_id_hash`, `purchase_token`, `productId`, JWT | Sempre (necessario per gating subscription) |
| **Microsoft GitHub** -- Pages | Hosting documenti legali, market data pubblici, webapp demo, vetrina | Indirizzo IP utente al momento della richiesta HTTP (log server Microsoft) | Sempre, ogni volta che l'utente apre la webapp o un documento legale |

Cloudflare e GitHub Pages possono raccogliere log tecnici di accesso (IP,
user-agent, timestamp) come da loro standard. Vedi:

- [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/)
- [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)

Nessun dato finanziario dell'utente e' mai trasmesso a Cloudflare o GitHub
oltre a quanto strettamente necessario al rispettivo servizio.

## 5. Trasferimenti extra-UE

Google (Gemini, Play Billing), Cloudflare e GitHub sono societa' statunitensi.
I trasferimenti dati avvengono sotto:

- Standard Contractual Clauses (SCC) UE 2021/914 dove applicabili
- Data Privacy Framework UE-USA per Google (vedi
  [registrazione Google al DPF](https://www.dataprivacyframework.gov/list))
- Per EODHD e FMP: si applicano le rispettive policy di trasferimento

L'utente che non desidera trasferimenti extra-UE puo' semplicemente non attivare
le feature opzionali (AI Gemini, prezzi real-time): l'app funziona pienamente
in modalita' locale senza alcun trasferimento.

## 6. Diritti dell'interessato (artt. 15-22 GDPR)

L'utente ha diritto di:

| Diritto | Come esercitarlo |
|---|---|
| **Accesso** ai dati personali | Direttamente in app: Impostazioni > Privacy > Esporta i miei dati (ZIP con portafoglio + consensi + log) |
| **Rettifica** dei dati inesatti | Modifica diretta in app (modifica posizione/obiettivo/impostazione) |
| **Cancellazione** ("diritto all'oblio") | Impostazioni > Privacy > Cancella tutti i dati (irrevocabile) o disinstallazione app |
| **Limitazione** del trattamento | Disattivazione feature opzionali (AI, prezzi live, subscription) |
| **Portabilita'** | Impostazioni > Privacy > Esporta i miei dati (formato JSON + CSV in ZIP) |
| **Opposizione** | Disattivazione feature opzionali (AI, prezzi live) |
| **Reclamo** all'autorita' di controllo | [Garante per la protezione dei dati personali](https://www.garanteprivacy.it/) (Italia) o autorita' nazionale del paese di residenza |

Per richieste che non sono gestibili autonomamente in app (es. revoca del
consenso al trattamento di dati gia' trasmessi a un sub-processor):

- Email: `plurifin.app+gdpr@gmail.com`
- Tempo di risposta: entro 30 giorni dalla ricezione (art. 12.3 GDPR)
- Formato risposta: lingua della richiesta

Trattandosi di app local-first, la maggior parte delle richieste e' soddisfacibile
istantaneamente dall'utente stesso senza dover contattare il titolare.

## 7. Conservazione dei dati

I dati locali sul dispositivo restano fino a quando l'utente:

1. Cancella manualmente la singola voce (posizione, obiettivo, ecc.)
2. Esegue "Cancella tutti i dati" da Impostazioni
3. Disinstalla l'app

L'audit trail dei consensi (`consent_box`) ha conservazione separata: viene
mantenuto finche' l'utente non lo esporta e cancella esplicitamente. Questo
serve a fornire prova del consenso ai sensi dell'art. 7.1 GDPR.

I dati lato sub-processor sono soggetti alle policy di conservazione di ciascun
provider:

- Cloudflare Worker: `device_id_hash` per la durata del trial (8 giorni) +
  entitlement attivo + grace period (3 giorni) + account hold (7 giorni) =
  durata massima 1 anno + ~ 3 settimane
- Google Play Billing: vedi termini Google
- Gemini, EODHD, FMP: nessuna conservazione lato PluriFin (richieste
  passthrough)

## 8. Sicurezza

Misure tecniche e organizzative adottate:

- Storage locale: Hive AES-256 + HMAC-SHA256, chiave a 32 byte nel keystore di
  sistema
- Chiavi API utente: `flutter_secure_storage` (Android Keystore / iOS Keychain
  / DPAPI)
- Comunicazioni di rete: solo HTTPS (TLS 1.2+), `cleartextTrafficPermitted=false`
  in Network Security Config Android, `NSAppTransportSecurity` strict iOS
- Anti-screenshot: `FLAG_SECURE` Android su pagine sensibili (home, dettaglio
  posizione, AI chat, ribilanciamento)
- Anti-backup: `android:allowBackup="false"` per evitare l'inclusione dei dati
  cifrati nei backup automatici Google Drive
- Anti-tamper: detection root/jailbreak con degrade graceful
- Codice: obfuscation Dart attiva su tutte le release (`--obfuscate
  --split-debug-info`)
- Nessun log persistente di dati personali ne' in console ne' su file
- Nessuna telemetria di crash by default (Sentry disattivato in v1.0)

## 9. Minori (art. 8 GDPR)

L'app non e' destinata a minori di 18 anni. Il content rating dichiarato a
Google Play e' "18+" come consigliato per app finanziarie. PluriFin non
raccoglie consapevolmente dati di minori. Se un genitore o tutore individua
un account di un minore, puo' richiederne la cancellazione scrivendo a
`plurifin.app+gdpr@gmail.com`.

## 10. Cookie e tecnologie simili

L'app mobile **non** utilizza cookie (non e' un browser).

La **webapp demo** (`lunapiena49.github.io/portfoliomanager-data/app/`) utilizza:

- `localStorage` (HTML5) per persistere le 5 posizioni demo locali. Nessun
  cookie e' impostato dall'app.
- Un cookie tecnico imposto da GitHub Pages per anti-CSRF (gestito da Microsoft
  GitHub, non da PluriFin).

Il **sito vetrina** (`lunapiena49.github.io/portfoliomanager-data/`) utilizza
analytics privacy-safe **GoatCounter self-hosted** (no cookie, no
fingerprinting, IP non memorizzato). Se in futuro saranno aggiunti analytics
con cookie, verra' mostrato un banner di consenso conforme alla normativa
e-Privacy.

## 11. Modifiche alla presente Privacy Policy

PluriFin si riserva di aggiornare questa Privacy Policy. Le modifiche sostanziali
saranno notificate:

- In app, tramite schermata di re-consent al primo avvio successivo all'aggiornamento
- Sul sito vetrina, con un banner per 30 giorni
- Tramite email agli iscritti alla newsletter (se applicabile)

Il numero di versione (in alto in questo documento) viene incrementato ad ogni
modifica sostanziale. Le versioni precedenti sono disponibili nella history Git
del repo pubblico `lunapiena49/portfoliomanager-data` cartella `legal/`.

## 12. Contatti

| Tipo richiesta | Email |
|---|---|
| Richieste GDPR (accesso, cancellazione, portabilita', reclamo) | `plurifin.app+gdpr@gmail.com` |
| Privacy & sicurezza | `plurifin.app+privacy@gmail.com` |
| Supporto generale | `plurifin.app+support@gmail.com` |
| Contatto pubblico Play Store | `plurifin.app@gmail.com` |

## 13. Foro competente e legge applicabile

La presente Privacy Policy e' regolata dalla legge italiana e dal Regolamento
(UE) 2016/679 (GDPR). Per controversie il foro competente e' quello del
consumatore ai sensi del D.Lgs. 206/2005 (Codice del Consumo).

Per utenti residenti fuori dall'Unione Europea si applicano la legge italiana e
il GDPR per quanto riguarda il trattamento dei dati personali, salvo
applicazione di norme nazionali piu' protettive del consumatore.
