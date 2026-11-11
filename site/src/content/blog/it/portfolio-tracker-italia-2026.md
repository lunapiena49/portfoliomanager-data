---
title: "Cinque domande da fare a un’app prima di affidarle il portafoglio"
summary: "Dove finiscono i dati, come entrano gli estratti conto, chi legge le domande all’intelligenza artificiale, che cosa l’app non fa e quanto costa. Con le risposte di Portfolio Manager."
publishedAt: 2026-05-03
updatedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Redazione"
lang: "it"
tags: ["portfolio-tracker", "investimenti", "guida", "privacy"]
draft: false
---

Tenere in un foglio di calcolo un portafoglio diviso fra più broker vuol dire riscrivere a mano ciò che ogni estratto conto dice a modo suo. Chi si stanca cerca un’app, e prima di caricarci gli estratti conto conviene farle cinque domande. Sotto ciascuna c’è la risposta di Portfolio Manager, l’app di PluriFin Finance: chi legge può verificarla sulla demo web e sull’informativa, e pretendere la stessa chiarezza dalle altre.

## 1. Dove finiscono i dati

Le risposte possibili sono tre:

- **Sui server di chi produce l’app**: comodo per chi usa più dispositivi, ma il portafoglio abita in casa d’altri
- **Sul dispositivo, in chiaro**: è il caso del foglio di calcolo, leggibile da ogni programma che ha accesso ai file
- **Sul dispositivo, cifrati**: la chiave nasce sul telefono e lì resta

Portfolio Manager sta nella terza. Portafogli, posizioni e obiettivi restano sul telefono, cifrati con AES-256, con la chiave custodita dal sistema operativo. PluriFin non ha un archivio in cui tenerli e non chiede di aprire un account. Fa eccezione la demo web, e lo dichiara: i suoi dati restano nel browser, senza cifratura.

Un’app gratuita che conserva i portafogli sui propri server ha un costo da coprire. La domanda successiva è con che cosa lo copre.

## 2. Come entrano gli estratti conto

Le strade sono due: consegnare all’app le credenziali del broker, oppure importare i file che il broker esporta. Portfolio Manager conosce solo la seconda: non si collega ai conti e non esegue ordini.

L’app legge i CSV di undici broker: Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (oggi parte di Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB e Revolut. Per gli altri c’è un lettore generico, a cui bastano il simbolo del titolo e una colonna fra quantità, valore e prezzo. Accetta anche i PDF, da cui prova a estrarre la tabella.

A qualunque app va chiesto se l’import del proprio estratto conto si può provare prima di pagare. In Portfolio Manager sì: i sette giorni di prova hanno tutte le funzioni e non chiedono una carta di credito. Nella demo web no: lì le posizioni si inseriscono a mano, cinque al massimo.

## 3. Chi legge le domande fatte all’intelligenza artificiale

Un’analisi del portafoglio scritta da un modello richiede di mandare il portafoglio a chi gestisce il modello. Conviene sapere per quali server passa e chi lo conserva.

In Portfolio Manager l’analisi è facoltativa e usa Google Gemini, con una chiave che l’utente inserisce di persona. La domanda e la composizione del portafoglio (titoli, quantità, prezzi medi) vanno dal telefono a Google senza passare da PluriFin, che non le conserva. Lo stesso vale per i prezzi in tempo reale: i simboli dei titoli vanno al fornitore che l’utente sceglie.

## 4. Che cosa l’app non fa

Portfolio Manager non esegue ordini e non è un broker. Le analisi dell’intelligenza artificiale sono spunti generati da un modello: non sono consulenza finanziaria personalizzata e possono contenere errori.

L’app non calcola nemmeno le imposte. Guadagni e perdite mostrati sono conti aritmetici: prezzo corrente meno prezzo medio, per la quantità. Non considerano la tassazione delle plusvalenze, il bollo sui titoli né la compensazione delle minusvalenze. Per la dichiarazione dei redditi l’avvertenza finanziaria dell’app rimanda a un commercialista o a un CAF abilitato.

Per portare i dati altrove c’è “Esporta i miei dati”, che produce un file JSON con tutto il contenuto.

## 5. Quanto costa, e che cosa succede quando si smette di pagare

Il vizio del settore è la prova che chiede la carta e l’abbonamento che parte da solo quando nessuno guarda. In Portfolio Manager la prova dura sette giorni e non conosce la carta di chi la usa: quando finisce, nessun addebito parte da solo.

Poi ci sono quattro piani, gli stessi per tutti, da 4,99 euro l’anno a 49,99 euro una volta sola per la famiglia. Nessun piano contiene pubblicità. Rinnovi, disdetta e rimborsi sono nella pagina [Prezzi](/pricing).

Finita la prova resta una versione gratuita. Le posizioni si inseriscono a mano, ribilanciamento e dati di mercato continuano a funzionare; l’import dai broker, gli obiettivi e l’intelligenza artificiale si fermano finché non si sceglie un piano. In ogni caso i dati restano sul telefono, esportabili.

## Da dove cominciare

La [demo web](/app/) si apre nel browser senza installare nulla, con limiti dichiarati: cinque posizioni inserite a mano, niente import, niente obiettivi e niente intelligenza artificiale. Chi resta al foglio di calcolo può portarsi via le cinque domande: valgono per qualunque app.

*Articolo del 3 maggio 2026, riscritto l’11 novembre 2026 sui fatti di oggi. Portfolio Manager è uno strumento informativo: i suoi contenuti non costituiscono consulenza finanziaria, fiscale o legale.*
