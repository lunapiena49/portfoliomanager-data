# Política de Privacidad -- Portfolio Manager by PluriFin

**Versión**: 1.0.0
**Última actualización**: 2026-05-02
**Idioma original**: Italiano (versión vinculante para la jurisdicción)

---

## 1. Responsable del tratamiento

- **Nombre**: Filippo Salemi
- **Forma jurídica**: persona física (desarrollador independiente)
- **Marca comercial**: PluriFin
- **País**: Italia
- **Email para solicitudes RGPD y privacidad**: `plurifin.app+gdpr@gmail.com`
- **Email general**: `plurifin.app@gmail.com`

No se ha designado Delegado de Protección de Datos (DPO) por tratarse de
persona física fuera de los supuestos del art. 37 RGPD.

## 2. Resumen (TL;DR)

- Todos los datos de cartera (posiciones, transacciones, objetivos, ajustes)
  se almacenan **solo en el dispositivo del usuario** en forma cifrada. No
  los recibimos, almacenamos ni transmitimos a servidores PluriFin.
- La app **no usa analíticas de terceros** (sin Google Analytics, sin
  Firebase, sin Facebook SDK, sin AppsFlyer, sin Sentry por defecto).
- La app **no comparte datos con anunciantes**. No hay publicidad.
- Existen **funcionalidades opcionales** que, si el usuario las activa,
  transmiten datos a procesadores de terceros: IA Gemini, precios de
  mercado en tiempo real (EODHD/FMP), validación de suscripción (Cloudflare
  Worker). Cada una requiere acción explícita del usuario.
- El usuario puede exportar y borrar todos los datos en cualquier momento
  desde Ajustes, sin necesidad de contactar al responsable.

## 3. Categorías de datos tratados

### 3.1 Datos locales en el dispositivo

Cifrados con Hive AES-256 + clave en el keystore del sistema operativo:

| Categoría | Ejemplos | Base jurídica | Conservación |
|---|---|---|---|
| Datos de cartera | nombre, ticker, cantidad, precio medio, broker, fecha | art. 6.1.b RGPD | Hasta borrado por usuario |
| Objetivos financieros | título, importe meta, vencimiento, aportaciones | art. 6.1.b RGPD | Hasta borrado por usuario |
| Preferencias | idioma, divisa, tema, notificaciones, modo demo | art. 6.1.b RGPD | Hasta desinstalación |
| Auditoría de consentimientos | timestamp, versión documento, decisión (aceptar/rechazar), hash texto | art. 6.1.c RGPD | Hasta borrado o desinstalación |
| Claves API del usuario | claves de los proveedores activados: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (introducidas manualmente) | art. 6.1.b RGPD | Hasta eliminación por usuario |

Todo en `flutter_secure_storage` (Android Keystore / iOS Keychain / DPAPI).

### 3.2 Datos vía Play Store (Google)

PluriFin recibe de Google solo:

- `purchaseToken` (token de compra) -- validación suscripción
- `productId` -- identificación producto
- `device_id_hash` (HMAC-SHA256 con sal del servidor) -- gestión del trial

PluriFin **no** recibe nombre, email, dirección ni datos de pago.

### 3.3 Validación suscripción (Cloudflare Worker)

Datos enviados al Worker: `device_id_hash`, `purchase_token`, `product_id`,
JWT firmado. Respuesta: JWT Ed25519. Sin PII. El hash no es identificador
personal sin la sal del servidor.

### 3.4 Datos a Gemini (solo si el usuario activa)

Si el usuario introduce su clave Gemini y abre el chat IA, el prompt
(pregunta + estructura de cartera anónima: ticker, cantidad, precio medio,
asignación %) se transmite directamente a Google Gemini. Aplican los
[Google Gemini API Terms](https://ai.google.dev/terms). PluriFin no
intermedia ni almacena.

### 3.5 Datos a los proveedores de mercado (solo si el usuario activa)

La app soporta 10 proveedores de datos de mercado que el usuario puede
configurar independientemente introduciendo su API key en Ajustes. Cuando
el usuario solicita una actualización de precios, la app transmite los
tickers directamente al proveedor elegido. PluriFin no intermedia ni
almacena.

Proveedores soportados y políticas de privacidad:

- [EODHD](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage](https://www.alphavantage.co/privacy/)
- [Twelve Data](https://twelvedata.com/privacy)
- [Finnhub](https://finnhub.io/privacy-policy)
- [Polygon.io](https://polygon.io/privacy)
- [Marketstack](https://marketstack.com/privacy)
- [Tiingo](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): descarga CSV pública sin API key (la
  solicitud HTTP va directamente del dispositivo a stooq.com)

Para cada proveedor, la transmisión se produce **solo** si el usuario:
1. ha introducido su API key en Ajustes (Stooq excluido, es gratuito);
2. ha seleccionado el proveedor como activo para la actualización.

El usuario puede eliminar la clave o desactivar el proveedor en cualquier
momento.

## 4. Subprocesadores

| Subprocesador | Finalidad | Datos | Cuándo |
|---|---|---|---|
| Google Play Billing | Pago y suscripción | purchaseToken, productId | Solo si compra |
| Google Gemini API | Análisis IA | Prompt + cartera anónima | Solo si activa |
| EODHD | Precios real-time e históricos | Lista tickers | Solo si activa |
| FMP | Precios real-time, fundamentales | Lista tickers | Solo si activa |
| Alpha Vantage | Precios históricos | Lista tickers | Solo si activa |
| Twelve Data | Precios real-time e históricos | Lista tickers | Solo si activa |
| Finnhub | Precios real-time | Lista tickers | Solo si activa |
| Polygon.io | Precios históricos | Lista tickers | Solo si activa |
| Marketstack | Precios end-of-day | Lista tickers | Solo si activa |
| Tiingo | Precios real-time e históricos | Lista tickers | Solo si activa |
| Nasdaq Data Link | Precios históricos | Lista tickers | Solo si activa |
| Stooq | Descarga CSV pública precios históricos | Lista tickers (sin API key) | Solo si activa Stooq |
| Cloudflare Worker | Validación suscripción | device_id_hash, purchase_token, JWT | Siempre (gating subscription) |
| GitHub Pages | Hosting legal/webapp/sitio | IP request HTTP | En cada visita |

## 5. Transferencias fuera de la UE

Google, Cloudflare y GitHub son sociedades USA. Transferencias bajo:

- Cláusulas Contractuales Tipo UE 2021/914
- EU-US Data Privacy Framework (Google)
- Políticas de cada proveedor (EODHD, FMP)

Quien no quiera transferencias fuera de la UE puede no activar las
funciones opcionales.

## 6. Derechos del interesado (arts. 15-22 RGPD)

| Derecho | Cómo ejercerlo |
|---|---|
| Acceso | Ajustes > Privacidad > Exportar mis datos (ZIP) |
| Rectificación | Edición directa en la app |
| Supresión | Ajustes > Privacidad > Borrar todos los datos / desinstalar |
| Limitación | Desactivar funciones opcionales |
| Portabilidad | Ajustes > Privacidad > Exportar (JSON+CSV) |
| Oposición | Desactivar funciones opcionales |
| Reclamación | [Garante (Italia)](https://www.garanteprivacy.it/), AEPD (España) o autoridad nacional |

Solicitudes: `plurifin.app+gdpr@gmail.com`. Respuesta en 30 días (art.
12.3 RGPD).

## 7. Conservación

Datos locales hasta borrado por el usuario. Auditoría consentimientos:
hasta export y borrado explícitos. Subprocesadores: política propia.

## 8. Seguridad

- Hive AES-256 + HMAC-SHA256
- `flutter_secure_storage` para claves API
- HTTPS solo (TLS 1.2+)
- `FLAG_SECURE` Android en páginas sensibles
- `allowBackup=false`
- Detección root/jailbreak con degradación graceful
- Obfuscation Dart en releases

## 9. Menores (art. 8 RGPD)

App no destinada a menores de 18 años. Content rating Play Store "18+".
Padres/tutores pueden solicitar borrado en `plurifin.app+gdpr@gmail.com`.

## 10. Cookies

App móvil: ninguna cookie. Webapp: `localStorage` + cookie técnica
GitHub Pages. Sitio vitrina: GoatCounter self-hosted (sin cookie, sin
fingerprinting).

## 11. Cambios

Notificación vía app (re-consent), banner en sitio (30 días), email
newsletter. Versiones anteriores en repo `lunapiena49/portfoliomanager-data`,
historial Git.

## 12. Contactos

- RGPD: `plurifin.app+gdpr@gmail.com`
- Privacidad: `plurifin.app+privacy@gmail.com`
- Soporte: `plurifin.app+support@gmail.com`
- Legal: `plurifin.app+legal@gmail.com`
- Público Play Store: `plurifin.app@gmail.com`

## 13. Jurisdicción y ley aplicable

Ley italiana y RGPD. Para consumidores, fuero del consumidor según
D.Lgs. 206/2005 (Italia) o equivalentes nacionales más protectores.
