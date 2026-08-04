---
title: "Pourquoi j'ai construit PluriFin"
summary: "L'histoire personnelle derrière une app privacy-first pour investisseurs particuliers, et pourquoi un développeur seul peut offrir un plan à 4,99 EUR/an."
publishedAt: 2026-05-07
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: fr
tags: ["founder", "story", "personal-finance"]
---

Je travaille sur PluriFin depuis environ 18 mois, en part-time, tandis que mon
travail principal reste celui de développeur logiciel dans une entreprise
italienne. L'application n'est pas née comme un produit commercial: elle est
née comme outil personnel pour suivre un portefeuille multi-broker qui chaque
année devenait plus difficile à gérer avec des outils généralistes.

## Le problème

J'avais des positions réparties sur 4 brokers (Interactive Brokers, Trade
Republic, Fineco et Directa) en 3 devises (EUR, USD, GBP), avec des actifs de
nature mixte (actions individuelles, ETF cotés USA, ETF UCITS, quelques ETP
crypto, fonds obligataires). Chaque broker exporte dans un format CSV
différent, chaque broker a sa granularité de transaction, et chaque broker a
sa propre interprétation du "coût moyen d'acquisition" et du "P&amp;L réalisé".

Les outils généralistes que j'avais essayés (templates Google Sheets, quelques
services web italiens) ou bien ne comprenaient pas les CSV multi-broker, ou
bien exigeaient de leur livrer les identifiants API à un service cloud tiers.
Aucune des deux options n'était acceptable: les feuilles de calcul deviennent
ingérables au-delà de ~30 positions, et donner un token API read-only à un
service non auditable est un tradeoff que je ne suis pas disposé à accepter.

## La réponse personnelle, puis le produit

PluriFin est né comme projet interne avec trois contraintes rigides:

1. **Les données vivent sur l'appareil de l'utilisateur**, dans un stockage
   chiffré AES-256. Pas de cloud PluriFin obligatoire. L'export GDPR est à
   un clic.
2. **L'app ne parle jamais à un broker au nom de l'utilisateur**. Tout passe
   par l'import de fichiers CSV/PDF que l'utilisateur télécharge depuis son
   broker. Pas de clés API tierces détenues par PluriFin.
3. **Les fonctions IA sont optionnelles et utilisent les clés de l'utilisateur**.
   Si vous voulez l'analyse Gemini, vous saisissez votre clé API; elle reste
   dans le keystore de votre appareil.

Quand j'ai réalisé que le produit pouvait être utile à plus que moi, j'ai décidé
de le publier. Le modèle commercial est volontairement low-friction:

- 7 jours d'essai gratuit sans carte
- 4,99 EUR/an pour Single, 9,99 EUR/an pour Famille
- Lifetime paiement unique à 29,99 EUR (Single) ou 49,99 EUR (Famille)

Pas d'"early bird", pas de "premiers N utilisateurs", pas de promos qui
segmentent. Même prix pour tous, aujourd'hui et toujours.

## Pourquoi si peu cher

L'app coûte 25 USD une fois de Play Console et ~0 EUR d'hébergement (Cloudflare
free tier pour le Worker et GitHub Pages pour le site). Pas d'investisseurs à
rémunérer, pas de churn à combattre avec des réductions, pas d'équipe à payer.
L'objectif est de couvrir les coûts opérationnels et de garder vivante une
communauté d'utilisateurs qui apprécient une approche honnête à l'épargne.

Si PluriFin devait un jour cesser ses opérations, l'export GDPR vous redonne
toutes vos données dans un seul JSON portable -- et les plans Lifetime restent
accessibles à vie sur votre compte Google.

## À quoi s'attendre dans les prochains mois

- **Q2 2026**: lancement Play Store (Android), webapp gratuite déjà en ligne
- **Q3 2026**: feedback récolté du Closed Testing, hotfix sur les crashes résiduels
- **Q4 2026 / Q1 2027**: augmentation du nombre de brokers supportés (priorité: feedback utilisateurs)
- **Phase 2 (post-revenu)**: iOS, Apple Pay, marque EUIPO, assurance RC Tech éventuelle

Pour suivre le développement en temps réel, le repo public
[portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data)
héberge la pipeline des données de marché et le site que vous êtes en train de
lire. Le code de l'app Android reste closed-source pour des raisons de
compliance (clés de signature, anti-piracy, intégrité du contexte Play
Billing), mais les specs de format CSV des brokers et les templates des
documents légaux sont publics.

À bientôt.
