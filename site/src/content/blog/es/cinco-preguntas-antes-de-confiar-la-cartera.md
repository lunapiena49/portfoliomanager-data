---
title: "Cinco preguntas que hacerle a una app antes de confiarle la cartera"
summary: "Adónde van los datos, cómo entran los extractos, quién lee las preguntas a la inteligencia artificial, qué no hace la app y cuánto cuesta. Con las respuestas de Portfolio Manager."
publishedAt: 2026-05-03
updatedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Redacción"
lang: "es"
tags: ["portfolio-tracker", "inversiones", "guia", "privacidad"]
draft: false
---

Llevar en una hoja de cálculo una cartera repartida entre varios brókeres significa reescribir a mano lo que cada extracto dice a su manera. Quien se cansa busca una app, y antes de cargarle los extractos conviene hacerle cinco preguntas. Debajo de cada una está la respuesta de Portfolio Manager, la app de PluriFin Finance: quien lee puede comprobarla en la demo web y en la política de privacidad, y exigir la misma claridad a las demás.

## 1. Adónde van a parar los datos

Las respuestas posibles son tres:

- **En los servidores de quien hace la app**: cómodo para quien usa varios dispositivos, pero la cartera vive en casa ajena
- **En el dispositivo, sin cifrar**: es el caso de la hoja de cálculo, legible para cualquier programa con acceso a los archivos
- **En el dispositivo, cifrados**: la clave nace en el teléfono y ahí se queda

Portfolio Manager está en la tercera. Carteras, posiciones y objetivos se quedan en el teléfono, cifrados con AES-256, con la clave custodiada por el sistema operativo. PluriFin no tiene un almacén donde guardarlos y no pide abrir una cuenta. La excepción es la demo web, y lo declara: sus datos se quedan en el navegador, sin cifrar.

Una app gratuita que conserva las carteras en sus servidores tiene un coste que cubrir. La pregunta siguiente es con qué lo cubre.

## 2. Cómo entran los extractos

Los caminos son dos: entregar a la app las credenciales del bróker, o importar los archivos que el bróker exporta. Portfolio Manager solo conoce el segundo: no se conecta a las cuentas y no ejecuta órdenes.

La app lee los CSV de once brókeres: Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (hoy parte de Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB y Revolut. Para los demás hay un lector genérico, al que le bastan el símbolo del título y una columna entre cantidad, valor y precio. También acepta PDF, de los que intenta extraer la tabla.

A cualquier app hay que preguntarle si la importación del propio extracto se puede probar antes de pagar. En Portfolio Manager, sí: los siete días de prueba tienen todas las funciones y no piden tarjeta de crédito. En la demo web, no: ahí las posiciones se introducen a mano, cinco como máximo.

## 3. Quién lee las preguntas hechas a la inteligencia artificial

Un análisis de la cartera escrito por un modelo exige enviar la cartera a quien gestiona el modelo. Conviene saber por qué servidores pasa y quién la conserva.

En Portfolio Manager el análisis es opcional y usa Google Gemini, con una clave que el usuario introduce personalmente. La pregunta y la composición de la cartera (títulos, cantidades, precios medios) van del teléfono a Google sin pasar por PluriFin, que no las conserva. Lo mismo vale para los precios en tiempo real: los símbolos de los títulos van al proveedor que el usuario elige.

## 4. Qué no hace la app

Portfolio Manager no ejecuta órdenes y no es un bróker. Los análisis de la inteligencia artificial son ideas generadas por un modelo: no son asesoramiento financiero personalizado y pueden contener errores.

La app tampoco calcula los impuestos. Las ganancias y pérdidas que muestra son cuentas aritméticas: precio actual menos precio medio, por la cantidad. No tienen en cuenta la tributación de las plusvalías, el impuesto de timbre italiano sobre los valores (el *bollo*) ni la compensación de las minusvalías. Para la declaración de la renta, el aviso financiero de la app remite a un asesor fiscal o a un gestor.

Para llevarse los datos a otra parte está «Exportar mis datos», que genera un archivo JSON con todo el contenido.

## 5. Cuánto cuesta, y qué pasa cuando se deja de pagar

El vicio del sector es la prueba que pide la tarjeta y la suscripción que arranca sola cuando nadie mira. En Portfolio Manager la prueba dura siete días y no conoce la tarjeta de quien la usa: cuando termina, ningún cargo sale solo.

Después hay cuatro planes, los mismos para todos, de 4,99 euros al año a 49,99 euros una sola vez para la familia. Ningún plan lleva publicidad. Renovaciones, cancelación y reembolsos están en la página [Precios](/es/pricing).

Terminada la prueba queda una versión gratuita. Las posiciones se introducen a mano, el rebalanceo y los datos de mercado siguen funcionando; la importación desde los brókeres, los objetivos y la inteligencia artificial se detienen hasta que se elige un plan. En cualquier caso, los datos se quedan en el teléfono, exportables.

## Por dónde empezar

La [demo web](/app/) se abre en el navegador sin instalar nada, con límites declarados: cinco posiciones introducidas a mano, sin importación, sin objetivos y sin inteligencia artificial. Quien se quede con la hoja de cálculo puede llevarse las cinco preguntas: valen para cualquier app.

*Artículo del 3 de mayo de 2026, reescrito el 11 de noviembre de 2026 con los hechos de hoy. Portfolio Manager es una herramienta informativa: sus contenidos no constituyen asesoramiento financiero, fiscal ni legal.*
