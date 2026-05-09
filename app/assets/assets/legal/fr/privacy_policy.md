# Politique de Confidentialite -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Derniere mise a jour**: 2026-05-02
**Langue originale**: Italien (version contraignante pour la juridiction)

---

## 1. Responsable du traitement

- **Nom**: Filippo Salemi
- **Forme juridique**: personne physique (developpeur independant)
- **Marque commerciale**: PluriFin
- **Pays**: Italie
- **Email pour demandes RGPD et confidentialite**: `plurifin.app+gdpr@gmail.com`
- **Email general**: `plurifin.app@gmail.com`

Aucun Delegue a la Protection des Donnees (DPO) n'est designe: la
controleuse est une personne physique hors des cas obligatoires art. 37
RGPD.

## 2. Synthese (TL;DR)

- Toutes les donnees de portefeuille (positions, transactions, objectifs,
  parametres) sont **stockees uniquement sur l'appareil de l'utilisateur**
  sous forme chiffree. Nous ne les recevons pas, ne les stockons pas et ne
  les transmettons pas a des serveurs PluriFin.
- L'app **n'utilise aucun analytics tiers** (pas de Google Analytics,
  Firebase, Facebook SDK, AppsFlyer, Sentry par defaut).
- L'app **ne partage aucune donnee** avec annonceurs. Pas de publicite.
- Des **fonctionnalites optionnelles** existent qui, si activees, transmettent
  des donnees a des sous-traitants tiers: IA Gemini, prix marche temps reel
  (EODHD/FMP), validation abonnement (Cloudflare Worker). Chacune necessite
  action explicite.
- L'utilisateur peut exporter et supprimer toutes les donnees a tout moment
  depuis Parametres, sans contacter le controleur.

## 3. Categories de donnees

### 3.1 Donnees locales sur l'appareil

Chiffrees Hive AES-256 + cle dans le keystore systeme:

| Categorie | Exemples | Base juridique | Conservation |
|---|---|---|---|
| Donnees portefeuille | nom, ticker, quantite, prix moyen, broker, date | art. 6.1.b RGPD | Jusqu'a suppression |
| Objectifs financiers | titre, montant, echeance, contributions | art. 6.1.b RGPD | Jusqu'a suppression |
| Preferences | langue, devise, theme, notifications, mode demo | art. 6.1.b RGPD | Jusqu'a desinstallation |
| Audit consentements | timestamp, version doc, decision, hash texte | art. 6.1.c RGPD | Jusqu'a suppression |
| Cles API utilisateur | cles des fournisseurs actives: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (saisies manuellement) | art. 6.1.b RGPD | Jusqu'a suppression |

`flutter_secure_storage` (Android Keystore / iOS Keychain / DPAPI).

### 3.2 Donnees via Play Store (Google)

PluriFin recoit uniquement: `purchaseToken`, `productId`,
`device_id_hash` (HMAC-SHA256). PluriFin **ne** recoit pas nom, email,
adresse, donnees de paiement.

### 3.3 Validation abonnement (Cloudflare Worker)

Donnees envoyees: `device_id_hash`, `purchase_token`, `product_id`, JWT
signe. Reponse: JWT Ed25519. Pas de PII. Hash non identifiable sans le
sel serveur.

### 3.4 Donnees a Gemini (uniquement si active)

Si l'utilisateur saisit sa cle Gemini et utilise l'IA, le prompt (question
+ structure portefeuille anonyme) est transmis directement a Google
Gemini. Application des [Google Gemini API Terms](https://ai.google.dev/terms).

### 3.5 Donnees aux fournisseurs de donnees de marche (uniquement si active)

L'app supporte 10 fournisseurs de donnees de marche que l'utilisateur peut
configurer independamment en saisissant sa propre API key dans Parametres.
A chaque rafraichissement de prix, l'app transmet les tickers demandes
directement au fournisseur choisi. PluriFin n'intermedie ni ne stocke.

Fournisseurs supportes et politiques de confidentialite:

- [EODHD](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage](https://www.alphavantage.co/privacy/)
- [Twelve Data](https://twelvedata.com/privacy)
- [Finnhub](https://finnhub.io/privacy-policy)
- [Polygon.io](https://polygon.io/privacy)
- [Marketstack](https://marketstack.com/privacy)
- [Tiingo](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): telechargement CSV public sans API key (la
  requete HTTP va directement de l'appareil vers stooq.com)

Pour chaque fournisseur, la transmission se produit **uniquement** si
l'utilisateur:
1. a saisi sa cle API dans Parametres (Stooq exclu, gratuit);
2. a selectionne le fournisseur comme actif pour le rafraichissement.

L'utilisateur peut retirer la cle ou desactiver le fournisseur a tout
moment.

## 4. Sous-traitants

| Sous-traitant | Finalite | Donnees | Quand |
|---|---|---|---|
| Google Play Billing | Paiement abonnement | purchaseToken, productId | Achat seulement |
| Google Gemini API | Analyse IA | Prompt + portefeuille anonyme | Activation seulement |
| EODHD | Prix temps reel et historiques | Liste tickers | Activation seulement |
| FMP | Prix temps reel, fondamentaux | Liste tickers | Activation seulement |
| Alpha Vantage | Prix historiques | Liste tickers | Activation seulement |
| Twelve Data | Prix temps reel et historiques | Liste tickers | Activation seulement |
| Finnhub | Prix temps reel | Liste tickers | Activation seulement |
| Polygon.io | Prix historiques | Liste tickers | Activation seulement |
| Marketstack | Prix end-of-day | Liste tickers | Activation seulement |
| Tiingo | Prix temps reel et historiques | Liste tickers | Activation seulement |
| Nasdaq Data Link | Prix historiques | Liste tickers | Activation seulement |
| Stooq | Telechargement CSV public prix historiques | Liste tickers (sans API key) | Activation Stooq seulement |
| Cloudflare Worker | Validation abonnement | device_id_hash, JWT | Toujours (gating) |
| GitHub Pages | Hosting docs/webapp/site | IP request | Chaque visite |

## 5. Transferts hors UE

Google, Cloudflare, GitHub: societes USA. Bases:

- Clauses Contractuelles Types UE 2021/914
- EU-US Data Privacy Framework (Google)
- Politiques propres (EODHD, FMP)

Pour eviter transferts hors UE: ne pas activer les fonctions optionnelles.

## 6. Droits de la personne concernee (arts. 15-22 RGPD)

| Droit | Comment exercer |
|---|---|
| Acces | Parametres > Confidentialite > Exporter mes donnees (ZIP) |
| Rectification | Edition directe in-app |
| Effacement | Parametres > Confidentialite > Supprimer toutes les donnees / desinstaller |
| Limitation | Desactiver fonctions optionnelles |
| Portabilite | Parametres > Exporter (JSON+CSV) |
| Opposition | Desactiver fonctions optionnelles |
| Reclamation | [Garante (Italie)](https://www.garanteprivacy.it/), CNIL (France) ou autorite nationale |

Demandes: `plurifin.app+gdpr@gmail.com`. Reponse 30 jours (art. 12.3 RGPD).

## 7. Conservation

Donnees locales jusqu'a suppression utilisateur. Audit consentements:
jusqu'a export et suppression explicites. Sous-traitants: politique
propre.

## 8. Securite

- Hive AES-256 + HMAC-SHA256
- `flutter_secure_storage`
- HTTPS uniquement (TLS 1.2+)
- `FLAG_SECURE` Android sur pages sensibles
- `allowBackup=false`
- Detection root/jailbreak avec degradation graceful
- Obfuscation Dart en release

## 9. Mineurs (art. 8 RGPD)

App non destinee aux moins de 18 ans. Content rating Play "18+".
Parents/tuteurs peuvent demander suppression a `plurifin.app+gdpr@gmail.com`.

## 10. Cookies

App mobile: aucun cookie. Webapp: `localStorage` + cookie technique
GitHub Pages. Site vitrine: GoatCounter self-hosted (sans cookie, sans
fingerprinting).

## 11. Modifications

Notification via app (re-consent), banniere site (30 jours), email
newsletter. Versions precedentes dans repo
`lunapiena49/portfoliomanager-data`, historique Git.

## 12. Contacts

- RGPD: `plurifin.app+gdpr@gmail.com`
- Confidentialite: `plurifin.app+privacy@gmail.com`
- Support: `plurifin.app+support@gmail.com`
- Public Play Store: `plurifin.app@gmail.com`

## 13. Juridiction et loi applicable

Loi italienne et RGPD. Pour consommateurs: for du consommateur selon
D.Lgs. 206/2005 (Italie) ou regles nationales plus protectrices.
