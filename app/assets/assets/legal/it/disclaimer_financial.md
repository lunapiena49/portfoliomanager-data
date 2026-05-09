# Disclaimer Finanziario -- Portfolio Manager by PluriFin

**Versione**: 1.0.0
**Ultimo aggiornamento**: 2026-05-02
**Lingua originale**: Italiano (versione di riferimento per il foro competente)

---

> **AVVISO IMPORTANTE -- LEGGERE PRIMA DI UTILIZZARE L'APP**
>
> L'App **Portfolio Manager** by PluriFin e' uno strumento informativo
> personale. Le informazioni, i dati, i grafici, i suggerimenti di
> ribilanciamento e le analisi AI mostrati **NON costituiscono in alcun modo
> consulenza finanziaria, raccomandazione di investimento, sollecitazione del
> pubblico risparmio o servizio di investimento ai sensi del TUF (D.Lgs.
> 58/1998) e della Direttiva MiFID II (2014/65/UE)**. L'Utente assume in via
> esclusiva ogni responsabilita' delle proprie decisioni di investimento.

---

## 1. Natura informativa dell'App

Tutto cio' che l'App mostra all'Utente -- elenchi di posizioni, prezzi di
mercato, performance storica, allocazione, analisi AI, suggerimenti di
ribilanciamento -- ha finalita' **esclusivamente informativa, descrittiva ed
educativa**.

L'App **non**:

- Fornisce consigli personalizzati di investimento
- Suggerisce singoli strumenti finanziari o singole operazioni
- Esprime opinioni sull'idoneita' di un investimento per la situazione
  patrimoniale, gli obiettivi o la tolleranza al rischio dell'Utente
- Esegue ordini, ne' ha rapporti con broker o intermediari
- Detiene fondi o strumenti finanziari dell'Utente

## 2. Definizioni normative di riferimento

Si richiama in particolare:

- **Art. 1 comma 5-septies del TUF** (D.Lgs. 24 febbraio 1998 n. 58):
  definizione di "consulenza in materia di investimenti", che richiede una
  raccomandazione personalizzata su un'operazione relativa a uno specifico
  strumento finanziario, fornita su iniziativa del prestatore o su richiesta
  del cliente. **L'App non rientra in tale definizione.**
- **Art. 18-bis e 18-ter del TUF**: riserva alle persone fisiche iscritte
  all'Albo OCF e ai consulenti finanziari abilitati. **PluriFin / Filippo
  Salemi non e' iscritto all'Albo OCF e non opera in tale qualita'.**
- **Art. 1 comma 5 lettera d) del TUF**: gestione di portafogli. **L'App non
  gestisce portafogli, mostra solo dati inseriti dall'Utente.**
- **MiFID II (Direttiva 2014/65/UE)** e **MiFIR (Regolamento UE 600/2014)**:
  l'App non eroga servizi di investimento riservati.
- **Regolamento (UE) 2017/565**: l'App non e' soggetta agli obblighi di
  valutazione di adeguatezza ne' di appropriatezza, in quanto non offre
  servizi di investimento.

## 3. Analisi AI -- avvertenze specifiche

Quando l'Utente utilizza la funzione "Analisi AI" o "Chat AI" (basata su
Google Gemini), occorre tenere presente che:

### 3.1 Modello probabilistico, non deterministico

I modelli linguistici di grandi dimensioni (LLM) generano testo in modo
**probabilistico**. La stessa domanda puo' produrre risposte differenti.
Le risposte non sono il risultato di un'analisi quantitativa rigorosa ma di
una generazione testuale plausibile date le statistiche del corpus di
addestramento del modello.

### 3.2 Allucinazioni

I modelli AI possono produrre **affermazioni false ma plausibili**
("allucinazioni"), in particolare riguardo a:

- Nomi di strumenti finanziari, ticker, ISIN
- Performance storica, dividendi, scadenze
- Norme fiscali (aliquote, scaglioni, scadenze, esenzioni)
- Composizione di indici, ETF, fondi
- Date di stacco cedola, eventi corporate

L'Utente e' tenuto a **verificare ogni affermazione** del modello con fonti
ufficiali (KIID, prospetti, siti dei broker, Borsa Italiana, EDGAR SEC, ESMA)
prima di prendere qualsiasi decisione.

### 3.3 Cutoff temporale

Il modello AI ha una data di "cutoff" oltre la quale non conosce eventi
recenti. Non puo' conoscere prezzi correnti, decisioni di banche centrali
recenti, eventi di mercato del giorno corrente.

### 3.4 Niente raccomandazioni personalizzate

Anche quando il prompt include la composizione del portafoglio dell'Utente, le
risposte del modello AI **non costituiscono consulenza personalizzata**: il
modello non conosce situazione patrimoniale complessiva, redditi, esigenze di
liquidita', orizzonte temporale, tolleranza al rischio, fiscalita' specifica,
obiettivi pensionistici. Anche quando il modello formula frasi che assomigliano
a un consiglio, sono comunque output testuali generici, non opinioni
professionali.

### 3.5 Nessun obbligo di "Know Your Customer"

L'App non chiede ne' raccoglie il profilo di rischio dell'Utente, l'esperienza
in materia di investimenti, la situazione finanziaria, gli obiettivi: non
rientra negli obblighi MiFID II di valutazione di adeguatezza/appropriatezza
proprio perche' **non eroga servizi di investimento**. Cio' significa che, a
maggior ragione, le analisi AI non possono essere considerate adeguate o
appropriate al singolo Utente.

## 4. Suggerimenti di ribilanciamento

L'App calcola automaticamente la differenza fra l'allocazione corrente del
portafoglio e l'allocazione target definita dall'Utente, mostrando le
"differenze" che servirebbero a riportare il portafoglio al target.

Tali calcoli **non sono raccomandazioni di acquisto o vendita**. Sono semplici
operazioni aritmetiche su parametri scelti dall'Utente. L'App non valuta:

- L'opportunita' di mercato del momento
- L'impatto fiscale (capital gain, minusvalenze, holding period)
- I costi di transazione del broker
- La liquidita' degli strumenti
- L'impatto sull'eventuale concentrazione di rischio cliente / settore /
  paese / valuta

L'Utente e' tenuto a confrontarsi con un **consulente finanziario abilitato**
prima di eseguire qualsiasi operazione basata sui delta mostrati.

## 5. Dati di mercato

I prezzi, le performance, i dati storici mostrati nell'App provengono da
fonti pubbliche o da provider terzi (EODHD, FMP) attivati dall'Utente con
propria chiave API. Tali dati:

- Possono essere ritardati di 15-20 minuti rispetto al mercato (delayed
  quotes), salvo abbonamenti real-time pagati direttamente dall'Utente al
  provider
- Possono contenere errori, gap, disallineamenti su splits, dividendi,
  consolidamenti, variazioni ticker
- Sono validi solo nel momento in cui sono mostrati e non costituiscono prova
  legale di esecuzione di alcuna operazione

L'App non si assume alcuna responsabilita' per errori o ritardi dei dati di
terzi.

## 6. Calcoli fiscali

L'App **non calcola** la fiscalita' dell'Utente. Eventuali indicazioni di
guadagni/perdite mostrate sono **calcoli aritmetici grezzi** (prezzo corrente -
prezzo medio) * quantita', che non considerano:

- Tassazione plusvalenze (26%, 12,5% per titoli di Stato e equipariti, ecc.)
- Bollo titoli (0,2% annuo)
- Prelievo IVAFE per attivita' detenute all'estero
- Detrazioni, deduzioni, compensazione minusvalenze (4 anni)
- Holding period per regimi agevolati (PIR, fondi pensione, ecc.)
- Trattamento ETF UCITS vs non-UCITS, ETF "armonizzati" vs "non armonizzati"
- Imposta di successione, donazione

Per la dichiarazione dei redditi e qualsiasi calcolo fiscale, l'Utente deve
rivolgersi a un **commercialista o a un CAF abilitato**.

## 7. Mercati esteri e valute

Per investimenti in mercati esteri o in valuta diversa dall'EUR, l'Utente deve
considerare:

- Rischio di cambio
- Costi di conversione applicati dal broker
- Doppia imposizione (convenzioni con Italia, modulo W-8BEN per USA)
- Reporting di attivita' detenute all'estero (quadro RW)
- Vincoli normativi di residenza fiscale

L'App **non modella** nessuno di questi aspetti.

## 8. Sicurezza personale

L'Utente e' avvisato che:

- Le **chiavi API** inserite nell'App per AI o prezzi real-time sono salvate
  nel keystore di sistema, ma comunque accessibili da chi ha accesso fisico
  al dispositivo sbloccato
- Il **dispositivo perso o rubato** non sbloccato e' protetto dalle misure
  della piattaforma; sbloccato potrebbe esporre i dati di portafoglio
- I **backup automatici Google Drive** sono disabilitati per default, ma
  l'utente puo' accidentalmente abilitarli

PluriFin non e' responsabile per perdite di dati o accessi non autorizzati
derivanti da:

- Furto / smarrimento del dispositivo sbloccato
- Mancata configurazione del lock screen
- Compromissione del dispositivo (root, jailbreak, malware)
- Condivisione delle proprie chiavi API con terzi
- Esportazione manuale dei dati e successiva diffusione non controllata

## 9. Aggiornamenti normativi

Le norme fiscali e regolamentari italiane ed europee in materia di investimenti
**cambiano frequentemente**. L'App non garantisce che le modalita' di calcolo,
gli esempi mostrati o le risposte AI siano aggiornati alle ultime modifiche.

L'Utente e' tenuto a verificare la normativa vigente al momento di ogni
operazione.

## 10. Decisioni dell'Utente -- esonero di responsabilita'

L'Utente **dichiara e accetta** che:

1. L'uso dell'App, dei dati e delle analisi mostrate avviene su sua esclusiva
   iniziativa e responsabilita'
2. Le decisioni di investimento sono e restano **esclusivamente sue**
3. PluriFin non e' responsabile, nei limiti massimi consentiti dalla legge,
   per perdite di capitale, mancato guadagno, opportunita' perse, conseguenze
   fiscali derivanti dall'uso dell'App
4. Per qualsiasi decisione di investimento di rilievo si rivolgera' a un
   **consulente finanziario abilitato** iscritto all'Albo OCF
   (<https://www.organismocf.it>) o a un intermediario vigilato

## 11. Pubblico minorenne

L'App **non e' destinata a minori di 18 anni**. Il content rating Play Store
e' "Everyone / 18+" come consigliato per applicazioni di natura finanziaria.
Genitori o tutori sono responsabili dell'eventuale accesso da parte di
minori; PluriFin non puo' verificare l'eta' dell'utente reale.

## 12. Geolocalizzazione e mercati

L'App e' progettata per il mercato italiano e dell'area Euro. L'Utente in
altre giurisdizioni:

- Deve verificare che l'uso dell'App sia conforme alle norme locali sui
  servizi finanziari personali
- Deve verificare il regime fiscale applicabile
- Si assume integralmente il rischio di interpretazioni divergenti

PluriFin non e' responsabile della conformita' a normative non italiane /
non UE.

## 13. Accettazione esplicita

L'Utente, accettando questo Disclaimer Finanziario al primo avvio dell'App
(o al primo avvio successivo a un incremento di versione del documento),
dichiara di:

- Aver letto e compreso integralmente il presente Disclaimer
- Accettare la natura informativa dell'App
- Comprendere che le analisi AI sono soggette a errori e allucinazioni
- Sollevare PluriFin / Filippo Salemi da responsabilita' nei limiti
  esposti, nei massimi consentiti dalla legge applicabile

L'accettazione viene registrata nel `consent_box` cifrato locale (vedi
ConsentService) con timestamp UTC, versione documento e hash SHA-256 del
testo accettato.

In assenza di accettazione l'App non rende disponibili le funzionalita' di
ribilanciamento, AI e import: resta utilizzabile la sola visualizzazione di
documenti legali e le impostazioni.

## 14. Foro e legge applicabile

Il presente Disclaimer e' regolato dalla **legge italiana**. Per controversie
si applica quanto previsto nei Termini di Servizio (`legal/terms_of_service.md`).

## 15. Contatti

Per chiarimenti sul contenuto del presente Disclaimer:

- Email: `plurifin.app+legal@gmail.com`

PluriFin **non puo' fornire consulenza finanziaria via email** ne' rispondere
a quesiti su strumenti finanziari specifici. Per questo serve un consulente
abilitato (Albo OCF: <https://www.organismocf.it>).
