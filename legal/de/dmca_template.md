# DMCA / Takedown-Vorlage -- PluriFin

**Version**: 1.0.0
**Letzte Aktualisierung**: 2026-05-02

Vorlagen fur:

1. **Eingehende Notice**: Dritter beanstandet Verletzung (selten, App
   ohne user-generated content).
2. **Ausgehende Notice**: PluriFin meldet Klone, Forks, Marken-/Code-
   Verstosse.
3. **Counter-Notice**: Gegenbenachrichtigung bei strittiger Loschung.

Bezuge:
- DMCA (17 U.S.C. § 512) fur US-Plattformen
- EU-Richtlinie 2019/790 + IT D.Lgs. 177/2021 fur EU-Plattformen
- Italienisches BGB Art. 2598 (unlauterer Wettbewerb), 2569+
  (Markenregistrierung) nach EUIPO-Anmeldung

---

## 1. Eingehende Notice

### 1.1 Verfahren

1. **Nicht sofort antworten**. Alles aufbewahren.
2. Privates Issue in `portfolio-manager-app` mit Label `legal-incoming`.
3. Herkunft prufen (Commits, Assets), Lizenzen, Fair Use.
4. Wenn berechtigt: entfernen und mit Vorlage 1.3 antworten.
5. Wenn unberechtigt: mit Vorlage 1.4 antworten.
6. Wenn via Plattform: deren Counter-Notice-Form auch nutzen.

### 1.2 Vorlage -- berechtigte Forderung

```
Betreff: Re: <Betreff>

Sehr geehrte/r <Antragsteller>,

ich habe Ihre Mitteilung vom <Datum> bezuglich <Material> erhalten. Nach
Prufung habe ich das Material am <Datum> entfernt.

Referenz Commit / Aktion: <Hash oder Link>

Entschuldigung fur die Unannehmlichkeit. Stehe zur Verfugung.

Mit freundlichen Grussen,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

### 1.3 Vorlage -- unberechtigte Forderung

```
Betreff: Re: <Betreff>

Sehr geehrte/r <Antragsteller>,

nach Prufung bestreite ich Ihre Aussagen aus folgenden Grunden:

1. <Grund, z.B.: eigenes Originalwerk, siehe Commit <Hash> vom <Datum>>
2. <Grund, z.B.: durch Fair Use gedeckt unter...>
3. <Grund, z.B.: Lizenz <X> mit Attribution respektiert>

Bitte legen Sie binnen 30 Tagen Nachweis Ihrer Rechte und des angeblichen
Schadens vor. Ohne Dokumentation gilt die Sache als erledigt.

Mit freundlichen Grussen,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

---

## 2. Ausgehende Notice -- DMCA US-Plattform

### 2.1 Wann

- Offentlicher GitHub-Fork mit proprietarem Code
- Klon im Play Store mit gleichem Namen/Logo/Screenshots
- Webseite als wesentliche Kopie der Marketing-Site
- Modifizierte Portfolio-Manager-APKs
- Unautorisierte Reproduktion von Blog oder Press Kit

### 2.2 DMCA-Vorlage (Englisch, 17 U.S.C. § 512(c)(3))

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

### 2.3 Wohin

- GitHub: <https://github.com/contact/dmca>
- Google Play: <https://support.google.com/legal/answer/3463191>
- Cloudflare: <https://abuse.cloudflare.com/>
- AWS: abuse@amazonaws.com

### 2.4 Beweise

Screenshots, Notice-Kopie, Provider-Antwort. Lokaler Ordner
`Plurifin/Legal/Takedowns/<YYYY>/<case-id>/`, ausserhalb Repo.

---

## 3. Ausgehende Notice -- EU-Host (italienisch)

Siehe `legal/dmca_template.md` IT, Abschnitt 3.

## 4. Counter-Notice

### 4.1 DMCA Counter-Notice (Englisch)

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

## 5. Operative Hinweise

- **Handeln**: nur evidenten und materiellen Verletzungen
- **Nicht handeln**: Kritik, Vergleiche, Presse-Screenshots (Fair Use)
- **Kosten**: kostenlos fur Rechteinhaber. Bei Zivilverfahren ~ EUR
  200-500 erste juristische Beratung.
- **EUIPO-Marke**: nach Anmeldung Klassen 9+36 starkerer Schutz nach
  EUTMR (EU Reg. 2017/1001).
- **Dokumentation**: Register in `marketing/legal_actions.md` ab erstem
  Realfall.

## 6. Gerichtsstand

- Italien: Verbraucher- / allgemeiner Zivilgerichtsstand
- USA: Northern District of California Standard
- Andere EU: EU-VO 1215/2012 (Brussel I-bis)

## 7. Updates

Dokument zu aktualisieren bei: EU/IT-Normanderungen, erstem Realfall,
EUIPO-PluriFin-Markenanmeldung.
