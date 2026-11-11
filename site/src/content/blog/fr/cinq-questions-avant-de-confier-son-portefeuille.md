---
title: "Cinq questions à poser à une application avant de lui confier son portefeuille"
summary: "Où vont les données, comment entrent les relevés, qui lit les questions posées à l’intelligence artificielle, ce que l’application ne fait pas et ce qu’elle coûte. Avec les réponses de Portfolio Manager."
publishedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Rédaction"
lang: "fr"
tags: ["portfolio-tracker", "investissement", "guide", "confidentialité"]
draft: false
---

Tenir dans un tableur un portefeuille réparti entre plusieurs courtiers, c’est recopier à la main ce que chaque relevé dit à sa façon. Qui s’en lasse cherche une application, et avant d’y charger ses relevés, mieux vaut lui poser cinq questions. Sous chacune figure la réponse de Portfolio Manager, l’application de PluriFin Finance : le lecteur peut la vérifier sur la démo web et dans la politique de confidentialité, et exiger la même clarté des autres.

## 1. Où vont les données

Trois réponses sont possibles :

- **Sur les serveurs de l’éditeur de l’application** : commode pour qui utilise plusieurs appareils, mais le portefeuille loge chez quelqu’un d’autre
- **Sur l’appareil, en clair** : c’est le cas du tableur, lisible par tout programme qui a accès aux fichiers
- **Sur l’appareil, chiffrées** : la clé naît sur le téléphone et y reste

Portfolio Manager est dans la troisième. Portefeuilles, positions et objectifs restent sur le téléphone, chiffrés en AES-256, avec une clé gardée par le système d’exploitation. PluriFin n’a pas d’archives où les conserver et ne demande pas d’ouvrir un compte. La démo web fait exception, et le déclare : ses données restent dans le navigateur, sans chiffrement.

Une application gratuite qui conserve les portefeuilles sur ses propres serveurs a un coût à couvrir. La question suivante est de savoir avec quoi elle le couvre.

## 2. Comment entrent les relevés

Il y a deux voies : confier à l’application les identifiants du courtier, ou importer les fichiers que le courtier exporte. Portfolio Manager ne connaît que la seconde : l’application ne se connecte à aucun compte et n’exécute aucun ordre.

Elle lit les CSV de onze courtiers : Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (aujourd’hui intégré à Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB et Revolut. Pour les autres, il y a un lecteur générique, auquel suffisent le symbole du titre et une colonne parmi quantité, valeur et prix. Elle accepte aussi les PDF, dont elle tente d’extraire le tableau.

À toute application, il faut demander si l’import de son propre relevé peut s’essayer avant de payer. Dans Portfolio Manager, oui : les sept jours d’essai ont toutes les fonctions et ne demandent pas de carte bancaire. Dans la démo web, non : les positions s’y saisissent à la main, cinq au maximum.

## 3. Qui lit les questions posées à l’intelligence artificielle

Une analyse du portefeuille écrite par un modèle suppose d’envoyer le portefeuille à celui qui exploite le modèle. Mieux vaut savoir par quels serveurs il passe et qui le conserve.

Dans Portfolio Manager, l’analyse est facultative et utilise Google Gemini, avec une clé que l’utilisateur saisit lui-même. La question et la composition du portefeuille (titres, quantités, prix moyens) vont du téléphone à Google sans passer par PluriFin, qui ne les conserve pas. Il en va de même pour les cours en temps réel : les symboles des titres vont au fournisseur que l’utilisateur choisit.

## 4. Ce que l’application ne fait pas

Portfolio Manager n’exécute aucun ordre et n’est pas un courtier. Les analyses de l’intelligence artificielle sont des pistes générées par un modèle : elles ne sont pas un conseil financier personnalisé et peuvent contenir des erreurs.

L’application ne calcule pas non plus les impôts. Les gains et les pertes affichés sont des calculs arithmétiques : cours actuel moins prix moyen, multiplié par la quantité. Ils ne tiennent compte ni de l’imposition des plus-values, ni du droit de timbre italien sur les titres, ni de l’imputation des moins-values. Pour la déclaration de revenus, l’avertissement financier de l’application renvoie à un expert-comptable ou à un conseiller fiscal.

Pour emporter ses données ailleurs, il y a « Exporter mes données », qui produit un fichier JSON avec tout le contenu.

## 5. Ce que cela coûte, et ce qui se passe quand on cesse de payer

Le vice du secteur, c’est l’essai qui demande la carte et l’abonnement qui démarre tout seul quand personne ne regarde. Dans Portfolio Manager, l’essai dure sept jours et ne connaît pas la carte de celui qui l’utilise : quand il se termine, aucun prélèvement ne part tout seul.

Viennent ensuite quatre formules, les mêmes pour tous, de 4,99 euros par an à 49,99 euros en une seule fois pour la famille. Aucune formule ne contient de publicité. Renouvellements, résiliation et remboursements sont sur la page [Tarifs](/fr/pricing).

L’essai terminé, il reste une version gratuite. Les positions se saisissent à la main, le rééquilibrage et les données de marché continuent de fonctionner ; l’import depuis les courtiers, les objectifs et l’intelligence artificielle s’arrêtent tant qu’on n’a pas choisi de formule. Dans tous les cas, les données restent sur le téléphone, exportables.

## Par où commencer

La [démo web](/app/) s’ouvre dans le navigateur, sans rien installer, avec des limites déclarées : cinq positions saisies à la main, pas d’import, pas d’objectifs, pas d’intelligence artificielle. Qui reste au tableur peut emporter les cinq questions : elles valent pour n’importe quelle application.

*Article paru en italien le 3 mai 2026 et réécrit le 11 novembre 2026 sur les faits d’aujourd’hui ; version française du 11 novembre 2026. Portfolio Manager est un outil d’information : ses contenus ne constituent pas un conseil financier, fiscal ou juridique.*
