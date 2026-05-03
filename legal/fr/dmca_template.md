# Modele DMCA / Takedown -- PluriFin

**Version**: 1.0.0
**Derniere mise a jour**: 2026-05-02

Modeles pour gerer:

1. **Notices entrantes**: tiers se plaint de violation (rare, app sans
   contenu user-generated).
2. **Notices sortantes**: PluriFin denonce clones, forks, violations
   marque ou code.
3. **Counter-notices**: contre-notification de retrait conteste.

References:
- DMCA (17 U.S.C. § 512) pour plateformes USA
- Directive UE 2019/790 + D.Lgs. italien 177/2021 pour plateformes UE
- Code Civil italien art. 2598 (concurrence deloyale), 2569+ (marque
  enregistree) apres depot EUIPO

---

## 1. Notice entrante

### 1.1 Procedure

1. **Ne pas repondre immediatement**. Conserver tout (emails, screenshots).
2. Issue privee dans `portfolio-manager-app` label `legal-incoming`.
3. Verifier origine (commits, assets), licences, fair use.
4. Si fondee: retirer et repondre avec modele 1.3.
5. Si infondee: repondre avec modele 1.4.
6. Si arrivee via plateforme: utiliser aussi leur counter-notice form.

### 1.2 Modele -- pretention fondee

```
Objet: Re: <objet>

Madame, Monsieur <demandeur>,

J'ai recu votre communication du <date> concernant <description>. Apres
verification, j'ai retire le materiel le <date retrait>.

Reference commit / action: <hash ou lien>

Excuses pour la gene. Reste a disposition.

Cordialement,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

### 1.3 Modele -- pretention infondee

```
Objet: Re: <objet>

Madame, Monsieur <demandeur>,

Apres verification, je conteste vos affirmations:

1. <motif, ex.: materiel original, voir commit <hash> du <date>>
2. <motif, ex.: couvert par fair use sous...>
3. <motif, ex.: licence <X> respectee avec attribution>

Je vous prie de fournir preuve de vos droits et du dommage allegue dans
30 jours. Sans documentation, je considere l'affaire close.

Cordialement,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

---

## 2. Notice sortante -- DMCA plateforme USA

### 2.1 Quand

- Fork GitHub public redistribuant code proprietaire
- Clone Play Store avec meme nom/logo/screenshots
- Site web copie substantielle du marketing site
- APK modifies de Portfolio Manager
- Reproduction non autorisee blog ou press kit

### 2.2 Modele DMCA (anglais, 17 U.S.C. § 512(c)(3))

```
DIGITAL MILLENNIUM COPYRIGHT ACT TAKEDOWN NOTICE

To Whom It May Concern,

I am the copyright owner of "Portfolio Manager" by PluriFin, with
official site https://lunapiena49.github.io/portfoliomanager-data/ and
authoritative Play Store listing
https://play.google.com/store/apps/details?id=app.plurifin.portfoliomanager

INFRINGING MATERIAL:
- <full URL>
- <description>

CONTACT:
Name: Filippo Salemi
Brand: PluriFin
Country: Italy
Email: plurifin.app+legal@gmail.com

I have a good faith belief that the use is not authorized. I swear under
penalty of perjury that this notice is accurate and I am the rights
owner.

/s/ Filippo Salemi
Date: <YYYY-MM-DD>
```

### 2.3 Ou envoyer

- GitHub: <https://github.com/contact/dmca>
- Google Play: <https://support.google.com/legal/answer/3463191>
- Cloudflare: <https://abuse.cloudflare.com/>
- AWS: abuse@amazonaws.com

### 2.4 Preuves

Screenshots, copie notice, reponse provider. Dossier local
`Plurifin/Legal/Takedowns/<YYYY>/<case-id>/`, hors repo.

---

## 3. Notice sortante -- host UE (italien)

Voir `legal/dmca_template.md` IT, section 3.

## 4. Counter-notice

### 4.1 DMCA counter-notice (anglais)

```
DMCA COUNTER-NOTICE

To Whom It May Concern,

I am responding to a DMCA takedown notice that resulted in removal of
my content. I assert in good faith the material was removed by mistake
or misidentification.

REMOVED MATERIAL:
URL: <URL>
Description: <description>

I swear under penalty of perjury this belief is in good faith.

JURISDICTION: I consent to Federal District Court in my address district
or, if outside US, Northern District of California.

CONTACT:
Name: Filippo Salemi
Address: <complete address>
Phone: <phone>
Email: plurifin.app+legal@gmail.com

/s/ Filippo Salemi
Date: <YYYY-MM-DD>
```

## 5. Notes operationnelles

- **Agir**: uniquement violations evidentes et materielles
- **Ne pas agir**: critiques, comparaisons, screenshots presse (fair use)
- **Couts**: gratuit pour le titulaire. Si proces civil ~ EUR 200-500
  premiere consultation legale.
- **EUIPO marque**: apres depot classes 9+36, Reg. UE 2017/1001 protege
  davantage.
- **Documentation**: registre dans `marketing/legal_actions.md` au premier
  cas reel.

## 6. Juridiction

- Italie: for consommateur / general civil
- USA: Northern District of California par defaut
- Autres UE: Reg. UE 1215/2012 (Bruxelles I-bis)

## 7. Mises a jour

Document a actualiser pour: changements normatifs UE/italiens, premier
cas reel, depot marque EUIPO PluriFin.
