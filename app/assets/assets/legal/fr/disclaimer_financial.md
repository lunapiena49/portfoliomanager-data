# Avertissement Financier -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Derniere mise a jour**: 2026-05-02
**Langue originale**: Italien (version contraignante pour la juridiction)

---

> **AVIS IMPORTANT -- LIRE AVANT D'UTILISER L'APP**
>
> Portfolio Manager est un outil informatif. Les informations, donnees,
> graphiques, suggestions de rebalancement et analyses IA affiches **NE
> constituent en aucun cas un conseil financier, une recommandation
> d'investissement, une sollicitation publique de l'epargne ou un service
> d'investissement** au sens du TUF italien (D.Lgs. 58/1998), de la
> directive MiFID II (2014/65/UE) et regles equivalentes nationales.
> L'Utilisateur assume seul la responsabilite de ses decisions
> d'investissement.

---

## 1. Nature informative

Tout ce que l'App affiche a un **but exclusivement informatif, descriptif
et educatif**. L'App **ne**:

- Ne donne pas de conseils personnalises d'investissement
- Ne suggere pas d'instruments ou operations specifiques
- N'exprime pas d'opinion sur l'adequation a la situation patrimoniale,
  objectifs, tolerance au risque
- N'execute pas d'ordres, pas de relations avec brokers
- Ne detient pas fonds ou instruments

## 2. References normatives

- **Art. 1.5-septies TUF**: definition "consulenza in materia di
  investimenti". L'App **n'entre pas** dans cette definition.
- **Art. 18-bis et 18-ter TUF**: reserve aux personnes inscrites a l'OCF.
  PluriFin/Filippo Salemi **n'est pas inscrit**.
- **Art. 1.5.d TUF**: gestion de portefeuilles. L'App **ne gere pas**,
  affiche les donnees de l'Utilisateur.
- **MiFID II et MiFIR**: l'App ne fournit aucun service reserve.
- **Reg. UE 2017/565**: l'App n'est pas soumise a evaluation
  d'adequation/appropriation, n'offrant aucun service.

## 3. Analyses IA -- avertissements specifiques

### 3.1 Modele probabiliste

Les LLM generent du texte **probabilistement**. Meme question -> reponses
differentes.

### 3.2 Hallucinations

Peuvent produire des **affirmations fausses mais plausibles** sur noms
d'instruments, ISIN, performance historique, dividendes, regles fiscales,
composition d'indices, dates ex-dividende. **Verifier toujours** avec
sources officielles.

### 3.3 Cutoff temporel

Modele ne connait pas evenements posterieurs a sa date de cutoff.

### 3.4 Pas de recommandations personnalisees

Meme si le prompt inclut le portefeuille, les reponses IA **ne sont pas
des conseils personnalises**: le modele ne connait pas situation
patrimoniale globale, revenus, liquidite, horizon, tolerance, fiscalite,
objectifs retraite.

### 3.5 Pas de "Know Your Customer"

App ne collecte pas profil de risque. Non soumise a evaluation MiFID II
d'adequation/appropriation.

## 4. Suggestions de rebalancement

Calculs arithmetiques sur parametres user-defined. **Pas de
recommandations** d'achat/vente. App n'evalue pas: timing marche, impact
fiscal, couts transaction, liquidite, concentration. Consulter
**conseiller financier autorise**.

## 5. Donnees marche

Donnees sources publiques ou EODHD/FMP (cles utilisateur). Possibles
delais 15-20 min, erreurs sur splits/dividendes/changements ticker.
PluriFin sans responsabilite.

## 6. Calculs fiscaux

App **ne calcule pas** la fiscalite. Plus-values/moins-values affichees
sont calculs bruts sans considerer: taxation, bollo titoli (Italie),
IVAFE, deductions, holding period, traitement UCITS/non-UCITS,
succession. Consulter **expert-comptable ou conseiller fiscal**.

## 7. Marches etrangers et devises

Considerer: risque change, couts conversion, double imposition (W-8BEN
USA), reporting actifs etranger, residence fiscale. App **ne modelise
aucun**.

## 8. Securite personnelle

- Cles API en keystore SO -> accessibles si appareil deverrouille
- Appareil perdu verrouille: protege; deverrouille: expose donnees
- Backups Google Drive desactives par defaut

PluriFin n'est pas responsable de: vol/perte avec deverrouillage,
mauvaise config lock, compromission, partage des cles API, export manuel
et distribution incontrolee.

## 9. Mises a jour normatives

Regles fiscales et reglementaires **changent frequemment**. App ne
garantit pas calculs, exemples ou reponses IA a jour. Verifier
reglementation en vigueur.

## 10. Decisions de l'Utilisateur -- exoneration

L'Utilisateur declare et accepte que:

1. Usage de App, donnees et analyses est a son initiative et risque
   exclusifs
2. Decisions d'investissement sont **exclusivement les siennes**
3. PluriFin n'est pas responsable, dans limites legales, des pertes ou
   consequences fiscales
4. Pour decisions importantes, consulter **conseiller financier autorise**
   (OCF: <https://www.organismocf.it> ou equivalent national comme CIF en
   France)

## 11. Mineurs

App **non destinee aux mineurs de 18 ans**. Content rating Play
"Everyone / 18+". Parents/tuteurs responsables.

## 12. Geolocalisation

App concue pour marche italien et zone Euro. Utilisateurs hors zone
doivent verifier conformite locale. PluriFin sans responsabilite pour
interpretations divergentes.

## 13. Acceptation explicite

En acceptant ce Disclaimer au premier lancement (ou apres bump version),
l'Utilisateur declare avoir lu, compris la nature informative, les
limitations IA, et libere PluriFin/Filippo Salemi dans limites legales.

Acceptation enregistree dans `consent_box` chiffre (timestamp UTC,
version, hash SHA-256 texte).

Sans acceptation: rebalancement, IA et import bloques; uniquement lecture
legales et reglages.

## 14. Juridiction

Loi italienne. Disputes: voir ToS.

## 15. Contacts

`plurifin.app+legal@gmail.com`. PluriFin **ne fournit pas de conseil
financier par email**. Pour cela, conseiller autorise (OCF ou
equivalent).
