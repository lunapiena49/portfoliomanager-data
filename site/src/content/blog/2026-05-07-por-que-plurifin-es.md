---
title: "Portfolio Manager está construida sobre tres prohibiciones"
summary: "Sin almacén de carteras, sin conexión con las cuentas, sin inteligencia artificial sin la clave de quien la usa. La lista de precios de cuatro líneas sale de ahí."
publishedAt: 2026-05-07
updatedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Redacción"
lang: es
tags: ["portfolio-manager", "privacidad", "precios"]
---

Las apps de finanzas se presentan con la lista de lo que hacen. Portfolio Manager, la app de PluriFin Finance, se entiende antes por lo que no puede hacer. No tiene un almacén donde guardar las carteras, no se conecta a las cuentas y no usa la inteligencia artificial sin una clave del usuario. Son tres prohibiciones, y la lista de precios de cuatro líneas es su consecuencia.

## Primera prohibición: ningún almacén de carteras

La cartera se queda en el teléfono de su dueño, cifrada con AES-256, con la clave custodiada por el sistema operativo. PluriFin no conserva las carteras y no pide abrir una cuenta. Para verificar la prueba y la suscripción le bastan una huella anónima del dispositivo y el recibo de la compra.

Una app de finanzas gratuita que conserva las carteras en sus servidores tiene un coste que cubrir. Antes de instalarla conviene preguntar con qué lo cubre.

Dos cosas hay que decirlas con todas las letras. La demo web guarda los datos en el navegador, sin cifrar: sirve para ver cómo es la app, no para custodiar una cartera de verdad. Los informes de fallos (Firebase Crashlytics) se envían únicamente si el usuario activa el diagnóstico en los ajustes, y no contienen datos de la cartera.

La salida está tan prevista como la entrada: «Exportar mis datos» genera un archivo JSON con todo el contenido, y «Borrar todos los datos» lo elimina del teléfono.

## Segunda prohibición: ninguna conexión con las cuentas

La app no pide las credenciales de ningún bróker y no ejecuta órdenes. Los datos entran porque los trae su dueño, archivo a archivo. Portfolio Manager reconoce los CSV de once brókeres, muestra una vista previa de las filas que hay que corregir y gestiona los duplicados antes de guardar. Para los demás intermediarios hay un lector genérico, y de los PDF la app intenta extraer la tabla.

Es más lento que una conexión automática. Es también la razón por la que nadie tiene que entregar a PluriFin las credenciales de su banco.

## Tercera prohibición: la inteligencia artificial, solo con la clave del usuario

El análisis con inteligencia artificial es opcional. Usa Google Gemini con una clave que el usuario introduce personalmente y que custodia el sistema operativo del teléfono. Quien lo activa envía a Google la pregunta y la composición de la cartera: títulos, cantidades, precios medios. La petición sale del teléfono y no pasa por PluriFin, que no la conserva.

Las respuestas son ideas generadas por un modelo, no asesoramiento financiero personalizado, y pueden contener errores. Las decisiones siguen siendo de quien invierte.

## La lista de precios que sale de ahí

Una empresa que no conserva las carteras no paga por conservarlas, y una que no muestra publicidad no tiene anunciantes a los que contentar. Queda una app, con su precio: siete días de prueba sin tarjeta de crédito y, después, cuatro planes, los mismos para todos, de 4,99 euros al año a 49,99 euros una sola vez para la familia.

Terminada la prueba queda una versión gratuita. Las posiciones se introducen a mano, el rebalanceo y los datos de mercado siguen funcionando; la importación desde los brókeres, los objetivos y la inteligencia artificial se detienen hasta que se elige un plan. La lista de precios completa, con renovaciones y reembolsos, está en la página [Precios](/es/pricing).

## Dónde comprobar lo que aquí se dice

El código de este sitio y el flujo de datos de mercado son públicos en el repositorio [portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data). Lo que la app hace con los datos está escrito por extenso en la [política de privacidad](/es/privacy), en seis idiomas. La [demo web](/app/) se abre en el navegador sin instalar nada.

*Artículo del 7 de mayo de 2026, reescrito el 11 de noviembre de 2026 con los hechos de hoy.*
