# DMCA / Takedown Notice Template -- PluriFin

**Versione**: 1.0.0
**Ultimo aggiornamento**: 2026-05-02

Questo documento contiene i template e le istruzioni operative per gestire:

1. **Notice in arrivo**: qualcuno (terzo) lamenta che PluriFin viola un suo
   diritto e chiede rimozione (raro: l'app non ha contenuti generati da
   utenti, non hosta opere altrui).
2. **Notice in uscita**: PluriFin (Filippo Salemi) individua una copia
   abusiva, un fork commerciale, una violazione di marchio o di codice e
   invia una takedown.
3. **Counter-notice**: contro-notifica in caso di rimozione contestata.

Tutti i template fanno riferimento a:

- **DMCA** (17 U.S.C. § 512) per piattaforme USA (GitHub, Google Play, Apple
  App Store, AWS, Cloudflare USA)
- **Direttiva UE 2019/790** (Copyright in the Digital Single Market) e
  **D.Lgs. 177/2021** (recepimento italiano) per piattaforme UE
- **Codice Civile italiano** artt. 2598 (concorrenza sleale) e 2569+ (marchio
  registrato), una volta depositato il marchio EUIPO

---

## 1. Notice in arrivo (rare ma da gestire)

### 1.1 Possibili scenari

- Qualcuno sostiene che testo del sito vetrina (es. tagline, descrizione)
  copia il suo
- Qualcuno sostiene che il logo o il nome "PluriFin" violi un marchio
  preesistente
- Qualcuno sostiene che screenshot dell'app contengano elementi (icone,
  font) coperti da copyright
- Qualcuno sostiene che testi del blog citano fonti senza permesso

### 1.2 Procedura operativa

1. **Non rispondere immediatamente** al richiedente. Conservare ogni
   comunicazione (email, screenshot).
2. Aprire issue privata su `portfolio-manager-app` con label `legal-incoming`.
3. Verificare nei propri archivi:
   - Origine del materiale contestato (commit, asset, screenshot)
   - Eventuali license, attribution, fair use
4. Se la pretesa e' fondata: rimuovere o sostituire il materiale prima della
   risposta.
5. Rispondere al richiedente con il template 1.3.
6. Se la pretesa e' infondata o abusiva: rispondere con il template 1.4.
7. Se la notifica arriva tramite la piattaforma host (GitHub, Google Play),
   rispondere ANCHE attraverso il loro form di counter-notice se applicabile.

### 1.3 Template risposta -- pretesa fondata, materiale rimosso

```
Oggetto: Re: <oggetto richiesta>

Gentile <nome richiedente>,

ho ricevuto la sua comunicazione del <data> relativa a <descrizione
materiale>. Ho verificato la sua segnalazione e ho proceduto a rimuovere
il materiale contestato in data <data rimozione>.

Riferimento commit / azione: <commit hash o link>

Mi scuso per l'inconveniente, frutto di mero errore. Resto a sua
disposizione per ulteriori chiarimenti.

Cordiali saluti,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

### 1.4 Template risposta -- pretesa infondata, contestazione

```
Oggetto: Re: <oggetto richiesta>

Gentile <nome richiedente>,

ho ricevuto la sua comunicazione del <data> relativa a <descrizione
materiale>. Dopo verifica, contesto le sue affermazioni per i seguenti
motivi:

1. <motivo, es: il materiale e' di mia produzione originale, vedi commit
   <hash> del <data>>
2. <motivo, es: il materiale e' coperto da fair use ai sensi di...>
3. <motivo, es: il materiale e' rilasciato sotto licenza <X> dall'autore
   originale, di cui ho rispettato gli obblighi di attribuzione>

Le chiedo cortesemente di fornire prova dei suoi diritti sul materiale e
del danno asserito entro 30 giorni dalla presente. In assenza di
documentazione, considero la questione chiusa.

Cordiali saluti,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

---

## 2. Notice in uscita -- DMCA Takedown a piattaforma USA

### 2.1 Quando inviarla

- Fork pubblico su GitHub che ridistribuisce codice proprietario di PluriFin
  (privato) senza permesso
- App clone sul Play Store con stesso nome / logo / screenshot
- Sito web che riproduce sostanzialmente il sito vetrina di PluriFin
- Host che servono APK modificati di Portfolio Manager
- Riproduzione non autorizzata di blog post o materiale del press kit

### 2.2 Template DMCA notice (inglese, ai sensi 17 U.S.C. § 512(c)(3))

```
DIGITAL MILLENNIUM COPYRIGHT ACT TAKEDOWN NOTICE

To Whom It May Concern,

I am the copyright owner of the work described below and I am submitting
this DMCA notice in good faith to request the removal of infringing
material from your service.

1. IDENTIFICATION OF COPYRIGHTED WORK
The original work is the mobile application "Portfolio Manager" published
under the brand "PluriFin", and its accompanying website, source code,
visual assets, and textual content. Original repository (private):
https://github.com/lunapiena49/portfolio-manager-app
Public marketing site:
https://lunapiena49.github.io/portfoliomanager-data/
Authoritative Google Play listing:
https://play.google.com/store/apps/details?id=app.plurifin.portfoliomanager

2. IDENTIFICATION OF INFRINGING MATERIAL
The following URL(s) host material that infringes my copyright:
- <full URL of infringing content>
- <description of which specific element is infringing: source code copy,
  asset reuse, app clone, etc.>

3. CONTACT INFORMATION
Name: Filippo Salemi
Brand: PluriFin
Country: Italy
Email: plurifin.app+legal@gmail.com

4. GOOD FAITH STATEMENT
I have a good faith belief that the use of the material described above
is not authorized by me, the copyright owner, my agent, or by law.

5. ACCURACY STATEMENT
I swear, under penalty of perjury, that the information in this notice
is accurate and that I am the copyright owner or am authorized to act on
behalf of the copyright owner of the exclusive right that is allegedly
infringed.

6. ELECTRONIC SIGNATURE
/s/ Filippo Salemi
Date: <YYYY-MM-DD>
```

### 2.3 Dove inviarla

- **GitHub**: <https://github.com/contact/dmca>
- **Google Play**: <https://support.google.com/legal/answer/3463191>
  (sezione "Report content for legal reasons")
- **Cloudflare**: <https://abuse.cloudflare.com/>
- **AWS**: <abuse@amazonaws.com>
- **Generico host europeo**: cercare email `abuse@` o pagina "Report" del
  provider

### 2.4 Conservare la prova

- Screenshot della pagina infringing (con URL, data, ora)
- Copia integrale del notice inviato
- Risposta del provider (notice ricevuto, takedown effettuato, eventuale
  counter-notice)
- Tutto in cartella locale `Plurifin/Legal/Takedowns/<YYYY>/<case-id>/`,
  fuori repo

---

## 3. Notice in uscita -- richiesta in italiano a host UE

### 3.1 Template (italiano, ai sensi D.Lgs. 70/2003 art. 17 e D.Lgs. 177/2021)

```
Oggetto: Diffida e richiesta rimozione contenuti illeciti -- <nome
servizio host>

Spettabile <nome host>,

la presente per segnalare la presenza di contenuti illeciti accessibili
attraverso il vostro servizio, in violazione dei diritti di proprieta'
intellettuale del sottoscritto Filippo Salemi, persona fisica residente
in Italia, titolare del brand commerciale "PluriFin".

1. IDENTIFICAZIONE DEL TITOLARE
Filippo Salemi
Brand: PluriFin
Email: plurifin.app+legal@gmail.com
Documento d'identita': fornito su richiesta

2. OPERA TUTELATA
L'applicazione mobile "Portfolio Manager" pubblicata sotto il brand
"PluriFin", con relativi sito web, codice sorgente, marchio commerciale,
elementi grafici e testi originali.

Repository pubblico di riferimento:
https://github.com/lunapiena49/portfoliomanager-data

Listing Google Play autoritativo:
https://play.google.com/store/apps/details?id=app.plurifin.portfoliomanager

3. CONTENUTO ILLECITO
Url: <URL completo>
Descrizione: <quale elemento e' contestato>
Elemento del diritto violato: <copyright codice / marchio / segno
distintivo / concorrenza sleale ex art. 2598 c.c.>

4. RICHIESTA
Si chiede la pronta rimozione del contenuto sopra indicato ai sensi
della normativa vigente, in particolare D.Lgs. 70/2003 art. 17 e
Direttiva UE 2019/790, ovvero la fornitura dei dati identificativi del
fornitore del contenuto ai fini di azione legale diretta.

5. DICHIARAZIONI
Il sottoscritto dichiara, ai sensi dell'art. 76 del DPR 445/2000,
consapevole delle sanzioni penali per dichiarazioni mendaci, che le
informazioni rese nella presente diffida sono veritiere e che il
sottoscritto e' titolare dei diritti contestati ovvero soggetto
legittimato ad agire.

Resto in attesa di riscontro entro 14 giorni lavorativi.

Cordiali saluti,
Filippo Salemi
<luogo>, <data>
```

---

## 4. Counter-notice (rimozione contestata)

Quando un'altra parte ha ottenuto la rimozione di contenuti PluriFin che
ritengo legittimi.

### 4.1 Template counter-notice DMCA (inglese)

```
DMCA COUNTER-NOTICE

To Whom It May Concern,

I am responding to a DMCA takedown notice that resulted in the removal of
my content. I assert in good faith that the material was removed by
mistake or misidentification.

1. IDENTIFICATION OF REMOVED MATERIAL
URL where the content was located before removal: <URL>
Description: <description>

2. STATEMENT
I swear, under penalty of perjury, that I have a good faith belief that
the material was removed or disabled as a result of mistake or
misidentification of the material to be removed or disabled.

3. CONSENT TO JURISDICTION
I consent to the jurisdiction of the Federal District Court for the
judicial district in which my address is located (or, if outside the
United States, the Federal District Court for the Northern District of
California). I will accept service of process from the person who
provided the original DMCA notice or that person's agent.

4. CONTACT INFORMATION
Name: Filippo Salemi
Address: <complete physical address>
Phone: <phone number>
Email: plurifin.app+legal@gmail.com

5. ELECTRONIC SIGNATURE
/s/ Filippo Salemi
Date: <YYYY-MM-DD>
```

---

## 5. Considerazioni operative

### 5.1 Soglia di azione

**Quando agire**: solo per violazioni evidenti e materiali (clone d'app,
copia integrale del sito, fork commerciale del codice). Non per piccoli
"ispirati a", o per critiche/recensioni (anche negative).

**Quando lasciar perdere**: post Reddit/forum che criticano l'app, comparison
con altre app, screenshot in articoli stampa (anche senza permesso) -- e'
fair use / cronaca.

### 5.2 Costi

L'invio di DMCA / takedown e' **gratuito** per il titolare. La gestione e'
fatta in proprio. Solo se la controparte avvia causa civile in Italia o USA,
servira' eventualmente un legale (~ 200-500 EUR per la prima consulenza).

### 5.3 Marchio EUIPO

Una volta depositato il marchio EUIPO "PluriFin" classi 9 e 36 (rimandato a
Fase 2 post-revenue), si potra' agire ANCHE sotto il regolamento EUTMR
(Reg. UE 2017/1001) che da' protezione piu' incisiva contro l'uso non
autorizzato del segno distintivo nell'UE.

### 5.4 Documentazione

Mantenere registro dei casi in `marketing/legal_actions.md` (file da creare
solo se / quando si verifica il primo caso reale), con:

- Data
- Tipo (incoming / outgoing / counter)
- Controparte
- Materiale
- Esito
- Costi sostenuti
- Lezioni apprese

## 6. Foro competente

Per controversie che dovessero originarsi dall'invio di queste notice:

- **Vs. controparti residenti in Italia**: foro del consumatore o foro
  generale del codice di procedura civile
- **Vs. controparti USA**: giurisdizione concordata nel counter-notice
  (default: Northern District of California per controparti senza domicilio
  USA)
- **Vs. controparti UE non italiane**: Reg. UE 1215/2012 (Bruxelles I-bis)

## 7. Aggiornamenti

Il presente documento sara' aggiornato in caso di:

- Modifica delle normative europee/italiane sui servizi della societa'
  dell'informazione
- Avvio del primo caso reale (per integrare le lessons learned)
- Deposito del marchio EUIPO PluriFin (per estendere le tutele disponibili)
