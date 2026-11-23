# Politique de Confidentialité -- Portfolio Manager by PluriFin

**Version**: 1.0.5
**Dernière mise à jour**: 2026-11-22
**Langue originale**: Italien (version contraignante pour la juridiction)

---

## 1. Responsable du traitement

- **Nom**: Filippo Salemi
- **Forme juridique**: personne physique (développeur indépendant)
- **Marque commerciale**: PluriFin
- **Pays**: Italie
- **Email pour demandes RGPD et confidentialité**: `gdpr@plurifin.app`
- **Email général**: `info@plurifin.app`

Aucun Délégué à la Protection des Données (DPO) n'est désigné: le
responsable est une personne physique hors des cas obligatoires art. 37
RGPD.

## 2. Synthèse (TL;DR)

- Toutes les données de portefeuille (positions, transactions, objectifs,
  paramètres) sont **stockées uniquement sur l'appareil de l'utilisateur**
  sous forme chiffrée. Nous ne les recevons pas, ne les stockons pas et ne
  les transmettons pas à des serveurs PluriFin.
- L'app **n'utilise aucun analytics tiers actif** dans cette version (pas
  de Facebook SDK, AppsFlyer, Sentry, ni d'événements Google Analytics
  générés par l'app). Une propriété Google Analytics for Firebase (GA4)
  est liée au projet Firebase `portfolio-manager-f6f8d` pour de futures
  évolutions : la version 1.0.0+10 n'inclut pas le SDK
  `firebase_analytics`, le binaire de l'app ne génère donc aucun
  événement d'analytique. Voir section 4 (sous-traitants) pour la
  déclaration complète.
- Sur Android, l'app intègre un **diagnostic de crash anonyme optionnel via Firebase Crashlytics** (Google Ireland Limited) : désactivé par défaut, activable par l'utilisateur depuis Paramètres > Confidentialité. Jamais de données de portefeuille, clés API ou contenu IA. Il couvre aussi les **échecs de démarrage que l'app a traités elle-même** (par exemple le stockage local impossible à ouvrir). Lorsque l'option est désactivée, rien n'est transmis ; les rapports ne sont pas supprimés pour autant : le SDK Crashlytics **les conserve sur l'appareil** et ne les envoie que si et quand vous activez l'option. Ils résident dans l'espace de l'app, donc la désinstaller ou effacer ses données les supprime. Voir section 4 (sous-traitants).
- L'app **ne partage aucune donnée** avec annonceurs. Pas de publicité.
- Des **fonctionnalités optionnelles** existent qui, si activées, transmettent
  des données à des sous-traitants tiers: IA Gemini et prix marché temps réel
  des fournisseurs que l'utilisateur configure avec sa propre clé (EODHD, FMP
  et les autres de la section 3.5). Chacune nécessite action explicite.
- L'essai gratuit et l'abonnement sont enregistrés **uniquement sur
  l'appareil** : l'app n'envoie aux serveurs de PluriFin ni le reçu d'achat
  ni un identifiant de l'appareil (sections 3.2 et 3.3).
- L'utilisateur peut exporter et supprimer toutes les données à tout moment
  depuis Paramètres, sans contacter le responsable.

## 3. Catégories de données

### 3.1 Données locales sur l'appareil

Restent **uniquement** sur l'appareil, dans un stockage local chiffré (Hive
AES-256 + clé dans le keystore système):

| Catégorie | Exemples | Base juridique | Conservation |
|---|---|---|---|
| Données portefeuille | nom, ticker, quantité, prix moyen, broker, date | art. 6.1.b RGPD | Jusqu'à suppression |
| Objectifs financiers | titre, montant, échéance, contributions | art. 6.1.b RGPD | Jusqu'à suppression |
| Préférences | langue, devise, thème, notifications, mode démo | art. 6.1.b RGPD | Jusqu'à désinstallation |
| Audit consentements | timestamp, version doc, décision, hash texte | art. 6.1.c RGPD | Jusqu'à suppression |
| Clés API utilisateur | clés des fournisseurs activés: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (saisies manuellement) | art. 6.1.b RGPD | Jusqu'à suppression |

Chiffrement AES-256 en mode CBC ; la clé de 32 octets est dans le keystore
système (Android Keystore / iOS Keychain / DPAPI). L'intégrité de chaque
enregistrement est contrôlée par un code CRC32 : il détecte un enregistrement
endommagé ou lu avec la mauvaise clé. Ce n'est pas une signature
cryptographique (ce n'est pas un HMAC) et il ne protège pas contre une
modification faite exprès par quelqu'un qui a déjà accès aux fichiers de
l'app. Les clés API sont enregistrées dans `flutter_secure_storage`, qui
utilise le même keystore.

Restent en revanche **non chiffrés**, dans les préférences système réservées
à l'app (SharedPreferences), quelques réglages techniques sans données de
portefeuille : la langue choisie (que la bibliothèque de traduction, easy_localization, enregistre aussi ici), le choix sur le diagnostic des plantages, la fin de
l'introduction, la prise de connaissance des écrans d'information, les
indicateurs des migrations internes déjà effectuées et les compteurs qui
décident quand demander un avis sur Google Play (nombre d'imports, nombre de
positions saisies à la main, date de la dernière demande).

### 3.2 Achats via Google Play

Le paiement est entièrement géré par Google Play : PluriFin **ne** reçoit
pas nom, email, adresse ni données de paiement.

Après un achat, Google Play communique à l'app, sur l'appareil, le résultat
et l'identifiant du produit acheté (`productId` : l'une des quatre variantes
Premium, annuelle ou à vie, individuelle ou famille). L'app conserve
l'abonnement actif dans le stockage local chiffré (section 3.1). Dans cette
version l'app **n'envoie pas** le reçu d'achat (`purchaseToken`) ni d'autres
données de l'achat à des serveurs de PluriFin : le reçu retourne uniquement à
Google Play, qui l'utilise pour confirmer l'achat.

### 3.3 Essai gratuit et empreinte de l'appareil (Android uniquement)

Au premier lancement l'app démarre l'essai gratuit de 7 jours et
l'enregistre uniquement sur l'appareil. Pour cela elle calcule un
`device_id_hash` : l'empreinte SHA-256 d'une valeur aléatoire de 32 octets,
générée à la première exécution et conservée dans le keystore système
(`flutter_secure_storage`). L'empreinte **ne** dérive **pas** de l'Android ID
ni d'autres identifiants de l'appareil ou de l'utilisateur, et n'utilise
aucune valeur fournie par un serveur.

L'empreinte reste dans le stockage local chiffré avec les dates de début et
de fin de l'essai ; dans cette version elle **n'est pas** envoyée à PluriFin
ni à des tiers. La désinstallation de l'app efface la valeur aléatoire, et
une nouvelle installation génère une empreinte différente.

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
| Google Play Billing | Paiement abonnement | Données de paiement et d'achat, traitées par Google : PluriFin ne les reçoit pas | Achat seulement |
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
| Google Ireland Limited -- Firebase Crashlytics | Diagnostic de crash anonyme | Trace d'appel offusquée, modèle d'appareil, OS, version de l'app, Firebase Installation ID anonyme | Seulement si l'utilisateur active "Diagnostic de crash anonyme" dans Paramètres > Confidentialité. Désactivé par défaut. Les rapports produits pendant que l'option est désactivée (crashes et échecs de démarrage traités) restent sur l'appareil, conservés par le SDK, et ne sont transmis qu'après activation par l'utilisateur. |
| Google LLC -- Google Analytics for Firebase (GA4) | Préparation future pour analytique agrégée de stabilité (propriété GA4 liée au projet Firebase) | **Aucune donnée transmise dans la version 1.0.0+10** (le SDK `firebase_analytics` n'est pas dans pubspec). Lorsque `firebase_analytics` sera intégré dans une version future, GA4 recevra des événements auto-collectés (vues d'écran, app_start/app_foreground, `app_exception` agrégé depuis Crashlytics). L'utilisateur sera re-consenté à ce moment | Inactif dans la version 1.0.0+10. Activé uniquement après une mise à jour future de l'app + re-consentement utilisateur. |
| Cloudflare, Inc. -- réseau devant le domaine `plurifin.app` | Diffusion du site, des documents légaux, de la webapp démo et des données de marché publiques | Journaux techniques d'accès (IP, user-agent, heure) | Chaque fois que l'app ou le navigateur télécharge une ressource du domaine `plurifin.app` |
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

Demandes: `gdpr@plurifin.app`. Réponse 30 jours (art. 12.3 RGPD).

## 7. Conservation

Données locales jusqu'à suppression utilisateur. Audit consentements:
jusqu'à export et suppression explicites. Essai gratuit et abonnement :
uniquement sur l'appareil (sections 3.2 et 3.3), aucune copie chez
PluriFin. Sous-traitants: politique propre.

## 8. Sécurité

- Hive AES-256 (CBC) avec contrôle d'intégrité CRC32 (pas un HMAC)
- `flutter_secure_storage`
- HTTPS uniquement (TLS 1.2+)
- `FLAG_SECURE` Android sur pages sensibles
- `allowBackup=false`
- Détection root/jailbreak avec dégradation graceful
- Obfuscation Dart en release

## 9. Mineurs (art. 8 RGPD)

App non destinée aux moins de 18 ans. Public : adultes uniquement (18+).
Parents/tuteurs peuvent demander suppression à `gdpr@plurifin.app`.

## 10. Cookies

App mobile: aucun cookie. Webapp: `localStorage` + cookie technique
GitHub Pages. Site vitrine: GoatCounter self-hosted (sans cookie, sans
fingerprinting).

## 11. Modifications

Notification via app (re-consent). Versions précédentes dans repo
`lunapiena49/portfoliomanager-data`, historique Git.

## 12. Contacts

- RGPD: `gdpr@plurifin.app`
- Confidentialité: `privacy@plurifin.app`
- Support: `support@plurifin.app`
- Legal: `legal@plurifin.app`
- Public Play Store: `info@plurifin.app`

## 13. Juridiction et loi applicable

Loi italienne et RGPD. Pour consommateurs: for du consommateur selon
D.Lgs. 206/2005 (Italie) ou règles nationales plus protectrices.

En cas de divergence entre les versions linguistiques du présent document, le texte italien prévaut.
