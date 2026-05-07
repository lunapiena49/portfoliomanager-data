---
title: "Por que cree PluriFin"
summary: "La historia personal detras de una app privacy-first para inversores retail, y por que un solo desarrollador puede permitirse un plan de 0,99 EUR/ano."
publishedAt: 2026-05-07
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: es
tags: ["founder", "story", "personal-finance"]
---

Trabajo en PluriFin desde hace unos 18 meses, en part-time, mientras mi trabajo
principal sigue siendo el de desarrollador de software en una empresa italiana. La
app no nacio como producto comercial: nacio como herramienta personal para
seguir una cartera multi-broker que cada ano se hacia mas dificil de gestionar
con herramientas generalistas.

## El problema

Tenia posiciones distribuidas en 4 brokers (Interactive Brokers, Trade Republic,
Fineco y Directa) en 3 divisas (EUR, USD, GBP), con activos de naturaleza mixta
(acciones individuales, ETFs cotizados en USA, ETFs UCITS, algun ETP cripto,
fondos de obligaciones). Cada broker exporta en un formato CSV distinto, cada
broker tiene su granularidad de transaccion, y cada broker tiene su interpretacion
de "coste medio de adquisicion" y "P&amp;L realizado".

Las herramientas generalistas que probe (plantillas de Google Sheets, algunos
servicios web italianos) o no entendian los CSV multi-broker, o requerian
entregar las credenciales API a un servicio cloud de terceros. Ninguna de las
dos era aceptable: las hojas de calculo se vuelven inmanejables superadas las
~30 posiciones, y dar un token API read-only a un servicio no auditable es un
tradeoff que no estoy dispuesto a aceptar.

## La respuesta personal y luego el producto

PluriFin nacio como proyecto interno con tres restricciones rigidas:

1. **Los datos viven en el dispositivo del usuario**, en almacenamiento cifrado
   AES-256. Sin nube PluriFin obligatoria. La exportacion GDPR esta a un clic.
2. **La app nunca habla con un broker en nombre del usuario**. Todo ocurre mediante
   importacion de archivos CSV/PDF que el usuario descarga de su broker. Sin
   claves API de terceros custodiadas por PluriFin.
3. **Las funciones IA son opcionales y usan claves del usuario**. Si quieres el
   analisis Gemini, introduces tu clave API; queda en el keystore de tu
   dispositivo.

Cuando vi que el producto podia ser util a mas gente que a mi, decidi publicarlo.
El modelo comercial es deliberadamente low-friction:

- 7 dias de prueba gratis sin tarjeta
- 0,99 EUR/ano para Single, 1,99 EUR/ano para Family
- Lifetime pago unico a 4,99 EUR (Single) o 9,99 EUR (Family)

Sin "early bird", sin "primeros N usuarios", sin promos que segmenten. Mismo
precio para todos, hoy y siempre.

## Por que tan barato

La app cuesta 25 USD pago unico de Play Console y ~0 EUR de hosting (Cloudflare
free tier para el Worker y GitHub Pages para el sitio). No hay inversores a los
que devolver capital, no hay churn que combatir con descuentos, no hay equipo
que pagar. El objetivo es cubrir los costes operativos y mantener viva una
comunidad de usuarios que aprecien un enfoque honesto al ahorro.

Si PluriFin algun dia cesara las operaciones, la exportacion GDPR te devuelve
todos tus datos en un unico JSON portable -- y los planes Lifetime siguen
accesibles para siempre en tu cuenta de Google.

## Que esperar en los proximos meses

- **Q2 2026**: lanzamiento en Play Store (Android), webapp gratuita ya en vivo
- **Q3 2026**: feedback recogido del Closed Testing, hotfix para los crashes residuales
- **Q4 2026 / Q1 2027**: aumento del numero de brokers soportados (prioridad: feedback de usuarios)
- **Fase 2 (post-ingresos)**: iOS, Apple Pay, marca EUIPO, eventual seguro RC Tech

Si quieres seguir el desarrollo en tiempo real, el repo publico
[portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data)
aloja la pipeline de datos de mercado y el sitio que estas leyendo. El codigo de
la app Android permanece closed-source por motivos de compliance (claves de
firma, anti-piracy, integridad del contexto Play Billing), pero las specs del
formato CSV de los brokers y las plantillas de documentos legales son publicas.

Hasta pronto.
