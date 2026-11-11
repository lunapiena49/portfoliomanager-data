---
title: "Portfolio Manager repose sur trois interdits"
summary: "Pas d’archives des portefeuilles, pas de connexion aux comptes, pas d’intelligence artificielle sans la clé de l’utilisateur. La grille tarifaire de quatre lignes vient de là."
publishedAt: 2026-05-07
updatedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Rédaction"
lang: fr
tags: ["portfolio-manager", "confidentialité", "tarifs"]
---

Les applications de finance se présentent par la liste de ce qu’elles font. Portfolio Manager, l’application de PluriFin Finance, se comprend d’abord par ce qu’elle ne peut pas faire. Elle n’a pas d’archives où garder les portefeuilles, ne se connecte pas aux comptes et n’utilise pas l’intelligence artificielle sans une clé de l’utilisateur. Ce sont trois interdits, et la grille tarifaire de quatre lignes en est la conséquence.

## Premier interdit : pas d’archives des portefeuilles

Le portefeuille reste sur le téléphone de son propriétaire, chiffré en AES-256, avec une clé gardée par le système d’exploitation. PluriFin ne conserve pas les portefeuilles et ne demande pas d’ouvrir un compte. Pour vérifier l’essai et l’abonnement, il lui suffit d’une empreinte anonyme de l’appareil et du reçu de l’achat.

Une application de finance gratuite qui conserve les portefeuilles sur ses propres serveurs a un coût à couvrir. Avant de l’installer, mieux vaut demander avec quoi elle le couvre.

Deux choses doivent être dites en entier. La démo web garde ses données dans le navigateur, sans chiffrement : elle sert à voir comment l’application est faite, pas à garder un vrai portefeuille. Les rapports de plantage (Firebase Crashlytics) ne partent que si l’utilisateur active le diagnostic dans les paramètres, et ne contiennent aucune donnée de portefeuille.

La sortie est prévue autant que l’entrée : « Exporter mes données » produit un fichier JSON avec tout le contenu, « Effacer toutes les données » le supprime du téléphone.

## Deuxième interdit : pas de connexion aux comptes

L’application ne demande pas les identifiants d’un courtier et n’exécute aucun ordre. Les données entrent parce que leur propriétaire les apporte, un fichier à la fois. Portfolio Manager reconnaît les CSV de onze courtiers, montre un aperçu des lignes à corriger et traite les doublons avant d’enregistrer. Pour les autres intermédiaires, il y a un lecteur générique, et l’application tente d’extraire le tableau des PDF.

C’est plus lent qu’une connexion automatique. C’est aussi la raison pour laquelle personne n’a à confier à PluriFin les identifiants de sa banque.

## Troisième interdit : l’intelligence artificielle, seulement avec la clé de l’utilisateur

L’analyse par intelligence artificielle est facultative. Elle utilise Google Gemini avec une clé que l’utilisateur saisit lui-même et que garde le système d’exploitation du téléphone. Qui l’active envoie à Google sa question et la composition du portefeuille : titres, quantités, prix moyens. La requête part du téléphone et ne passe pas par PluriFin, qui ne la conserve pas.

Les réponses sont des pistes générées par un modèle, pas un conseil financier personnalisé, et peuvent contenir des erreurs. Les décisions restent celles de l’investisseur.

## La grille tarifaire qui en découle

Une entreprise qui ne conserve pas les portefeuilles ne paie pas pour les conserver, et une entreprise qui n’affiche pas de publicité n’a pas d’annonceurs à contenter. Reste une application, avec son prix : sept jours d’essai sans carte bancaire, puis quatre formules, les mêmes pour tous, de 4,99 euros par an à 49,99 euros en une seule fois pour la famille.

L’essai terminé, il reste une version gratuite. Les positions se saisissent à la main, le rééquilibrage et les données de marché continuent de fonctionner ; l’import depuis les courtiers, les objectifs et l’intelligence artificielle s’arrêtent tant qu’on n’a pas choisi de formule. Les tarifs complets, avec renouvellements et remboursements, sont sur la page [Tarifs](/fr/pricing).

## Où vérifier ce qui est écrit ici

Le code de ce site et le flux des données de marché sont publics dans le dépôt [portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data). Ce que l’application fait des données est écrit en toutes lettres dans la [politique de confidentialité](/fr/privacy), en six langues. La [démo web](/app/) s’ouvre dans le navigateur, sans rien installer.

*Article du 7 mai 2026, réécrit le 11 novembre 2026 sur les faits d’aujourd’hui.*
