# Plantilla DMCA / Takedown -- PluriFin

**Version**: 1.0.0
**Ultima actualizacion**: 2026-05-02

Plantillas para gestionar avisos:

1. **Entrantes**: terceros denuncian violacion (raro: la app no aloja
   contenido user-generated).
2. **Salientes**: PluriFin denuncia clones, forks comerciales, violacion
   de marca o codigo.
3. **Counter-notice**: contranotificacion de retirada disputada.

Marcos de referencia:
- DMCA (17 U.S.C. § 512) para plataformas USA
- Directiva UE 2019/790 + D.Lgs. italiano 177/2021 para plataformas UE
- Codice Civile italiano arts. 2598 (competencia desleal), 2569+
  (marca registrada) tras deposito EUIPO

---

## 1. Notice entrante

### 1.1 Procedimiento

1. **No responder de inmediato**. Conservar todo (emails, screenshots).
2. Issue privada en `portfolio-manager-app` label `legal-incoming`.
3. Verificar origen (commits, assets), licencias, fair use.
4. Si fundada: retirar y responder con plantilla 1.3.
5. Si infundada: responder con plantilla 1.4.
6. Si llega via plataforma host: usar tambien su counter-notice form.

### 1.2 Plantilla -- pretension fundada

```
Asunto: Re: <asunto>

Estimado/a <solicitante>,

He recibido su comunicacion del <fecha> sobre <descripcion material>. He
verificado y procedido a retirar el material el <fecha retirada>.

Referencia commit / accion: <hash o link>

Disculpas. Quedo a su disposicion.

Saludos cordiales,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

### 1.3 Plantilla -- pretension infundada

```
Asunto: Re: <asunto>

Estimado/a <solicitante>,

Tras verificacion contesto sus afirmaciones por:

1. <motivo, ej.: material original mio, ver commit <hash> del <fecha>>
2. <motivo, ej.: cubierto por fair use bajo...>
3. <motivo, ej.: licencia <X> respetando atribucion>

Le pido prueba de sus derechos y dano alegado en 30 dias. En ausencia
considero el asunto cerrado.

Saludos cordiales,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

---

## 2. Notice saliente -- DMCA a plataforma USA

### 2.1 Cuando

- Fork GitHub publico que redistribuye codigo proprietario
- Clon en Play Store con mismo nombre/logo/screenshots
- Sitio web copia sustancial del marketing site
- APK modificados de Portfolio Manager
- Reproduccion no autorizada de blog o press kit

### 2.2 Plantilla DMCA (ingles, 17 U.S.C. § 512(c)(3))

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

### 2.3 Donde

- GitHub: <https://github.com/contact/dmca>
- Google Play: <https://support.google.com/legal/answer/3463191>
- Cloudflare: <https://abuse.cloudflare.com/>
- AWS: abuse@amazonaws.com

### 2.4 Pruebas

Screenshots, copia notice, respuesta provider. Carpeta local
`Plurifin/Legal/Takedowns/<YYYY>/<case-id>/`, fuera repo.

---

## 3. Notice saliente -- host UE (italiano)

Vease `legal/dmca_template.md` IT, seccion 3.

## 4. Counter-notice

### 4.1 DMCA counter-notice (ingles)

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

## 5. Notas operativas

- **Actuar**: solo violaciones evidentes y materiales
- **No actuar**: criticas, comparaciones, screenshots en prensa (fair use)
- **Costes**: gratuito para el titular. Solo si demanda civil ~ EUR
  200-500 primera consulta legal.
- **EUIPO marca**: tras deposito clases 9+36, Reg. UE 2017/1001 ofrece
  proteccion mas incisiva.
- **Documentacion**: registro en `marketing/legal_actions.md` solo si
  primer caso real.

## 6. Jurisdiccion

- Italia: fuero consumidor / general civil
- USA: Northern District of California por defecto
- Otros UE: Reg. UE 1215/2012 (Bruselas I-bis)

## 7. Actualizaciones

Documento actualizable por: cambios normativos UE/italianos, primer
caso real, deposito marca EUIPO PluriFin.
