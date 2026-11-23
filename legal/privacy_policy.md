# Privacy Policy -- Portfolio Manager by PluriFin

**Versione**: 1.0.5
**Ultimo aggiornamento**: 2026-11-22
**Lingua originale**: Italiano (versione di riferimento per il foro competente)
**Hash testo (per audit trail)**: SHA-256 generato dallo script `scripts/legal/build_legal_html.ps1`

---

## 1. Titolare del trattamento

Il titolare del trattamento dei dati personali è:

- **Nome**: Filippo Salemi
- **Forma giuridica**: persona fisica (sviluppatore indipendente)
- **Brand commerciale**: PluriFin
- **Paese**: Italia
- **Email per richieste GDPR e privacy**: `gdpr@plurifin.app`
- **Email contatto generale**: `info@plurifin.app`

Non è designato un Data Protection Officer (DPO) in quanto il titolare è una
persona fisica e l'attività non rientra fra i casi obbligatori previsti dall'art.
37 del Regolamento (UE) 2016/679 (GDPR).

## 2. Sintesi (TL;DR)

- Tutti i dati di portafoglio (posizioni, transazioni, obiettivi, impostazioni)
  sono **memorizzati esclusivamente sul dispositivo dell'utente** in formato
  cifrato. Non li riceviamo, non li archiviamo, non li trasmettiamo a server di
  PluriFin.
- L'app **non utilizza analytics di terze parti attivi** in questa versione
  (no Facebook SDK, no AppsFlyer, no Sentry, no eventi Google Analytics
  generati dall'app). Una proprietà Google Analytics for Firebase (GA4)
  è linkata al progetto Firebase `portfolio-manager-f6f8d` per future
  evoluzioni: nella versione 1.0.0+10 nessun SDK `firebase_analytics` è
  integrato, quindi nessun evento analytics è generato dal binario
  dell'app. Vedi sezione 4 (sub-processor) per la dichiarazione completa.
- Su Android, l'app integra una **diagnostica anonima opzionale di crash via Firebase Crashlytics** (Google Ireland Limited): disattivata di default, attivabile dall'utente in Impostazioni > Privacy. Mai dati di portafoglio, chiavi API o contenuto AI. Copre anche i **fallimenti di avvio che l'app ha gestito da sola** (per esempio l'archivio locale che non si è potuto aprire). Con l'opzione disattivata non viene trasmesso nulla; i rapporti però non vengono scartati: l'SDK Crashlytics **li conserva sul dispositivo** e li invia solo se e quando attivi l'opzione. Restano nello spazio dell'app, quindi disinstallarla o cancellarne i dati li elimina. Vedi sezione 4 (sub-processor).
- L'app **non condivide dati con inserzionisti**. Non è presente pubblicità.
- Sono presenti **funzionalità opzionali** che, se attivate dall'utente,
  comportano la trasmissione di dati a fornitori terzi (sub-processor): AI
  Gemini e prezzi di mercato live dai provider configurati con una chiave
  propria (EODHD, FMP e gli altri della sezione 3.5). Ognuna richiede
  un'azione esplicita dell'utente per essere attivata.
- Prova gratuita e abbonamento sono registrati **solo sul dispositivo**:
  l'app non invia a server di PluriFin né la ricevuta d'acquisto né un
  identificativo del dispositivo (sezioni 3.2 e 3.3).
- L'utente può esportare e cancellare tutti i dati in qualsiasi momento dalle
  Impostazioni dell'app, senza dover contattare il titolare.

## 3. Tipologie di dati trattati

### 3.1 Dati raccolti localmente sul dispositivo

I seguenti dati restano **esclusivamente** sul dispositivo, in un archivio
locale cifrato (Hive AES-256 con chiave custodita nel keystore del sistema
operativo):

| Categoria | Esempi | Base giuridica | Conservazione |
|---|---|---|---|
| Dati di portafoglio | nome posizione, ticker, quantità, prezzo medio, broker, data acquisto | art. 6.1.b GDPR (esecuzione contratto utente) | Finché l'utente non li cancella |
| Obiettivi finanziari | titolo, importo target, scadenza, contributi mensili | art. 6.1.b GDPR | Finché l'utente non li cancella |
| Preferenze | lingua, valuta, tema, notifiche, modalità demo | art. 6.1.b GDPR | Finché l'utente non disinstalla |
| Audit trail consensi | timestamp, versione documento, decisione (accept/decline), hash testo | art. 6.1.c GDPR (obbligo legale prova del consenso) | Finché l'utente non li cancella o disinstalla |
| Chiavi API utente | chiavi dei provider attivati: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (inserite manualmente dall'utente) | art. 6.1.b GDPR | Finché l'utente non le rimuove |

Queste informazioni sono cifrate con AES-256 in modalità CBC; la chiave, di
32 byte, è custodita nel keystore di sistema (Android Keystore su Android,
Keychain su iOS, DPAPI su Windows). L'integrità di ogni record è controllata
con un codice CRC32: serve a riconoscere un record danneggiato o letto con la
chiave sbagliata. Non è una firma crittografica (non è un HMAC) e non
protegge da una modifica fatta di proposito da chi ha già accesso ai file
dell'app. Le chiavi API sono salvate in `flutter_secure_storage`, che usa lo
stesso keystore di sistema.

Restano invece **in chiaro**, nelle preferenze di sistema riservate all'app
(SharedPreferences), alcune impostazioni tecniche che non contengono dati di
portafoglio: la lingua scelta (che la libreria delle traduzioni, easy_localization, salva anche qui), la scelta sulla diagnostica dei crash, il completamento
dell'introduzione iniziale, la presa visione delle schermate informative, gli
indicatori delle migrazioni interne già eseguite e i contatori usati per
decidere quando chiedere una recensione su Google Play (numero di
importazioni, numero di posizioni inserite a mano, data dell'ultima
richiesta).

### 3.2 Acquisti tramite Google Play

L'installazione, l'aggiornamento, la valutazione e l'eventuale acquisto
dell'abbonamento avvengono tramite Google Play Store. Il pagamento è gestito
interamente da Google Play: PluriFin **non** riceve nome, email, indirizzo,
dati di pagamento o numero di carta.

Dopo un acquisto Google Play comunica all'app, sul dispositivo, l'esito e
l'identificativo del prodotto acquistato (`productId`: una delle quattro
varianti Premium, annuale o a vita, singola o famiglia). L'app conserva
l'abbonamento attivo nell'archivio locale cifrato (sezione 3.1). In questa
versione l'app **non** invia la ricevuta d'acquisto (`purchaseToken`) né
altri dati dell'acquisto a server di PluriFin: la ricevuta torna solo a Google
Play, che la usa per confermare l'acquisto.

### 3.3 Prova gratuita e impronta del dispositivo (solo Android)

Al primo avvio l'app avvia la prova gratuita di 7 giorni e la registra solo
sul dispositivo. Per farlo calcola un `device_id_hash`: l'impronta SHA-256 di
un valore casuale di 32 byte, generato alla prima esecuzione e custodito nel
keystore di sistema (`flutter_secure_storage`). L'impronta **non** deriva
dall'Android ID né da altri identificativi del dispositivo o dell'utente, e
non usa valori forniti da un server.

L'impronta resta nell'archivio locale cifrato insieme alle date di inizio e
di fine della prova; in questa versione **non** viene inviata a PluriFin né a
terzi. Disinstallando l'app il valore casuale viene cancellato e una nuova
installazione genera un'impronta diversa.

### 3.4 Dati che Claude AI / Gemini riceve (solo se l'utente attiva la feature)

Se l'utente:
1. inserisce manualmente la propria API key Gemini in Impostazioni;
2. apre la chat AI o richiede un'analisi del portafoglio;

allora il **prompt** (composto da: domanda utente + struttura portafoglio in
forma anonima -- ticker, quantità, prezzo medio, allocazione percentuale)
viene trasmesso direttamente da app a Google Gemini.

PluriFin non intermedia né archivia questi prompt. La trasmissione avviene
end-to-end fra il dispositivo utente e l'API Gemini di Google. Si applicano le
condizioni d'uso e la privacy policy di Google AI Studio /
[Google Gemini API Terms](https://ai.google.dev/terms).

L'utente può revocare la chiave in qualsiasi momento dalle Impostazioni; da
quel momento nessuna richiesta AI viene più inviata.

### 3.5 Dati che i provider di mercato ricevono (solo se l'utente attiva la feature)

L'app supporta 10 provider di dati di mercato che l'utente può configurare
indipendentemente inserendo la propria API key in Impostazioni. Quando l'utente
richiede un aggiornamento prezzi (manuale o periodico), l'app trasmette i ticker
richiesti direttamente al provider scelto. PluriFin non intermedia né archivia.

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
1. inserito manualmente la propria API key in Impostazioni (Stooq escluso, è free);
2. selezionato il provider come attivo per il refresh prezzi.

L'utente può rimuovere la chiave o disattivare il provider in qualsiasi momento.

## 4. Sub-processor

L'elenco completo dei sub-processor a cui l'app può trasmettere dati (solo se
l'utente attiva le feature corrispondenti) è:

| Sub-processor | Finalità | Dati trasmessi | Quando |
|---|---|---|---|
| **Google LLC** -- Play Billing | Pagamento e gestione abbonamento | Dati di pagamento e dell'acquisto, trattati da Google: PluriFin non li riceve | Solo se utente acquista subscription |
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
| **Google Ireland Limited** -- Firebase Crashlytics | Diagnostica anonima di crash | Stack trace offuscato, modello device (es. "Pixel 7"), OS (es. "Android 14"), versione app (es. "1.0.0+10"), Firebase Installation ID anonimo | Solo se utente attiva "Diagnostica crash anonima" in Impostazioni > Privacy. Disattivata di default. I rapporti prodotti mentre l'opzione è disattivata (crash e fallimenti di avvio gestiti) restano sul dispositivo a cura dell'SDK e vengono trasmessi solo dopo che l'utente la attiva. |
| **Google LLC** -- Google Analytics for Firebase (GA4) | Predisposizione futura per analytics aggregata di stabilità (proprietà GA4 linkata al progetto Firebase) | **Nessun dato trasmesso nella versione 1.0.0+10** (SDK `firebase_analytics` non integrato nel pubspec). Quando in una versione futura `firebase_analytics` verrà integrato, GA4 riceverà eventi auto-collected (screen views, app_start/app_foreground, `app_exception` aggregato da Crashlytics). L'utente sarà re-consentito al momento dell'introduzione | Inattivo nella versione 1.0.0+10. Verrà attivato solo dopo aggiornamento dell'app + re-consenso utente. |
| **Cloudflare, Inc.** -- rete davanti al dominio `plurifin.app` | Distribuzione di sito, documenti legali, webapp demo e dati di mercato pubblici | Log tecnici di accesso (indirizzo IP, user-agent, orario) | Ogni volta che l'app o il browser scaricano una risorsa dal dominio `plurifin.app` |
| **Microsoft GitHub** -- Pages | Hosting documenti legali, market data pubblici, webapp demo, vetrina | Indirizzo IP utente al momento della richiesta HTTP (log server Microsoft) | Sempre, ogni volta che l'utente apre la webapp o un documento legale |

Cloudflare e GitHub Pages possono raccogliere log tecnici di accesso (IP,
user-agent, timestamp) come da loro standard. Vedi:

- [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/)
- [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)

Nessun dato finanziario dell'utente è mai trasmesso a Cloudflare o GitHub
oltre a quanto strettamente necessario al rispettivo servizio.

## 5. Trasferimenti extra-UE

Google (Gemini, Play Billing), Cloudflare e GitHub sono società statunitensi.
I trasferimenti dati avvengono sotto:

- Standard Contractual Clauses (SCC) UE 2021/914 dove applicabili
- Data Privacy Framework UE-USA per Google (vedi
  [registrazione Google al DPF](https://www.dataprivacyframework.gov/list))
- Per EODHD e FMP: si applicano le rispettive policy di trasferimento

L'utente che non desidera trasferimenti extra-UE può semplicemente non attivare
le feature opzionali (AI Gemini, prezzi real-time): l'app funziona pienamente
in modalità locale senza alcun trasferimento.

## 6. Diritti dell'interessato (artt. 15-22 GDPR)

L'utente ha diritto di:

| Diritto | Come esercitarlo |
|---|---|
| **Accesso** ai dati personali | Direttamente in app: Impostazioni > Privacy > Esporta i miei dati (ZIP con portafoglio + consensi + log) |
| **Rettifica** dei dati inesatti | Modifica diretta in app (modifica posizione/obiettivo/impostazione) |
| **Cancellazione** ("diritto all'oblio") | Impostazioni > Privacy > Cancella tutti i dati (irrevocabile) o disinstallazione app |
| **Limitazione** del trattamento | Disattivazione feature opzionali (AI, prezzi live, subscription) |
| **Portabilità** | Impostazioni > Privacy > Esporta i miei dati (formato JSON + CSV in ZIP) |
| **Opposizione** | Disattivazione feature opzionali (AI, prezzi live) |
| **Reclamo** all'autorità di controllo | [Garante per la protezione dei dati personali](https://www.garanteprivacy.it/) (Italia) o autorità nazionale del paese di residenza |

Per richieste che non sono gestibili autonomamente in app (es. revoca del
consenso al trattamento di dati già trasmessi a un sub-processor):

- Email: `gdpr@plurifin.app`
- Tempo di risposta: entro 30 giorni dalla ricezione (art. 12.3 GDPR)
- Formato risposta: lingua della richiesta

Trattandosi di app local-first, la maggior parte delle richieste è soddisfacibile
istantaneamente dall'utente stesso senza dover contattare il titolare.

## 7. Conservazione dei dati

I dati locali sul dispositivo restano fino a quando l'utente:

1. Cancella manualmente la singola voce (posizione, obiettivo, ecc.)
2. Esegue "Cancella tutti i dati" da Impostazioni
3. Disinstalla l'app

L'audit trail dei consensi (`consent_box`) ha conservazione separata: viene
mantenuto finché l'utente non lo esporta e cancella esplicitamente. Questo
serve a fornire prova del consenso ai sensi dell'art. 7.1 GDPR.

I dati lato sub-processor sono soggetti alle policy di conservazione di ciascun
provider:

- Prova gratuita e abbonamento: registrati solo sul dispositivo (sezioni 3.2
  e 3.3), nessuna copia lato PluriFin
- Google Play Billing: vedi termini Google
- Gemini, EODHD, FMP: nessuna conservazione lato PluriFin (richieste
  passthrough)

## 8. Sicurezza

Misure tecniche e organizzative adottate:

- Storage locale: Hive AES-256 (CBC) con controllo di integrità CRC32 (non un
  HMAC), chiave a 32 byte nel keystore di sistema
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
- Nessun log persistente di dati personali né in console né su file
- Nessuna telemetria di crash trasmessa by default (niente Sentry; i rapporti Crashlytics, quando prodotti, restano sul dispositivo finché non attivi l'opzione)

## 9. Minori (art. 8 GDPR)

L'app non è destinata a minori di 18 anni. Pubblico: solo adulti (18+).
PluriFin non
raccoglie consapevolmente dati di minori. Se un genitore o tutore individua
un account di un minore, può richiederne la cancellazione scrivendo a
`gdpr@plurifin.app`.

## 10. Cookie e tecnologie simili

L'app mobile **non** utilizza cookie (non è un browser).

La **webapp demo** (`lunapiena49.github.io/portfoliomanager-data/app/`) utilizza:

- `localStorage` (HTML5) per persistere le 5 posizioni demo locali. Nessun
  cookie è impostato dall'app.
- Un cookie tecnico imposto da GitHub Pages per anti-CSRF (gestito da Microsoft
  GitHub, non da PluriFin).

Il **sito vetrina** (`lunapiena49.github.io/portfoliomanager-data/`) utilizza
analytics privacy-safe **GoatCounter self-hosted** (no cookie, no
fingerprinting, IP non memorizzato). Se in futuro saranno aggiunti analytics
con cookie, verrà mostrato un banner di consenso conforme alla normativa
e-Privacy.

## 11. Modifiche alla presente Privacy Policy

PluriFin si riserva di aggiornare questa Privacy Policy. Le modifiche sostanziali
saranno notificate:

- In app, tramite schermata di re-consent al primo avvio successivo all'aggiornamento

Il numero di versione (in alto in questo documento) viene incrementato ad ogni
modifica sostanziale. Le versioni precedenti sono disponibili nella history Git
del repo pubblico `lunapiena49/portfoliomanager-data` cartella `legal/`.

## 12. Contatti

| Tipo richiesta | Email |
|---|---|
| Richieste GDPR (accesso, cancellazione, portabilità, reclamo) | `gdpr@plurifin.app` |
| Privacy & sicurezza | `privacy@plurifin.app` |
| Supporto generale | `support@plurifin.app` |
| Legal & disclaimer | `legal@plurifin.app` |
| Contatto pubblico Play Store | `info@plurifin.app` |

## 13. Foro competente e legge applicabile

La presente Privacy Policy è regolata dalla legge italiana e dal Regolamento
(UE) 2016/679 (GDPR). Per controversie il foro competente è quello del
consumatore ai sensi del D.Lgs. 206/2005 (Codice del Consumo).

Per utenti residenti fuori dall'Unione Europea si applicano la legge italiana e
il GDPR per quanto riguarda il trattamento dei dati personali, salvo
applicazione di norme nazionali più protettive del consumatore.

In caso di divergenza fra le versioni linguistiche del presente documento prevale il testo italiano.
