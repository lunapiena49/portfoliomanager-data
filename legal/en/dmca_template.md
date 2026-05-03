# DMCA / Takedown Notice Template -- PluriFin

**Version**: 1.0.0
**Last update**: 2026-05-02

This document contains templates and operational instructions for handling:

1. **Incoming notices**: someone (third party) claims PluriFin infringes
   their right and asks for removal (rare: the app has no user-generated
   content).
2. **Outgoing notices**: PluriFin (Filippo Salemi) finds an abusive copy,
   commercial fork, trademark or code violation and sends a takedown.
3. **Counter-notices**: counter-notification when a removal is contested.

References used:

- **DMCA** (17 U.S.C. § 512) for US platforms (GitHub, Google Play, Apple
  App Store, AWS, US Cloudflare)
- **EU Directive 2019/790** (Copyright in the Digital Single Market) and
  **Italian Legislative Decree 177/2021** for EU platforms
- **Italian Civil Code** arts. 2598 (unfair competition) and 2569+
  (registered trademark), once the EUIPO trademark is filed

---

## 1. Incoming notices (rare but to be handled)

### 1.1 Possible scenarios

- Someone claims marketing-site copy mirrors theirs
- Someone claims the "PluriFin" name or logo violates a prior trademark
- Someone claims app screenshots contain copyrighted icons or fonts
- Someone claims blog posts cite sources without permission

### 1.2 Procedure

1. **Do not reply immediately** to the requester. Save every communication
   (email, screenshots).
2. Open private issue on `portfolio-manager-app` with `legal-incoming`
   label.
3. Verify in our archives:
   - Origin of the contested material (commit, asset, screenshot)
   - Any license, attribution, fair use
4. If the claim is well-founded: remove or replace the material before
   replying.
5. Reply to the requester using template 1.3.
6. If unfounded or abusive: reply using template 1.4.
7. If the notice arrived via host platform (GitHub, Google Play), reply
   ALSO via their counter-notice form if applicable.

### 1.3 Template -- well-founded claim, material removed

```
Subject: Re: <subject>

Dear <requester>,

I received your communication of <date> regarding <material description>.
I have verified your claim and removed the contested material on
<removal date>.

Reference commit / action: <commit hash or link>

I apologize for the inconvenience, which was a mere oversight. I remain
available for further clarification.

Best regards,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

### 1.4 Template -- unfounded claim, contested

```
Subject: Re: <subject>

Dear <requester>,

I received your communication of <date> regarding <material description>.
After verification, I contest your claims for the following reasons:

1. <reason, e.g.: the material is my original work, see commit <hash>
   dated <date>>
2. <reason, e.g.: the material is covered by fair use under...>
3. <reason, e.g.: the material is licensed under <X> by the original
   author, whose attribution requirements I have respected>

Please provide proof of your rights to the material and of the alleged
damage within 30 days. Absent such documentation, I consider the matter
closed.

Best regards,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

---

## 2. Outgoing notices -- DMCA Takedown to a US platform

### 2.1 When to send

- Public GitHub fork that redistributes PluriFin proprietary code (private)
  without permission
- Clone app on Play Store with same name / logo / screenshots
- Website that substantially reproduces the PluriFin marketing site
- Hosts serving modified Portfolio Manager APKs
- Unauthorized reproduction of blog posts or press kit material

### 2.2 DMCA notice template (English, per 17 U.S.C. § 512(c)(3))

```
DIGITAL MILLENNIUM COPYRIGHT ACT TAKEDOWN NOTICE

To Whom It May Concern,

I am the copyright owner of the work described below and I am submitting
this DMCA notice in good faith to request the removal of infringing
material from your service.

1. IDENTIFICATION OF COPYRIGHTED WORK
The original work is the mobile application "Portfolio Manager" published
under the brand "PluriFin", and its accompanying website, source code,
visual assets, and textual content. Original repository (private):
https://github.com/lunapiena49/portfolio-manager-app
Public marketing site:
https://lunapiena49.github.io/portfoliomanager-data/
Authoritative Google Play listing:
https://play.google.com/store/apps/details?id=app.plurifin.portfoliomanager

2. IDENTIFICATION OF INFRINGING MATERIAL
The following URL(s) host material that infringes my copyright:
- <full URL of infringing content>
- <description of which specific element is infringing: source code copy,
  asset reuse, app clone, etc.>

3. CONTACT INFORMATION
Name: Filippo Salemi
Brand: PluriFin
Country: Italy
Email: plurifin.app+legal@gmail.com

4. GOOD FAITH STATEMENT
I have a good faith belief that the use of the material described above
is not authorized by me, the copyright owner, my agent, or by law.

5. ACCURACY STATEMENT
I swear, under penalty of perjury, that the information in this notice
is accurate and that I am the copyright owner or am authorized to act on
behalf of the copyright owner of the exclusive right that is allegedly
infringed.

6. ELECTRONIC SIGNATURE
/s/ Filippo Salemi
Date: <YYYY-MM-DD>
```

### 2.3 Where to send

- **GitHub**: <https://github.com/contact/dmca>
- **Google Play**: <https://support.google.com/legal/answer/3463191>
- **Cloudflare**: <https://abuse.cloudflare.com/>
- **AWS**: <abuse@amazonaws.com>
- **Generic EU host**: search `abuse@` email or "Report" page

### 2.4 Preserve evidence

- Screenshot of infringing page (URL, date, time)
- Full copy of sent notice
- Provider response (notice received, takedown completed, counter-notice if
  any)
- All in local folder `Plurifin/Legal/Takedowns/<YYYY>/<case-id>/`,
  outside repo

---

## 3. Outgoing notice -- Italian-language request to EU host

### 3.1 Template (Italian, per Italian Legislative Decree 70/2003 art. 17 and Italian Legislative Decree 177/2021)

See the Italian-language `legal/dmca_template.md`, section 3.1.

---

## 4. Counter-notice (contested removal)

When another party has obtained removal of PluriFin content believed to be
legitimate.

### 4.1 DMCA counter-notice template (English)

```
DMCA COUNTER-NOTICE

To Whom It May Concern,

I am responding to a DMCA takedown notice that resulted in the removal of
my content. I assert in good faith that the material was removed by
mistake or misidentification.

1. IDENTIFICATION OF REMOVED MATERIAL
URL where the content was located before removal: <URL>
Description: <description>

2. STATEMENT
I swear, under penalty of perjury, that I have a good faith belief that
the material was removed or disabled as a result of mistake or
misidentification of the material to be removed or disabled.

3. CONSENT TO JURISDICTION
I consent to the jurisdiction of the Federal District Court for the
judicial district in which my address is located (or, if outside the
United States, the Federal District Court for the Northern District of
California). I will accept service of process from the person who
provided the original DMCA notice or that person's agent.

4. CONTACT INFORMATION
Name: Filippo Salemi
Address: <complete physical address>
Phone: <phone number>
Email: plurifin.app+legal@gmail.com

5. ELECTRONIC SIGNATURE
/s/ Filippo Salemi
Date: <YYYY-MM-DD>
```

---

## 5. Operational notes

### 5.1 Action threshold

**Act**: only on evident and material violations (app clone, full site
copy, commercial code fork). Not for minor "inspired by", or for
critiques/reviews (even negative).

**Skip**: critical Reddit/forum posts, comparison with other apps,
screenshots in press articles (even without permission) -- this is fair
use / news.

### 5.2 Costs

DMCA / takedown sending is **free** for the right holder. Handling is
in-house. Only if the counterparty starts civil proceedings in Italy or
US, a lawyer will be needed (~ EUR 200-500 for first consultation).

### 5.3 EUIPO trademark

Once the "PluriFin" EUIPO trademark in classes 9 and 36 is filed (Phase 2
post-revenue), action under the EUTMR (EU Reg. 2017/1001) becomes
available, providing stronger protection against unauthorized use of the
distinctive sign across the EU.

### 5.4 Documentation

Keep a register of cases in `marketing/legal_actions.md` (file to create
only if/when the first real case occurs), with:

- Date
- Type (incoming / outgoing / counter)
- Counterparty
- Material
- Outcome
- Costs incurred
- Lessons learned

## 6. Jurisdiction

For disputes arising from these notices:

- **Vs. Italian counterparties**: consumer's forum or general civil
  procedure forum
- **Vs. US counterparties**: jurisdiction agreed in counter-notice
  (default: Northern District of California for non-US-domiciled
  counterparties)
- **Vs. non-Italian EU counterparties**: EU Regulation 1215/2012
  (Brussels I-bis)

## 7. Updates

This document will be updated for:

- Changes to EU/Italian rules on information-society services
- Onset of the first real case (to integrate lessons learned)
- Filing of the EUIPO PluriFin trademark (to extend available protections)
