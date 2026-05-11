# Avertissement Financier -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Dernière mise à jour**: 2026-05-02
**Langue originale**: Italien (version contraignante pour la juridiction)

---

> **AVIS IMPORTANT -- LIRE AVANT D'UTILISER L'APP**
>
> Portfolio Manager est un outil informatif. Les informations, données,
> graphiques, suggestions de rebalancement et analyses IA affichés **NE
> constituent en aucun cas un conseil financier, une recommandation
> d'investissement, une sollicitation publique de l'épargne ou un service
> d'investissement** au sens du TUF italien (D.Lgs. 58/1998), de la
> directive MiFID II (2014/65/UE) et règles équivalentes nationales.
> L'Utilisateur assume seul la responsabilité de ses décisions
> d'investissement.

---

## 1. Nature informative

Tout ce que l'App affiche a un **but exclusivement informatif, descriptif
et éducatif**. L'App **ne**:

- Ne donne pas de conseils personnalisés d'investissement
- Ne suggère pas d'instruments ou opérations spécifiques
- N'exprime pas d'opinion sur l'adéquation à la situation patrimoniale,
  objectifs, tolérance au risque
- N'exécute pas d'ordres, pas de relations avec brokers
- Ne détient pas fonds ou instruments

## 2. Références normatives

- **Art. 1.5-septies TUF**: définition "consulenza in materia di
  investimenti". L'App **n'entre pas** dans cette définition.
- **Art. 18-bis et 18-ter TUF**: réserve aux personnes inscrites à l'OCF.
  PluriFin/Filippo Salemi **n'est pas inscrit**.
- **Art. 1.5.d TUF**: gestion de portefeuilles. L'App **ne gère pas**,
  affiche les données de l'Utilisateur.
- **MiFID II et MiFIR**: l'App ne fournit aucun service réservé.
- **Reg. UE 2017/565**: l'App n'est pas soumise à évaluation
  d'adéquation/appropriation, n'offrant aucun service.

## 3. Analyses IA -- avertissements spécifiques

### 3.1 Modèle probabiliste

Les LLM génèrent du texte **probabilistement**. Même question -> réponses
différentes.

### 3.2 Hallucinations

Peuvent produire des **affirmations fausses mais plausibles** sur noms
d'instruments, ISIN, performance historique, dividendes, règles fiscales,
composition d'indices, dates ex-dividende. **Vérifier toujours** avec
sources officielles.

### 3.3 Cutoff temporel

Modèle ne connaît pas événements postérieurs à sa date de cutoff.

### 3.4 Pas de recommandations personnalisées

Même si le prompt inclut le portefeuille, les réponses IA **ne sont pas
des conseils personnalisés**: le modèle ne connaît pas situation
patrimoniale globale, revenus, liquidité, horizon, tolérance, fiscalité,
objectifs retraite.

### 3.5 Pas de "Know Your Customer"

App ne collecte pas profil de risque. Non soumise à évaluation MiFID II
d'adéquation/appropriation.

## 4. Suggestions de rebalancement

Calculs arithmétiques sur paramètres user-defined. **Pas de
recommandations** d'achat/vente. App n'évalue pas: timing marché, impact
fiscal, coûts transaction, liquidité, concentration. Consulter
**conseiller financier autorisé**.

## 5. Données marché

Données sources publiques ou EODHD/FMP (clés utilisateur). Possibles
délais 15-20 min, erreurs sur splits/dividendes/changements ticker.
PluriFin sans responsabilité.

## 6. Calculs fiscaux

App **ne calcule pas** la fiscalité. Plus-values/moins-values affichées
sont calculs bruts sans considérer: taxation, bollo titoli (Italie),
IVAFE, déductions, holding period, traitement UCITS/non-UCITS,
succession. Consulter **expert-comptable ou conseiller fiscal**.

## 7. Marchés étrangers et devises

Considérer: risque change, coûts conversion, double imposition (W-8BEN
USA), reporting actifs étranger, résidence fiscale. App **ne modélise
aucun**.

## 8. Sécurité personnelle

- Clés API en keystore SO -> accessibles si appareil déverrouillé
- Appareil perdu verrouillé: protégé; déverrouillé: expose données
- Backups Google Drive désactivés par défaut

PluriFin n'est pas responsable de: vol/perte avec déverrouillage,
mauvaise config lock, compromission, partage des clés API, export manuel
et distribution incontrôlée.

## 9. Mises à jour normatives

Règles fiscales et réglementaires **changent fréquemment**. App ne
garantit pas calculs, exemples ou réponses IA à jour. Vérifier
réglementation en vigueur.

## 10. Décisions de l'Utilisateur -- exonération

L'Utilisateur déclare et accepte que:

1. Usage de App, données et analyses est à son initiative et risque
   exclusifs
2. Décisions d'investissement sont **exclusivement les siennes**
3. PluriFin n'est pas responsable, dans limites légales, des pertes ou
   conséquences fiscales
4. Pour décisions importantes, consulter **conseiller financier autorisé**
   (OCF: <https://www.organismocf.it> ou équivalent national comme CIF en
   France)

## 11. Mineurs

App **non destinée aux mineurs de 18 ans**. Content rating Play
"Everyone / 18+". Parents/tuteurs responsables.

## 12. Géolocalisation

App conçue pour marché italien et zone Euro. Utilisateurs hors zone
doivent vérifier conformité locale. PluriFin sans responsabilité pour
interprétations divergentes.

## 13. Acceptation explicite

En acceptant ce Disclaimer au premier lancement (ou après bump version),
l'Utilisateur déclare avoir lu, compris la nature informative, les
limitations IA, et libère PluriFin/Filippo Salemi dans limites légales.

Acceptation enregistrée dans `consent_box` chiffré (timestamp UTC,
version, hash SHA-256 texte).

Sans acceptation: rebalancement, IA et import bloqués; uniquement lecture
légales et réglages.

## 14. Juridiction

Loi italienne. Disputes: voir ToS.

## 15. Contacts

`plurifin.app+legal@gmail.com`. PluriFin **ne fournit pas de conseil
financier par email**. Pour cela, conseiller autorisé (OCF ou
équivalent).
