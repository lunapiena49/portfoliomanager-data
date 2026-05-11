# Politique de Confidentialité -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Dernière mise à jour**: 2026-05-02
**Langue originale**: Italien (version contraignante pour la juridiction)

---

## 1. Responsable du traitement

- **Nom**: Filippo Salemi
- **Forme juridique**: personne physique (développeur indépendant)
- **Marque commerciale**: PluriFin
- **Pays**: Italie
- **Email pour demandes RGPD et confidentialité**: `plurifin.app+gdpr@gmail.com`
- **Email général**: `plurifin.app@gmail.com`

Aucun Délégué à la Protection des Données (DPO) n'est désigné: le
responsable est une personne physique hors des cas obligatoires art. 37
RGPD.

## 2. Synthèse (TL;DR)

- Toutes les données de portefeuille (positions, transactions, objectifs,
  paramètres) sont **stockées uniquement sur l'appareil de l'utilisateur**
  sous forme chiffrée. Nous ne les recevons pas, ne les stockons pas et ne
  les transmettons pas à des serveurs PluriFin.
- L'app **n'utilise aucun analytics tiers** (pas de Google Analytics,
  Firebase, Facebook SDK, AppsFlyer, Sentry par défaut).
- L'app **ne partage aucune donnée** avec annonceurs. Pas de publicité.
- Des **fonctionnalités optionnelles** existent qui, si activées, transmettent
  des données à des sous-traitants tiers: IA Gemini, prix marché temps réel
  (EODHD/FMP), validation abonnement (Cloudflare Worker). Chacune nécessite
  action explicite.
- L'utilisateur peut exporter et supprimer toutes les données à tout moment
  depuis Paramètres, sans contacter le responsable.

## 3. Catégories de données

### 3.1 Données locales sur l'appareil

Chiffrées Hive AES-256 + clé dans le keystore système:

| Catégorie | Exemples | Base juridique | Conservation |
|---|---|---|---|
| Données portefeuille | nom, ticker, quantité, prix moyen, broker, date | art. 6.1.b RGPD | Jusqu'à suppression |
| Objectifs financiers | titre, montant, échéance, contributions | art. 6.1.b RGPD | Jusqu'à suppression |
| Préférences | langue, devise, thème, notifications, mode démo | art. 6.1.b RGPD | Jusqu'à désinstallation |
| Audit consentements | timestamp, version doc, décision, hash texte | art. 6.1.c RGPD | Jusqu'à suppression |
| Clés API utilisateur | clés des fournisseurs activés: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (saisies manuellement) | art. 6.1.b RGPD | Jusqu'à suppression |

`flutter_secure_storage` (Android Keystore / iOS Keychain / DPAPI).

### 3.2 Données via Play Store (Google)

PluriFin reçoit uniquement: `purchaseToken`, `productId`,
`device_id_hash` (HMAC-SHA256). PluriFin **ne** reçoit pas nom, email,
adresse, données de paiement.

### 3.3 Validation abonnement (Cloudflare Worker)

Données envoyées: `device_id_hash`, `purchase_token`, `product_id`, JWT
signé. Réponse: JWT Ed25519. Pas de PII. Hash non identifiable sans le
sel serveur.

### 3.4 Données à Gemini (uniquement si activé)

Si l'utilisateur saisit sa clé Gemini et utilise l'IA, le prompt (question
+ structure portefeuille anonyme) est transmis directement à Google
Gemini. Application des [Google Gemini API Terms](https://ai.google.dev/terms).

### 3.5 Données aux fournisseurs de données de marché (uniquement si activé)

L'app supporte 10 fournisseurs de données de marché que l'utilisateur peut
configurer indépendamment en saisissant sa propre API key dans Paramètres.
À chaque rafraîchissement de prix, l'app transmet les tickers demandés
directement au fournisseur choisi. PluriFin n'intermédie ni ne stocke.

Fournisseurs supportés et politiques de confidentialité:

- [EODHD](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage](https://www.alphavantage.co/privacy/)
- [Twelve Data](https://twelvedata.com/privacy)
- [Finnhub](https://finnhub.io/privacy-policy)
- [Polygon.io](https://polygon.io/privacy)
- [Marketstack](https://marketstack.com/privacy)
- [Tiingo](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): téléchargement CSV public sans API key (la
  requête HTTP va directement de l'appareil vers stooq.com)

Pour chaque fournisseur, la transmission se produit **uniquement** si
l'utilisateur:
1. a saisi sa clé API dans Paramètres (Stooq exclu, gratuit);
2. a sélectionné le fournisseur comme actif pour le rafraîchissement.

L'utilisateur peut retirer la clé ou désactiver le fournisseur à tout
moment.

## 4. Sous-traitants

| Sous-traitant | Finalité | Données | Quand |
|---|---|---|---|
| Google Play Billing | Paiement abonnement | purchaseToken, productId | Achat seulement |
| Google Gemini API | Analyse IA | Prompt + portefeuille anonyme | Activation seulement |
| EODHD | Prix temps réel et historiques | Liste tickers | Activation seulement |
| FMP | Prix temps réel, fondamentaux | Liste tickers | Activation seulement |
| Alpha Vantage | Prix historiques | Liste tickers | Activation seulement |
| Twelve Data | Prix temps réel et historiques | Liste tickers | Activation seulement |
| Finnhub | Prix temps réel | Liste tickers | Activation seulement |
| Polygon.io | Prix historiques | Liste tickers | Activation seulement |
| Marketstack | Prix end-of-day | Liste tickers | Activation seulement |
| Tiingo | Prix temps réel et historiques | Liste tickers | Activation seulement |
| Nasdaq Data Link | Prix historiques | Liste tickers | Activation seulement |
| Stooq | Téléchargement CSV public prix historiques | Liste tickers (sans API key) | Activation Stooq seulement |
| Cloudflare Worker | Validation abonnement | device_id_hash, JWT | Toujours (gating) |
| GitHub Pages | Hosting docs/webapp/site | IP request | Chaque visite |

## 5. Transferts hors UE

Google, Cloudflare, GitHub: sociétés USA. Bases:

- Clauses Contractuelles Types UE 2021/914
- EU-US Data Privacy Framework (Google)
- Politiques propres (EODHD, FMP)

Pour éviter transferts hors UE: ne pas activer les fonctions optionnelles.

## 6. Droits de la personne concernée (arts. 15-22 RGPD)

| Droit | Comment exercer |
|---|---|
| Accès | Paramètres > Confidentialité > Exporter mes données (ZIP) |
| Rectification | Édition directe in-app |
| Effacement | Paramètres > Confidentialité > Supprimer toutes les données / désinstaller |
| Limitation | Désactiver fonctions optionnelles |
| Portabilité | Paramètres > Exporter (JSON+CSV) |
| Opposition | Désactiver fonctions optionnelles |
| Réclamation | [Garante (Italie)](https://www.garanteprivacy.it/), CNIL (France) ou autorité nationale |

Demandes: `plurifin.app+gdpr@gmail.com`. Réponse 30 jours (art. 12.3 RGPD).

## 7. Conservation

Données locales jusqu'à suppression utilisateur. Audit consentements:
jusqu'à export et suppression explicites. Sous-traitants: politique
propre.

## 8. Sécurité

- Hive AES-256 + HMAC-SHA256
- `flutter_secure_storage`
- HTTPS uniquement (TLS 1.2+)
- `FLAG_SECURE` Android sur pages sensibles
- `allowBackup=false`
- Détection root/jailbreak avec dégradation graceful
- Obfuscation Dart en release

## 9. Mineurs (art. 8 RGPD)

App non destinée aux moins de 18 ans. Content rating Play "18+".
Parents/tuteurs peuvent demander suppression à `plurifin.app+gdpr@gmail.com`.

## 10. Cookies

App mobile: aucun cookie. Webapp: `localStorage` + cookie technique
GitHub Pages. Site vitrine: GoatCounter self-hosted (sans cookie, sans
fingerprinting).

## 11. Modifications

Notification via app (re-consent), bannière site (30 jours), email
newsletter. Versions précédentes dans repo
`lunapiena49/portfoliomanager-data`, historique Git.

## 12. Contacts

- RGPD: `plurifin.app+gdpr@gmail.com`
- Confidentialité: `plurifin.app+privacy@gmail.com`
- Support: `plurifin.app+support@gmail.com`
- Legal: `plurifin.app+legal@gmail.com`
- Public Play Store: `plurifin.app@gmail.com`

## 13. Juridiction et loi applicable

Loi italienne et RGPD. Pour consommateurs: for du consommateur selon
D.Lgs. 206/2005 (Italie) ou règles nationales plus protectrices.
