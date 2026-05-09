# Politica de Privacidad -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Ultima actualizacion**: 2026-05-02
**Idioma original**: Italiano (version vinculante para la jurisdiccion)

---

## 1. Responsable del tratamiento

- **Nombre**: Filippo Salemi
- **Forma juridica**: persona fisica (desarrollador independiente)
- **Marca comercial**: PluriFin
- **Pais**: Italia
- **Email para solicitudes RGPD y privacidad**: `plurifin.app+gdpr@gmail.com`
- **Email general**: `plurifin.app@gmail.com`

No se ha designado Delegado de Proteccion de Datos (DPO) por tratarse de
persona fisica fuera de los supuestos del art. 37 RGPD.

## 2. Resumen (TL;DR)

- Todos los datos de cartera (posiciones, transacciones, objetivos, ajustes)
  se almacenan **solo en el dispositivo del usuario** en forma cifrada. No
  los recibimos, almacenamos ni transmitimos a servidores PluriFin.
- La app **no usa analiticas de terceros** (sin Google Analytics, sin
  Firebase, sin Facebook SDK, sin AppsFlyer, sin Sentry por defecto).
- La app **no comparte datos con anunciantes**. No hay publicidad.
- Existen **funcionalidades opcionales** que, si el usuario las activa,
  transmiten datos a procesadores de terceros: IA Gemini, precios de
  mercado en tiempo real (EODHD/FMP), validacion de suscripcion (Cloudflare
  Worker). Cada una requiere accion explicita del usuario.
- El usuario puede exportar y borrar todos los datos en cualquier momento
  desde Ajustes, sin necesidad de contactar al responsable.

## 3. Categorias de datos tratados

### 3.1 Datos locales en el dispositivo

Cifrados con Hive AES-256 + clave en el keystore del sistema operativo:

| Categoria | Ejemplos | Base juridica | Conservacion |
|---|---|---|---|
| Datos de cartera | nombre, ticker, cantidad, precio medio, broker, fecha | art. 6.1.b RGPD | Hasta borrado por usuario |
| Objetivos financieros | titulo, importe meta, vencimiento, aportaciones | art. 6.1.b RGPD | Hasta borrado por usuario |
| Preferencias | idioma, divisa, tema, notificaciones, modo demo | art. 6.1.b RGPD | Hasta desinstalacion |
| Auditoria de consentimientos | timestamp, version documento, decision (aceptar/rechazar), hash texto | art. 6.1.c RGPD | Hasta borrado o desinstalacion |
| Claves API del usuario | claves de los proveedores activados: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (introducidas manualmente) | art. 6.1.b RGPD | Hasta eliminacion por usuario |

Todo en `flutter_secure_storage` (Android Keystore / iOS Keychain / DPAPI).

### 3.2 Datos via Play Store (Google)

PluriFin recibe de Google solo:

- `purchaseToken` (token de compra) -- validacion suscripcion
- `productId` -- identificacion producto
- `device_id_hash` (HMAC-SHA256 con sal del servidor) -- gestion del trial

PluriFin **no** recibe nombre, email, direccion ni datos de pago.

### 3.3 Validacion suscripcion (Cloudflare Worker)

Datos enviados al Worker: `device_id_hash`, `purchase_token`, `product_id`,
JWT firmado. Respuesta: JWT Ed25519. Sin PII. El hash no es identificador
personal sin la sal del servidor.

### 3.4 Datos a Gemini (solo si el usuario activa)

Si el usuario introduce su clave Gemini y abre el chat IA, el prompt
(pregunta + estructura de cartera anonima: ticker, cantidad, precio medio,
asignacion %) se transmite directamente a Google Gemini. Aplican los
[Google Gemini API Terms](https://ai.google.dev/terms). PluriFin no
intermedia ni almacena.

### 3.5 Datos a los proveedores de mercado (solo si el usuario activa)

La app soporta 10 proveedores de datos de mercado que el usuario puede
configurar independientemente introduciendo su API key en Ajustes. Cuando
el usuario solicita una actualizacion de precios, la app transmite los
tickers directamente al proveedor elegido. PluriFin no intermedia ni
almacena.

Proveedores soportados y politicas de privacidad:

- [EODHD](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage](https://www.alphavantage.co/privacy/)
- [Twelve Data](https://twelvedata.com/privacy)
- [Finnhub](https://finnhub.io/privacy-policy)
- [Polygon.io](https://polygon.io/privacy)
- [Marketstack](https://marketstack.com/privacy)
- [Tiingo](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): descarga CSV publica sin API key (la
  solicitud HTTP va directamente del dispositivo a stooq.com)

Para cada proveedor, la transmision se produce **solo** si el usuario:
1. ha introducido su API key en Ajustes (Stooq excluido, es gratuito);
2. ha seleccionado el proveedor como activo para la actualizacion.

El usuario puede eliminar la clave o desactivar el proveedor en cualquier
momento.

## 4. Subprocesadores

| Subprocesador | Finalidad | Datos | Cuando |
|---|---|---|---|
| Google Play Billing | Pago y suscripcion | purchaseToken, productId | Solo si compra |
| Google Gemini API | Analisis IA | Prompt + cartera anonima | Solo si activa |
| EODHD | Precios real-time e historicos | Lista tickers | Solo si activa |
| FMP | Precios real-time, fundamentales | Lista tickers | Solo si activa |
| Alpha Vantage | Precios historicos | Lista tickers | Solo si activa |
| Twelve Data | Precios real-time e historicos | Lista tickers | Solo si activa |
| Finnhub | Precios real-time | Lista tickers | Solo si activa |
| Polygon.io | Precios historicos | Lista tickers | Solo si activa |
| Marketstack | Precios end-of-day | Lista tickers | Solo si activa |
| Tiingo | Precios real-time e historicos | Lista tickers | Solo si activa |
| Nasdaq Data Link | Precios historicos | Lista tickers | Solo si activa |
| Stooq | Descarga CSV publica precios historicos | Lista tickers (sin API key) | Solo si activa Stooq |
| Cloudflare Worker | Validacion suscripcion | device_id_hash, purchase_token, JWT | Siempre (gating subscription) |
| GitHub Pages | Hosting legal/webapp/sitio | IP request HTTP | En cada visita |

## 5. Transferencias fuera de la UE

Google, Cloudflare y GitHub son sociedades USA. Transferencias bajo:

- Clausulas Contractuales Tipo UE 2021/914
- EU-US Data Privacy Framework (Google)
- Politicas de cada proveedor (EODHD, FMP)

Quien no quiera transferencias fuera de la UE puede no activar las
funciones opcionales.

## 6. Derechos del interesado (arts. 15-22 RGPD)

| Derecho | Como ejercerlo |
|---|---|
| Acceso | Ajustes > Privacidad > Exportar mis datos (ZIP) |
| Rectificacion | Edicion directa en la app |
| Supresion | Ajustes > Privacidad > Borrar todos los datos / desinstalar |
| Limitacion | Desactivar funciones opcionales |
| Portabilidad | Ajustes > Privacidad > Exportar (JSON+CSV) |
| Oposicion | Desactivar funciones opcionales |
| Reclamacion | [Garante (Italia)](https://www.garanteprivacy.it/), AEPD (Espana) o autoridad nacional |

Solicitudes: `plurifin.app+gdpr@gmail.com`. Respuesta en 30 dias (art.
12.3 RGPD).

## 7. Conservacion

Datos locales hasta borrado por el usuario. Auditoria consentimientos:
hasta export y borrado explicitos. Subprocesadores: politica propia.

## 8. Seguridad

- Hive AES-256 + HMAC-SHA256
- `flutter_secure_storage` para claves API
- HTTPS solo (TLS 1.2+)
- `FLAG_SECURE` Android en paginas sensibles
- `allowBackup=false`
- Detection root/jailbreak con degradacion graceful
- Obfuscation Dart en releases

## 9. Menores (art. 8 RGPD)

App no destinada a menores de 18 anos. Content rating Play Store "18+".
Padres/tutores pueden solicitar borrado en `plurifin.app+gdpr@gmail.com`.

## 10. Cookies

App movil: ninguna cookie. Webapp: `localStorage` + cookie tecnica
GitHub Pages. Sitio vitrina: GoatCounter self-hosted (sin cookie, sin
fingerprinting).

## 11. Cambios

Notificacion via app (re-consent), banner en sitio (30 dias), email
newsletter. Versiones anteriores en repo `lunapiena49/portfoliomanager-data`,
historial Git.

## 12. Contactos

- RGPD: `plurifin.app+gdpr@gmail.com`
- Privacidad: `plurifin.app+privacy@gmail.com`
- Soporte: `plurifin.app+support@gmail.com`
- Publico Play Store: `plurifin.app@gmail.com`

## 13. Jurisdiccion y ley aplicable

Ley italiana y RGPD. Para consumidores, fuero del consumidor segun
D.Lgs. 206/2005 (Italia) o equivalentes nacionales mas protectores.
