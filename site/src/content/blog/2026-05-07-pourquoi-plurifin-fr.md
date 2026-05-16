---
title: "Pourquoi j'ai construit PluriFin"
summary: "L'histoire personnelle derriere une app privacy-first pour investisseurs particuliers, et pourquoi un developpeur seul peut offrir un plan a 0,99 EUR/an."
publishedAt: 2026-05-07
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: fr
tags: ["founder", "story", "personal-finance"]
---

Je travaille sur PluriFin depuis environ 18 mois, en part-time, tandis que mon
travail principal reste celui de developpeur logiciel dans une entreprise
italienne. L'application n'est pas nee comme un produit commercial: elle est
nee comme outil personnel pour suivre un portefeuille multi-broker qui chaque
annee devenait plus difficile a gerer avec des outils generalistes.

## Le probleme

J'avais des positions reparties sur 4 brokers (Interactive Brokers, Trade
Republic, Fineco et Directa) en 3 devises (EUR, USD, GBP), avec des actifs de
nature mixte (actions individuelles, ETF cotes USA, ETF UCITS, quelques ETP
crypto, fonds obligataires). Chaque broker exporte dans un format CSV
different, chaque broker a sa granularite de transaction, et chaque broker a
sa propre interpretation du "cout moyen d'acquisition" et du "P&amp;L realise".

Les outils generalistes que j'avais essayes (templates Google Sheets, quelques
services web italiens) ou bien ne comprenaient pas les CSV multi-broker, ou
bien exigeaient de leur livrer les identifiants API a un service cloud tiers.
Aucune des deux options n'etait acceptable: les feuilles de calcul deviennent
ingerables au-dela de ~30 positions, et donner un token API read-only a un
service non auditable est un tradeoff que je ne suis pas dispose a accepter.

## La reponse personnelle, puis le produit

PluriFin est ne comme projet interne avec trois contraintes rigides:

1. **Les donnees vivent sur l'appareil de l'utilisateur**, dans un stockage
   chiffre AES-256. Pas de cloud PluriFin obligatoire. L'export GDPR est a
   un clic.
2. **L'app ne parle jamais a un broker au nom de l'utilisateur**. Tout passe
   par l'import de fichiers CSV/PDF que l'utilisateur telecharge depuis son
   broker. Pas de cles API tierces detenues par PluriFin.
3. **Les fonctions IA sont optionnelles et utilisent les cles de l'utilisateur**.
   Si vous voulez l'analyse Gemini, vous saisissez votre cle API; elle reste
   dans le keystore de votre appareil.

Quand j'ai realise que le produit pouvait etre utile a plus que moi, j'ai decide
de le publier. Le modele commercial est volontairement low-friction:

- 7 jours d'essai gratuit sans carte
- 0,99 EUR/an pour Single, 1,99 EUR/an pour Famille
- Lifetime paiement unique a 4,99 EUR (Single) ou 9,99 EUR (Famille)

Pas d'"early bird", pas de "premiers N utilisateurs", pas de promos qui
segmentent. Meme prix pour tous, aujourd'hui et toujours.

## Pourquoi si peu cher

L'app coute 25 USD une fois de Play Console et ~0 EUR d'hebergement (Cloudflare
free tier pour le Worker et GitHub Pages pour le site). Pas d'investisseurs a
remunerer, pas de churn a combattre avec des reductions, pas d'equipe a payer.
L'objectif est de couvrir les couts operationnels et de garder vivante une
communaute d'utilisateurs qui apprecient une approche honnete a l'epargne.

Si PluriFin devait un jour cesser ses operations, l'export GDPR vous redonne
toutes vos donnees dans un seul JSON portable -- et les plans Lifetime restent
accessibles a vie sur votre compte Google.

## A quoi s'attendre dans les prochains mois

- **Q2 2026**: lancement Play Store (Android), webapp gratuite deja en ligne
- **Q3 2026**: feedback recolte du Closed Testing, hotfix sur les crashes residuels
- **Q4 2026 / Q1 2027**: augmentation du nombre de brokers supportes (priorite: feedback utilisateurs)
- **Phase 2 (post-revenu)**: iOS, Apple Pay, marque EUIPO, assurance RC Tech eventuelle

Pour suivre le developpement en temps reel, le repo public
[portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data)
heberge la pipeline des donnees de marche et le site que vous etes en train de
lire. Le code de l'app Android reste closed-source pour des raisons de
compliance (cles de signature, anti-piracy, integrite du contexte Play
Billing), mais les specs de format CSV des brokers et les templates des
documents legaux sont publics.

A bientot.
