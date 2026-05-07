---
title: "Why I built PluriFin"
summary: "The personal story behind a privacy-first investment app for retail investors, and how a single developer can afford to ship a EUR 0.99/year tier."
publishedAt: 2026-05-07
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: en
tags: ["founder", "story", "personal-finance"]
---

I have been working on PluriFin for about 18 months, in part-time, while my main job
remains software development at an Italian company. The app did not start as a
commercial product: it started as a personal tool to track a multi-broker portfolio
that was getting harder and harder to manage with general-purpose tools.

## The problem

I had positions across 4 brokers (Interactive Brokers, Trade Republic, Fineco and
Directa) in 3 currencies (EUR, USD, GBP), with a mixed asset class (single stocks,
US-listed ETFs, UCITS ETFs, a few crypto ETPs, bond funds). Each broker exports in a
different CSV format, each broker has its own transaction granularity, and each
broker has its own interpretation of "average cost basis" and "realized P&amp;L".

The general-purpose tools I tried (Google Sheets templates, a few Italian web
services) either could not handle multi-broker CSVs, or required handing API
credentials over to a third-party cloud service. Neither was acceptable to me:
spreadsheets become unmanageable past ~30 positions, and giving a read-only API
token to a non-auditable service is a tradeoff I am not willing to make.

## A personal answer, then a product

PluriFin started as an internal project under three hard constraints:

1. **Data lives on the user's device**, in AES-256 encrypted storage. No mandatory
   PluriFin cloud. The GDPR export is a single click away.
2. **The app never talks to a broker on the user's behalf**. Everything happens via
   CSV/PDF imports the user downloads from their broker. No third-party API keys
   held by PluriFin.
3. **AI features are optional and use the user's keys**. If you want Gemini analysis,
   plug in your API key; it stays in your device's keystore.

Once I realized the product could be useful to more than just me, I decided to ship
it. The pricing model is deliberately low-friction:

- 7 days of free trial, no credit card required
- EUR 0.99/year for Single, EUR 1.99/year for Family
- Lifetime one-time at EUR 4.99 (Single) or EUR 9.99 (Family)

No "early bird", no "first N users", no promos that segment the user base. Same
price for everyone, today and forever.

## Why so cheap

The app costs 25 USD one-time of Play Console and ~0 EUR of hosting (Cloudflare
free tier for the Worker, GitHub Pages for the site). There are no investors to
return capital to, no churn to fight with discounts, no team to pay. The goal is
to cover operating costs and keep alive a community of users who appreciate an
honest take on personal saving.

If PluriFin ever shuts down, the GDPR export hands you back all your data in a
single portable JSON -- and Lifetime plans remain accessible forever on your
Google account.

## What to expect over the next few months

- **Q2 2026**: Play Store launch (Android), free webapp already live
- **Q3 2026**: feedback collected from Closed Testing, hotfixes for residual crashes
- **Q4 2026 / Q1 2027**: more supported brokers (priority: user feedback)
- **Phase 2 (post-revenue)**: iOS, Apple Pay, EUIPO trademark, optional RC Tech insurance

To follow the development in real time, the public
[portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data) repo
hosts the market-data pipeline and the site you are reading. The Android app code
stays closed-source for compliance reasons (signing keys, anti-piracy, Play
Billing context integrity), but the broker CSV format specs and legal document
templates are public.

See you soon.
