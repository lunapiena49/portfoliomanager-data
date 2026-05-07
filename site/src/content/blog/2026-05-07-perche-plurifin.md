---
title: "Perche ho costruito PluriFin"
summary: "La storia personale dietro un'app per investitori retail privacy-first, e perche un singolo sviluppatore puo permettersi di proporre un piano da 0,99 EUR/anno."
publishedAt: 2026-05-07
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: it
tags: ["founder", "story", "personal-finance"]
---

Lavoro su PluriFin da circa 18 mesi, in part-time, mentre il mio lavoro principale resta
quello di sviluppatore software in un'azienda italiana. L'app non e' nata come prodotto
commerciale: e' nata come strumento personale per tracciare un portafoglio multi-broker
che ogni anno diventava piu' difficile da gestire con strumenti generalisti.

## Il problema

Avevo posizioni distribuite su 4 broker (Interactive Brokers, Trade Republic, Fineco e
Directa) in 3 valute (EUR, USD, GBP), con asset di natura mista (azioni singole, ETF
quotati USA, ETF UCITS, qualche ETP crypto, fondi obbligazionari). Ogni broker esporta
in un formato CSV diverso, ogni broker ha la sua granularita' di transazione, e ogni
broker ha una sua interpretazione di "costo medio di carico" e "P&amp;L realizzato".

I tool generalisti che avevo provato (Google Sheets templates, alcuni servizi web italiani)
o non capivano i CSV multi-broker, o richiedevano di consegnare le credenziali API a un
servizio cloud terzo. Nessuno dei due era accettabile per me: i fogli di calcolo
diventavano ingestibili oltre le ~30 posizioni, e dare un read-only token API a un
servizio non auditable e' un tradeoff che non sono disposto a fare.

## La risposta personale e poi il prodotto

PluriFin e' nato come progetto interno con tre vincoli rigidi:

1. **I dati vivono sul dispositivo dell'utente**, in storage cifrato AES-256. Niente cloud
   PluriFin obbligatorio. L'export GDPR e' a un click di distanza.
2. **L'app non parla mai con un broker per conto dell'utente**. Tutto avviene tramite
   import di file CSV/PDF che l'utente scarica dal suo broker. Niente API key di terzi
   custodite da PluriFin.
3. **Le funzioni AI sono opzionali e usano chiavi dell'utente**. Se vuoi l'analisi Gemini,
   inserisci la tua chiave API; resta nel keystore del tuo dispositivo.

Quando ho realizzato che il prodotto poteva essere utile a piu' di me, ho deciso di
pubblicarlo. Il modello commerciale e' deliberatamente low-friction:

- 7 giorni di trial gratuito senza carta
- 0,99 EUR/anno per Single, 1,99 EUR/anno per Family
- Lifetime una tantum a 4,99 EUR (Single) o 9,99 EUR (Family)

Niente "early bird", niente "primi N utenti", niente promo che differenziano. Stesso prezzo
per tutti, oggi e in futuro.

## Perche cosi poco

L'app costa 25 USD una tantum di Play Console e ~0 EUR di hosting (Cloudflare free tier per
il Worker e GitHub Pages per il sito). Non ci sono investitori da remunerare, non c'e'
churn da combattere con sconti, non c'e' un team da pagare. L'obiettivo e' coprire i costi
operativi e tenere viva una community di utenti che apprezzano un approccio onesto al
risparmio.

Se PluriFin un giorno dovesse cesserare le operazioni, l'export GDPR ti restituisce tutti
i tuoi dati in un singolo JSON portabile -- e i piani Lifetime restano accessibili a vita
sul tuo Google account.

## Cosa aspettarsi nei prossimi mesi

- **Q2 2026**: lancio Play Store (Android), webapp gratuita gia' live
- **Q3 2026**: feedback raccolta da Closed Testing, hotfix sui crash residui
- **Q4 2026 / Q1 2027**: aumento del numero di broker supportati (priorita': feedback utenti)
- **Fase 2 (post-revenue)**: iOS, Apple Pay, marchio EUIPO, eventuale assicurazione RC Tech

Se vuoi seguire lo sviluppo in tempo reale, il repository pubblico
[portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data) ospita la
pipeline dei dati di mercato e il sito che stai leggendo. Il codice dell'app Android resta
closed-source per ragioni di compliance (chiavi di firma, anti-piracy, integrita' del
contesto Play Billing) ma le specifiche di formato dei CSV broker e i template dei
documenti legali sono pubblici.

A presto.
