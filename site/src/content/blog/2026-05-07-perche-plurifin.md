---
title: "Portfolio Manager è costruita su tre divieti"
summary: "Niente archivio dei portafogli, niente collegamento ai conti, niente intelligenza artificiale senza la chiave di chi la usa. Il listino di quattro righe viene da lì."
publishedAt: 2026-05-07
updatedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Redazione"
lang: it
tags: ["portfolio-manager", "privacy", "prezzi"]
---

Le app di finanza si presentano con l’elenco di ciò che fanno. Portfolio Manager, l’app di PluriFin Finance, si capisce prima da ciò che non può fare. Non ha un archivio in cui tenere i portafogli, non si collega ai conti e non usa l’intelligenza artificiale senza una chiave dell’utente. Sono tre divieti, e il listino di quattro righe ne è la conseguenza.

## Primo divieto: nessun archivio dei portafogli

Il portafoglio resta sul telefono di chi lo possiede, cifrato con AES-256, con la chiave custodita dal sistema operativo. PluriFin non conserva i portafogli e non chiede di aprire un account. Per verificare la prova e l’abbonamento le bastano un’impronta anonima del dispositivo e la ricevuta dell’acquisto.

Un’app di finanza gratuita che conserva i portafogli sui propri server ha un costo da coprire. Prima di installarla conviene chiedere con che cosa lo copre.

Due cose vanno dette per intero. La demo web tiene i dati nel browser, senza cifratura: serve a vedere com’è fatta l’app, non a custodire un portafoglio vero. I rapporti sui crash (Firebase Crashlytics) partono soltanto se l’utente accende la diagnostica dalle impostazioni, e non contengono dati di portafoglio.

L’uscita è prevista quanto l’entrata: “Esporta i miei dati” produce un file JSON con tutto il contenuto, “Cancella tutti i dati” lo elimina dal telefono.

## Secondo divieto: nessun collegamento ai conti

L’app non chiede le credenziali di un broker e non esegue ordini. I dati entrano perché li porta chi li possiede, un file alla volta. Portfolio Manager riconosce i CSV di undici broker, mostra un’anteprima delle righe da correggere e gestisce i doppioni prima di salvare. Per gli altri intermediari c’è un lettore generico, e dai PDF l’app prova a estrarre la tabella.

È più lento di un collegamento automatico. È anche il motivo per cui nessuno deve consegnare a PluriFin le credenziali della propria banca.

## Terzo divieto: l’intelligenza artificiale solo con la chiave dell’utente

L’analisi con l’intelligenza artificiale è facoltativa. Usa Google Gemini con una chiave che l’utente inserisce di persona, custodita dal sistema operativo del telefono. Chi la accende manda a Google la domanda e la composizione del portafoglio: titoli, quantità, prezzi medi. La richiesta parte dal telefono e non passa da PluriFin, che non la conserva.

Le risposte sono spunti generati da un modello, non consulenza finanziaria personalizzata, e possono contenere errori. Le decisioni restano di chi investe.

## Il listino che ne discende

Un’azienda che non conserva i portafogli non paga per conservarli, e una che non mostra pubblicità non ha inserzionisti da accontentare. Resta un’app, con il suo prezzo: sette giorni di prova senza carta di credito, poi quattro piani, gli stessi per tutti, da 4,99 euro l’anno a 49,99 euro una volta sola per la famiglia.

Finita la prova resta una versione gratuita. Le posizioni si inseriscono a mano, ribilanciamento e dati di mercato continuano a funzionare; l’import dai broker, gli obiettivi e l’intelligenza artificiale si fermano finché non si sceglie un piano. Il listino completo, con rinnovi e rimborsi, è nella pagina [Prezzi](/pricing).

## Dove controllare ciò che è scritto qui

Il codice di questo sito e il flusso dei dati di mercato sono pubblici nel repository [portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data). Che cosa l’app fa con i dati è scritto per esteso nell’[informativa sulla privacy](/privacy), in sei lingue. La [demo web](/app/) si apre nel browser senza installare nulla.

*Articolo del 7 maggio 2026, riscritto l’11 novembre 2026 sui fatti di oggi.*
