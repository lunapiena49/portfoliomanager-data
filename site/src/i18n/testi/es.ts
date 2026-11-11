import type { Testi } from '../testi';

/* SPAGNOLO (es, Spagna; leggibile in America Latina), riscritto da it.ts al
 * commit 45f902a (S384, lotto traduzioni).
 *
 * File di LOCALIZZAZIONE: UTF-8 con accenti, virgolette angolari e punti
 * interrogativi d'apertura veri.
 *
 * LA VOCE e I FATTI sono quelli descritti in testa a it.ts: non e' una
 * traduzione parola per parola, ma nessuna affermazione e' aggiunta o tolta.
 * Chi cambia un fatto lo cambia prima in it.ts e nella tabella
 * storico/harness/S384/SITO_A_FATTI.md.
 *
 * Scelte di resa, perche' restino coerenti:
 *  - "broker" e' "bróker", plurale "brókeres" (RAE, Fundéu);
 *  - i nomi delle schermate e delle funzioni sono quelli dell'app in spagnolo
 *    (assets/translations/es.json): Cartera, Mercado, Rebalanceo, Análisis,
 *    Objetivos, «Exportar mis datos», «Borrar todos los datos»;
 *  - i nomi del gioco sono quelli di rollquest/localization/strings/es.json:
 *    Rey Corvax, Astralitas, Ascensión, cofre, jefe, piso;
 *  - "listino" dei prezzi e' "lista de precios"; il listino di borsa e' "tabla
 *    de cotizaciones"; "tetto di spesa" e' "tope de gasto"; "archivio" e'
 *    "almacén" ("archivo" resta il file);
 *  - "gruppo Famiglia di Google" e' "grupo familiar de Google", il nome che
 *    Google usa in spagnolo.
 *
 * GOOGLE PLAY: stesse regole di it.ts. Come luogo da cui si prende l'app sta
 * solo in `suPlay` e `azioni.play`; come canale di pagamento solo in
 * `prezzi.nota` e nei capitoli `pagamento` e `famiglia` di `prezzi`. Lo
 * presidia integrations/testi.test.mjs.
 */
const es: Testi = {
  lingua: 'es',

  comune: {
    salta: 'Ir al texto',
    navEtichetta: 'Secciones',
    nav: { finance: 'Finance', games: 'Games', casa: 'La casa', notizie: 'Noticias' },
    lingua: 'Idioma',
    azioni: {
      demo: 'Abrir la demo web',
      play: 'Descargar en Google Play',
      prezzi: 'Leer la lista de precios completa',
      finance: 'Leer todo sobre Portfolio Manager',
      games: 'Leer todo sobre ROLLQUEST',
      notizie: 'Seguir las obras en Noticias',
      scrivi: 'Escribir a PluriFin',
    },
    avvisoFinance:
      'Portfolio Manager es una herramienta informativa: no ejecuta órdenes. El análisis con inteligencia artificial produce ideas generadas por un modelo, no asesoramiento financiero personalizado.',
    avvisoFinanceLungo:
      'Portfolio Manager es una herramienta informativa. Los contenidos y los análisis que muestra, incluidos los generados por la inteligencia artificial, no constituyen asesoramiento financiero, fiscal ni legal en el sentido del Texto Único de Finanzas italiano (D.Lgs. 58/1998) ni de normas análogas. PluriFin no gestiona capitales y no ejecuta órdenes. Las decisiones de inversión se toman con un profesional habilitado.',
    datiEsempio: 'Datos de ejemplo.',
    colophon: {
      riga: 'A PluriFin la fundó y la dirige Filippo Salemi, en Italia.',
      stampa: 'Prensa',
      informazioni: 'Información',
      privacy: 'Privacidad',
      giochi: 'Games',
      lingue: 'Idiomas',
      pagine: 'Páginas',
      legali: 'Documentos legales',
      voci: {
        prezzi: 'Precios',
        domande: 'Preguntas frecuentes',
        contatti: 'Contacto',
        stampa: 'Prensa',
        informativa: 'Política de privacidad',
        termini: 'Términos de servicio',
        avvertenza: 'Aviso financiero',
        dmca: 'DMCA',
        codice: 'Código del sitio y datos de mercado',
      },
      diritti: '© 2026 PluriFin',
    },
  },

  /* ================================ LA PORTADA ================================ */
  home: {
    meta: {
      titolo: 'PluriFin: las cuentas de día, los dados de noche',
      descrizione:
        'PluriFin es la empresa italiana fundada por Filippo Salemi. Portfolio Manager reúne en una sola cartera los extractos de once brókeres; ROLLQUEST es el juego de mesa en el que una torre se sube dado a dado.',
    },
    occhiello: 'Italia, dos divisiones bajo un mismo nombre',
    titolo: 'PluriFin lleva las cuentas de día y tira los dados de noche',
    sommario:
      'La empresa que fundó y dirige Filippo Salemi tiene dos oficios que no se hablan. De día, Portfolio Manager reúne en una sola cartera los extractos de once brókeres y la guarda en el teléfono de su dueño. De noche, ROLLQUEST levanta una torre que se sube dado a dado. La regla es la misma para los dos: no ganar dinero a costa de quien los usa.',
    casa: {
      titolo: 'Una casa, dos oficios, una regla',
      paragrafi: [
        'PluriFin nace en Italia. La dirige Filippo Salemi, fundador y CEO, que la dividió en dos: Finance construye herramientas para quien administra por su cuenta sus ahorros, Games construye juegos. Las dos divisiones no se prestan ni las palabras: en los textos de Finance no entra el léxico del juego, y en los de Games no entra el de las finanzas.',
        'Comparten una regla: no se gana dinero contra el interés de quien los usa. En el sector es menos obvio de lo que parece. Hay apps de finanzas gratuitas porque la mercancía es la cartera de quien las instala, y hay juegos gratuitos sin tope de gasto, en los que la cuenta se descubre a fin de mes. PluriFin dice el precio antes, pone un tope al gasto en el juego y no revende nada de quien compra.',
        'Cada producto sale en seis idiomas a la vez: italiano, inglés, español, francés, alemán y portugués.',
      ],
    },
    finance: {
      rubrica: 'Finance, Portfolio Manager',
      titolo: 'Once extractos, una sola cartera',
      passi: [
        [
          'Quien invierte a través de varios brókeres recibe de cada uno un extracto con formato propio: columnas en otro orden, fechas escritas al revés, divisas que se dan por supuestas. Once intermediarios, once maneras de decir lo mismo.',
          'Portfolio Manager lee los CSV de once brókeres, de Interactive Brokers a DEGIRO, de Fidelity a Revolut, y los reúne en una única cartera. Para los demás hay un lector genérico. También acepta PDF, de los que intenta extraer la tabla.',
        ],
        [
          'La cartera se queda en el teléfono, cifrada con AES-256. PluriFin no tiene un almacén donde guardarla y no pide abrir una cuenta: no hay nada que robar donde no hay nada en depósito.',
          'A PluriFin la cartera no le llega nunca. Para verificar la prueba y la suscripción bastan una huella anónima del dispositivo y el recibo de la compra. El análisis con inteligencia artificial es opcional: quien lo activa envía la pregunta y la composición de la cartera a Google Gemini, con una clave que introduce personalmente.',
        ],
        [
          'La lista de precios tiene cuatro líneas. Tras siete días de prueba sin tarjeta de crédito se elige: una suscripción anual o un pago único, para siempre. El plan Familiar vale para quien compra y para los miembros de su grupo familiar de Google, hasta cinco.',
          'Ningún plan lleva publicidad: el producto es la app, no quien la usa.',
        ],
      ],
      listinoTitolo: 'La lista de precios de Portfolio Manager',
      listinoNota: 'Precios en euros para el mercado italiano, IVA incluida donde corresponda.',
      colonne: { piano: 'Plan', prezzo: 'Precio' },
      palco: {
        testa: 'Cartera',
        valuta: 'EUR',
        totale: 'Total',
        sigillo: 'Cifrada, en el teléfono',
      },
    },
    mercato: {
      titolo: 'De la bolsa',
      nota: 'Las tres mayores subidas y las tres mayores bajadas del día, tomadas del flujo público de datos que también descarga la app. El flujo conserva los títulos con al menos 20 millones de dólares negociados en el día y descarta las variaciones superiores al 25 %. Datos de cierre, fuente EODHD, regenerados cada noche. Es una tabla de cotizaciones, no un consejo.',
      colonne: { titolo: 'Valor', chiusura: 'Cierre', variazione: 'Variación' },
      rialzi: 'Subidas',
      ribassi: 'Bajadas',
      seduta: 'Wall Street, sesión del',
    },
    imbrunire: 'Herramientas serias, y juegos que se encienden.',
    games: {
      rubrica: 'Games, en desarrollo',
      titolo: 'ROLLQUEST, la torre se sube dado a dado',
      passi: [
        [
          'ROLLQUEST es un juego de mesa digital para Android. Se tira un dado y Rollo, caballero redondo y testarudo, avanza por un anillo de catorce casillas alrededor de la torre del Rey Corvax, el cuervo hechicero que robó las estrellas.',
          'No todas las casillas son iguales: en una se combate, otra esconde un cofre, otra ofrece un talismán a elegir entre tres cartas, y alguna está quemada y no da nada. Cerrada la vuelta, se sube un piso.',
        ],
        [
          'Quien no gasta completa todo el contenido. Se compran comodidad, estética y Astralitas, con un tope de 20 euros al mes: quien compra llega antes, no adonde los demás no pueden llegar.',
          'Dicho con todas las letras: las Astralitas son la moneda del juego y pagan también cofres de contenido aleatorio, y por eso la etiqueta es 16+. El vicio del sector es el juego sin tope, en el que la cuenta se descubre a fin de mes. PluriFin escribe aquí su tope, donde cualquiera podrá echárselo en cara.',
        ],
        [
          'El mundo es un cuento oscuro ilustrado: piedra, vidrieras, luz de farol, y nunca el horror. Rollo, los enemigos, la torre y los dados son originales, dibujados para este juego, que saldrá en seis idiomas.',
          'El estudio es pequeño; la ambición, no. ROLLQUEST está en desarrollo y no tiene fecha: PluriFin la anunciará cuando haya algo a lo que jugar.',
        ],
      ],
      palco: { ascesa: 'Ascensión', cima: 'En la cima' },
    },
  },

  /* ============================ PORTFOLIO MANAGER ============================ */
  finance: {
    meta: {
      titolo: 'Portfolio Manager: once brókeres, una sola cartera',
      descrizione:
        'Portfolio Manager lee los extractos de once brókeres y los reúne en una cartera cifrada en el teléfono. Sin cuenta, sin publicidad, con siete días de prueba.',
    },
    occhiello: 'PluriFin Finance',
    titolo: 'Portfolio Manager vuelve a juntar las cuentas que los brókeres mantienen separadas',
    sommario:
      'La app de PluriFin lee los extractos de once brókeres y los reúne en una sola cartera, cifrada en el teléfono de su dueño. No pide una cuenta y no muestra publicidad. La empresa que la hace no sabe cuánto tiene quien la usa, y se ha encargado de no poder saberlo.',
    capitoli: [
      {
        id: 'import',
        titolo: 'Once formatos, una sola tabla',
        paragrafi: [
          'Cada bróker exporta las posiciones a su manera. Portfolio Manager reconoce el formato de los CSV de once brókeres, muestra una vista previa de las filas que hay que corregir y gestiona los duplicados antes de guardar. También acepta PDF, de los que intenta extraer la tabla.',
          'La app no se conecta nunca a la cuenta y no ejecuta órdenes: los datos entran porque los trae su dueño, archivo a archivo. Es más lento que una conexión automática, y es la razón por la que nadie tiene que entregar a PluriFin las credenciales de su banco.',
        ],
      },
      {
        id: 'portafoglio',
        titolo: 'Qué se ve, una vez reunidas las cuentas',
        paragrafi: [
          'Con las cuentas reunidas, la app muestra la cartera entera en una sola divisa, el reparto entre tipos de activo y las ganancias y pérdidas de cada posición. Los objetivos dicen cuánto falta para la meta y cuánto aportar cada mes; el rebalanceo propone cómo volver a la asignación decidida.',
          'El análisis con inteligencia artificial es opcional y usa Google Gemini, con una clave que el usuario introduce personalmente. Quien lo activa envía a Google la pregunta y la composición de la cartera: títulos, cantidades, precios medios. Las respuestas son ideas generadas por un modelo, no asesoramiento personalizado, y pueden contener errores: las decisiones siguen siendo de quien invierte.',
        ],
      },
    ],
    broker: {
      titolo: 'Los brókeres que la app lee por sí sola',
      generico:
        'Para cualquier otro intermediario hay un lector CSV genérico: encuentra por sí solo la fila de los encabezados, y le bastan el símbolo del título y una columna entre cantidad, valor y precio.',
    },
    dati: {
      titolo: 'Dónde están los datos, dicho por extenso',
      premessa:
        'Las políticas de privacidad tienen fama de escribirse para que nadie las lea. Esta es la versión corta. Donde dice menos que la larga, vale la larga, que es el documento legal.',
      voci: [
        {
          termine: 'En el teléfono',
          descrizione:
            'Carteras, posiciones y objetivos, cifrados con AES-256. La clave la custodia el sistema operativo, igual que las claves API que introduce el usuario. Sin cifrar quedan algunas preferencias de servicio, por ejemplo el consentimiento al diagnóstico.',
        },
        {
          termine: 'En ningún almacén de PluriFin',
          descrizione: 'La empresa no conserva las carteras y no pide abrir una cuenta.',
        },
        {
          termine: 'A PluriFin',
          descrizione:
            'La cartera, nunca. Para verificar la prueba de siete días y la suscripción bastan una huella anónima del dispositivo y el recibo de la compra.',
        },
        {
          termine: 'A terceros, solo si el usuario lo activa',
          descrizione:
            'Con la inteligencia artificial activada, la pregunta y la composición de la cartera (títulos, cantidades, precios medios) van a Google Gemini. Con los precios en tiempo real activados, los símbolos de los títulos van al proveedor elegido. En ambos casos la petición sale del teléfono y no pasa por PluriFin.',
        },
        {
          termine: 'A quien aloja el sitio',
          descrizione:
            'La app descarga de plurifin.app la tabla pública de cotizaciones. GitHub y Cloudflare, que alojan el sitio, ven la dirección IP de la petición, como con cualquier página web.',
        },
        {
          termine: 'Diagnóstico',
          descrizione:
            'Los informes de fallos (Firebase Crashlytics, solo en Android) se envían únicamente si el usuario activa el diagnóstico en los ajustes. Mientras está desactivado no se transmite nada: los informes recogidos entretanto se quedan en el teléfono y salen si se activa, y solo entonces. No contienen datos de la cartera ni claves, y desinstalar la app los elimina.',
        },
        {
          termine: 'Publicidad y rastreo',
          descrizione: 'Ninguna publicidad. En la app no hay ningún SDK de analítica.',
        },
        {
          termine: 'Salida',
          descrizione:
            '«Exportar mis datos» genera un archivo JSON con todo el contenido; «Borrar todos los datos» lo elimina del teléfono.',
        },
      ],
      chiusa: 'El texto completo está en la política de privacidad, en seis idiomas.',
    },
    prezzi: {
      titolo: 'Cuánto cuesta',
      testo:
        'Siete días de prueba sin tarjeta de crédito. Después, cuatro planes, los mismos para todos: de 4,99 € al año a 49,99 € una sola vez para la familia. Ninguna publicidad en ningún plan.',
    },
    provare: {
      titolo: 'Probarla antes de fiarse',
      demo: 'La demo web se abre en el navegador sin instalar nada. Tiene límites declarados: cinco posiciones introducidas a mano, sin importación, sin objetivos y sin inteligencia artificial. Sus datos se quedan en el navegador, sin cifrar: sirve para ver cómo es la app, no para custodiar una cartera de verdad.',
      suPlay: 'La app completa está en Google Play.',
    },
    palco: {
      titolo: 'Las pantallas de la app',
      schermate: [
        {
          termine: 'Cartera',
          descrizione:
            'Pantalla de la app: el valor total de la cartera, la ganancia total y el mapa de las posiciones, un recuadro por título.',
        },
        {
          termine: 'Mercado',
          descrizione:
            'Pantalla de la app: la visión general del mercado y los precios actualizados de las posiciones en cartera.',
        },
        {
          termine: 'Rebalanceo',
          descrizione:
            'Pantalla de la app: la asignación objetivo, el valor de la cartera y el resultado del rebalanceo.',
        },
        {
          termine: 'Análisis',
          descrizione:
            'Pantalla de la app: los análisis rápidos, los indicadores de la cartera y el aviso de que los contenidos no son asesoramiento financiero.',
        },
      ],
    },
  },

  /* ================================ ROLLQUEST ================================ */
  games: {
    meta: {
      titolo: 'ROLLQUEST: la torre se sube dado a dado',
      descrizione:
        'ROLLQUEST es el juego de mesa digital de PluriFin Games: un dado, un anillo de catorce casillas, una torre que subir. En desarrollo para Android, en seis idiomas.',
    },
    occhiello: 'PluriFin Games, en desarrollo',
    titolo: 'ROLLQUEST sube el juego de mesa a lo alto de una torre',
    sommario:
      'Un dado, un anillo de catorce casillas y una torre que se sube piso a piso. El juego de PluriFin está en desarrollo para Android, en seis idiomas. Sobre el dinero tiene una regla escrita, con un tope de gasto: está entera en el capítulo que lleva su nombre.',
    capitoli: [
      {
        id: 'gioco',
        titolo: 'Cómo se juega',
        paragrafi: [
          'Se tira el dado y Rollo avanza por el anillo. La casilla decide qué pasa: un combate, un cofre, un talismán a elegir entre tres cartas, o nada, si la casilla está quemada. Con el botín se equipa al héroe y, cerrada la vuelta, se sube un piso. Diez pisos hacen una Ascensión, y en el último espera un jefe.',
          'Es un juego de mesa que ha tomado dos costumbres de los videojuegos: del roguelite, la partida que vuelve a empezar y nunca sale igual; del soulslike, la derrota que enseña algo. Una partida dura de dos a cinco minutos; la progresión del héroe continúa de una partida a otra.',
        ],
      },
      {
        id: 'storia',
        titolo: 'La historia, en pocas líneas',
        paragrafi: [
          'El Rey Corvax, cuervo y hechicero, saqueó el reino de las Estrellas y las encerró en su Torre, suspendida en el cielo. Rollo, caballero redondo y testarudo, la sube piso a piso para recuperarlas.',
          'Lo acompañan Lumen, luciérnaga encantada; Baffo, tejón y tendero; Bruna, osa y herrera. El tono es el de un cuento oscuro ilustrado: arquitectura, vidrieras y luz de farol. Nunca el horror, nunca la sangre.',
        ],
      },
      {
        id: 'soldi',
        titolo: 'La regla del dinero',
        paragrafi: [
          'Quien no gasta completa todo el contenido del juego. Es la restricción con la que PluriFin equilibra la economía: cada cambio se verifica contra él, con un simulador, antes de llegar a los jugadores.',
          'Se compran comodidad, estética y Astralitas, con un tope de 20 euros al mes: quien compra llega antes, no adonde los demás no pueden llegar. Dicho con todas las letras: las Astralitas son la moneda del juego y lo pagan todo, incluidos cofres de contenido aleatorio. Por eso la etiqueta es 16+, mientras que el contenido sigue siendo un cuento sin horror y sin sangre.',
          'Hoy ROLLQUEST está en desarrollo y todavía no vende nada. El vicio del sector es el juego sin tope, en el que la cuenta se descubre a fin de mes. Aquí el tope existe y está escrito en esta página, donde cualquiera podrá echárselo en cara a PluriFin.',
        ],
      },
      {
        id: 'mestiere',
        titolo: 'De qué está hecho',
        paragrafi: [
          'Rollo, los enemigos, los jefes, el dado, el tablero y la interfaz son originales, dibujados para este juego. El equipo puede incluir piezas de terceros autores, siempre con licencia y créditos declarados.',
          'El motor es Unity. Los números de la economía pasan por un simulador antes de llegar a la pantalla, porque en un juego de mesa las reglas se ven, y una regla que se ve tiene que aguantar.',
        ],
      },
    ],
    stato: {
      titolo: 'En qué punto está',
      paragrafi: [
        'ROLLQUEST está en desarrollo. No tiene fecha de salida, y PluriFin no se inventa una para rellenar una línea: la anunciará en Noticias cuando haya algo a lo que jugar.',
        'En este sitio no hay lista de espera a la que apuntarse. El juego está declarado para jugadores a partir de dieciséis años y saldrá en seis idiomas: italiano, inglés, español, francés, alemán y portugués.',
        'El estudio es pequeño y piensa a lo grande: un mundo entero, una torre que no se acaba en el primer jefe y la pretensión de estar en el mismo estante que los juegos hechos por cien personas.',
      ],
    },
    /* La didascalia delle immagini della pagina (v. it.ts). */
    immagini:
      'La torre de esta página está hecha con los fondos del juego, reducidos para la web. Las ventanas apagadas no vienen del juego: son una versión hecha para el sitio, para que se enciendan al subir.',
  },

  /* ================================= LA CASA ================================= */
  casa: {
    meta: {
      titolo: 'La casa: quién dirige PluriFin y cómo trabaja',
      descrizione:
        'PluriFin es una empresa italiana fundada y dirigida por Filippo Salemi. Tiene dos divisiones, Finance y Games, y una regla: no ganar dinero a costa de quien usa sus productos.',
    },
    occhiello: 'La casa',
    titolo: 'PluriFin, dos divisiones y una sola manera de ganar dinero',
    sommario:
      'Una empresa italiana, fundada y dirigida por Filippo Salemi, que construye una app de finanzas personales y un juego de mesa. Cuando pide dinero dice antes cuánto: una lista de precios de cuatro líneas para la app, un tope de 20 euros al mes para el juego.',
    capitoli: [
      {
        id: 'fondatore',
        titolo: 'Quién la dirige',
        paragrafi: [
          'Filippo Salemi es el fundador y CEO de PluriFin. Ha levantado la empresa sobre dos divisiones y sobre una regla que va por delante de ambas: no ganar dinero contra el interés de quien usa los productos.',
          'En los documentos legales, el titular de los productos y responsable del tratamiento de los datos figura con su nombre, y es la misma persona. Quien tiene una pregunta sabe a quién hacérsela.',
        ],
      },
      {
        id: 'divisioni',
        titolo: 'Las dos divisiones',
        paragrafi: [
          'PluriFin Finance hace Portfolio Manager, la app que reúne en una sola cartera los extractos de once brókeres y la mantiene cifrada en el teléfono.',
          'PluriFin Games hace ROLLQUEST, un juego de mesa digital para Android en el que una torre se sube dado a dado. Está en desarrollo.',
          'Las dos divisiones no se parecen ni tienen por qué parecerse. Comparten el método: se trabaja hasta que la cosa funciona, y entonces se publica.',
        ],
      },
      {
        id: 'metodo',
        titolo: 'Cómo trabaja',
        paragrafi: [
          'Cada producto sale en seis idiomas a la vez. Los precios de Portfolio Manager están en una sola lista, y un control automático compara con esa lista cada página que los repite, esta incluida.',
          'El código de este sitio y el flujo de datos de mercado son públicos: quien quiera comprobar cómo están hechos no tiene que pedir permiso.',
        ],
      },
    ],
    /* La forma giuridica detta in chiaro (v. it.ts). */
    titolare: {
      titolo: 'Quién responde ante la ley',
      testo:
        'PluriFin es la marca con la que Filippo Salemi publica sus productos. En los documentos legales, de la política de privacidad a los términos de servicio, el titular es él: una persona física, en Italia, no una sociedad.',
    },
    nonFa: {
      titolo: 'Lo que PluriFin no hace',
      voci: [
        'No vende los datos de quien usa sus productos, y no los recoge para poder hacerlo.',
        'No muestra publicidad en Portfolio Manager ni en este sitio.',
        'En este sitio no hay nada a lo que apuntarse: ninguna lista de espera, ningún boletín.',
        'No anuncia fechas que no puede cumplir.',
      ],
    },
    contatti: {
      titolo: 'Escribir a PluriFin',
      testo: 'Responde una persona.',
    },
  },

  /* ================================= PRENSA ================================= */
  stampa: {
    meta: {
      titolo: 'Prensa: hechos, textos listos y contacto',
      descrizione:
        'Hechos verificables sobre PluriFin, Portfolio Manager y ROLLQUEST, textos listos para citar y el contacto de prensa.',
    },
    occhiello: 'Prensa',
    titolo: 'Para quien escribe sobre PluriFin',
    sommario:
      'Hechos que se pueden verificar, dos textos listos para citar y una dirección en la que responde una persona. Nada de adjetivos: esos los pone quien escribe.',
    inBreve: {
      titolo: 'La empresa, en breve',
      voci: [
        { termine: 'Nombre', descrizione: 'PluriFin' },
        { termine: 'Fundador y CEO', descrizione: 'Filippo Salemi' },
        { termine: 'País', descrizione: 'Italia' },
        {
          termine: 'Divisiones',
          descrizione: 'PluriFin Finance (Portfolio Manager) y PluriFin Games (ROLLQUEST)',
        },
        {
          termine: 'Idiomas',
          descrizione: 'Seis: italiano, inglés, español, francés, alemán y portugués',
        },
      ],
    },
    /* La forma giuridica, per chi deve scriverla giusta (v. it.ts). */
    formaGiuridica: {
      termine: 'Forma jurídica',
      descrizione:
        'Persona física. En los documentos legales el titular es Filippo Salemi; PluriFin es la marca.',
    },
    finance: {
      titolo: 'Portfolio Manager, los hechos',
      voci: [
        {
          termine: 'Qué es',
          descrizione:
            'Una app que reúne en una sola cartera los extractos de varios brókeres y la guarda en el dispositivo.',
        },
        { termine: 'Plataformas', descrizione: 'Android. Una demo gratuita funciona en el navegador.' },
        { termine: 'Brókeres leídos', descrizione: 'Once, más un lector CSV genérico.' },
        {
          termine: 'Archivos',
          descrizione:
            'CSV de once brókeres, más un lector genérico; también PDF, de los que la app intenta extraer la tabla. Se importan a mano, sin conexión con las cuentas.',
        },
        { termine: 'Datos', descrizione: 'En el dispositivo, cifrados con AES-256. Sin cuenta.' },
        {
          termine: 'Inteligencia artificial',
          descrizione: 'Opcional: Google Gemini, con la clave del usuario.',
        },
        {
          termine: 'Precios',
          descrizione:
            'Siete días de prueba sin tarjeta. Cuatro planes, de 4,99 € al año a 49,99 € en un pago único.',
        },
        { termine: 'Publicidad', descrizione: 'Ninguna.' },
        {
          termine: 'Aviso',
          descrizione:
            'Es una herramienta informativa: no ejecuta órdenes, y sus contenidos, incluidos los análisis de la inteligencia artificial, no constituyen asesoramiento financiero. Debe mantenerse en cada artículo.',
        },
      ],
    },
    games: {
      titolo: 'ROLLQUEST, los hechos',
      voci: [
        {
          termine: 'Qué es',
          descrizione:
            'Un juego de mesa digital: un dado, un anillo de catorce casillas, una torre que subir.',
        },
        { termine: 'Plataforma', descrizione: 'Android.' },
        { termine: 'Motor', descrizione: 'Unity.' },
        { termine: 'Idiomas', descrizione: 'Seis.' },
        { termine: 'Público', descrizione: 'Jugadores a partir de dieciséis años.' },
        { termine: 'Estado', descrizione: 'En desarrollo. Ninguna fecha anunciada.' },
        {
          termine: 'Regla',
          descrizione:
            'Quien no gasta completa todo el contenido y quien gasta tiene un tope de 20 euros al mes: la regla entera, cofres de contenido aleatorio incluidos, está en el capítulo del dinero de la página Games.',
        },
      ],
    },
    pronti: {
      titolo: 'Textos listos',
      premessa: 'Se pueden copiar tal cual.',
      riga: 'PluriFin es una empresa italiana, fundada por Filippo Salemi, que construye herramientas serias y juegos que se encienden: Portfolio Manager para las finanzas personales y ROLLQUEST para el juego.',
      paragrafo:
        'PluriFin es una empresa italiana fundada y dirigida por Filippo Salemi, con dos divisiones. Finance desarrolla Portfolio Manager, una app que reúne en una sola cartera los extractos de once brókeres y la mantiene cifrada en el dispositivo, sin cuenta y sin publicidad. Games desarrolla ROLLQUEST, un juego de mesa digital para Android ambientado en una torre, hoy en desarrollo. Las dos divisiones comparten una regla, no ganar dinero contra el interés de quien usa los productos, y publican cada producto en seis idiomas.',
    },
    materiali: {
      titolo: 'Materiales',
      voci: [
        { termine: 'Logotipo', descrizione: 'El glifo de PluriFin, en formato SVG.' },
        { termine: 'Imagen para redes sociales', descrizione: '1200 por 630 píxeles, en formato PNG.' },
        {
          termine: 'Capturas de pantalla y otros materiales',
          descrizione: 'A petición, escribiendo a la dirección de prensa.',
        },
      ],
      uso: 'El logotipo y las capturas se pueden usar en artículos y reseñas que hablen de PluriFin. El glifo no se redibuja ni se recolorea.',
    },
    contatto: {
      titolo: 'Contacto de prensa',
      testo: 'Responde una persona.',
    },
  },

  /* ================================= PRECIOS ================================= */
  prezzi: {
    meta: {
      titolo: 'Precios de Portfolio Manager',
      descrizione:
        'Cuatro planes, los mismos para todos, desde 4,99 € al año. Siete días de prueba sin tarjeta de crédito, ninguna publicidad.',
    },
    occhiello: 'Finance, la lista de precios',
    titolo: 'Cuánto cuesta Portfolio Manager, con todo detalle',
    sommario:
      'Portfolio Manager tiene cuatro planes, los mismos para todos, y siete días de prueba sin tarjeta de crédito. Ningún plan lleva publicidad. El resto de esta página son detalles, y en una lista de precios los detalles son lo que importa.',
    colonne: { piano: 'Plan', prezzo: 'Precio', perChi: 'Para quién', rinnovo: 'Renovación' },
    piani: [
      {
        id: 'single_annual',
        nome: 'Individual, anual',
        prezzo: '4,99 € al año',
        perChi: 'Una cuenta de Google',
        rinnovo: 'Automática cada doce meses; se desactiva cuando se quiera',
      },
      {
        id: 'single_lifetime',
        nome: 'Individual, de por vida',
        prezzo: '29,99 € en un pago único',
        perChi: 'Una cuenta de Google',
        rinnovo: 'Ninguna: se paga una vez',
      },
      {
        id: 'family_annual',
        nome: 'Familiar, anual',
        prezzo: '9,99 € al año',
        perChi: 'Quien compra y hasta cinco miembros de su grupo familiar de Google',
        rinnovo: 'Automática cada doce meses; se desactiva cuando se quiera',
      },
      {
        id: 'family_lifetime',
        nome: 'Familiar, de por vida',
        prezzo: '49,99 € en un pago único',
        perChi: 'Quien compra y hasta cinco miembros de su grupo familiar de Google',
        rinnovo: 'Ninguna: se paga una vez',
      },
    ],
    nota: 'Precios en euros para el mercado italiano, IVA incluida donde corresponda. En los demás países Google Play aplica su propia conversión.',
    capitoli: [
      {
        id: 'prova',
        titolo: 'La prueba de siete días',
        paragrafi: [
          'Desde el primer arranque la app funciona siete días con todas las funciones, sin pedir tarjeta de crédito. Ningún cargo sale solo. La prueba va ligada a la instalación de la app, no a una cuenta: para empezarla no hace falta registrarse.',
          'Terminada la prueba queda la versión gratuita. Las posiciones se introducen a mano, el rebalanceo y los datos de mercado siguen funcionando; la importación desde los brókeres, los objetivos y la inteligencia artificial se detienen hasta que se elige un plan.',
        ],
      },
      {
        id: 'tutti',
        titolo: 'Qué incluye cada plan',
        paragrafi: [
          'Los cuatro planes desbloquean las mismas funciones: importación desde los brókeres, objetivos y análisis con inteligencia artificial. El rebalanceo y los datos de mercado están también en la versión gratuita. De un plan a otro solo cambian la forma de pago y el número de personas.',
        ],
      },
      {
        id: 'famiglia',
        titolo: 'Cómo funciona el plan Familiar',
        paragrafi: [
          'Quien compra comparte el plan con los miembros de su grupo familiar de Google, hasta cinco, que acceden desde su propia cuenta sin volver a pagar. El grupo lo gestiona Google, no PluriFin: las invitaciones y las bajas se hacen con las herramientas de Google.',
        ],
      },
      {
        id: 'pagamento',
        titolo: 'Pago, cancelación y reembolsos',
        paragrafi: [
          'El pago pasa íntegramente por Google Play: PluriFin no recibe los datos de la tarjeta. La renovación anual se desactiva en la página Suscripciones de Google Play, sin penalización, y el acceso se mantiene hasta el final del año ya pagado.',
          'En los planes anuales el reembolso se pide a Google Play: en las cuarenta y ocho horas siguientes a la compra, desde el historial de pedidos; más tarde decide Google. En los planes de por vida PluriFin respeta el desistimiento durante catorce días desde la compra, previa solicitud por escrito a la dirección indicada en los Términos de servicio. Traslada el expediente a Google y, si Google lo rechaza, reconoce un crédito del mismo valor o un reembolso bancario. Las condiciones completas están en los Términos de servicio.',
        ],
      },
      {
        id: 'perche',
        titolo: 'Por qué cuesta tan poco',
        paragrafi: [
          'Porque solo tiene que pagarse a sí misma. No hay anunciantes a los que contentar ni datos que rentabilizar: están la app y su precio.',
        ],
      },
      {
        id: 'chiude',
        titolo: 'Si PluriFin cerrara mañana',
        paragrafi: [
          'Los datos seguirían donde han estado siempre: en el teléfono de su dueño, exportables a un archivo JSON que otros programas saben leer.',
        ],
      },
    ],
    suPlay: 'Los planes se compran desde la app, en Google Play.',
    /* Mostrata al posto di `suPlay` finche' `pmSuPlay` e' falso (v. it.ts):
       non nomina il negozio. */
    primaDellaScheda:
      'Las compras se abren con la publicación de la app. Hasta entonces, la manera de probarla es la demo web, que es gratuita.',
  },

  /* ================================ PREGUNTAS ================================ */
  domande: {
    meta: {
      titolo: 'Preguntas frecuentes sobre Portfolio Manager',
      descrizione:
        'Lo que cuesta, los brókeres compatibles, dónde están los datos, qué hace y qué no hace la app de PluriFin Finance.',
    },
    occhiello: 'Finance, las preguntas',
    titolo: 'Las preguntas que hay que hacerle a una app de finanzas',
    sommario: 'Respuestas cortas. Donde hace falta el detalle, está la página que lo contiene.',
    voci: [
      {
        domanda: '¿Cuánto cuesta?',
        risposta:
          'Siete días de prueba sin tarjeta de crédito; después, uno de los cuatro planes de la página Precios, o la versión gratuita con menos funciones. La demo web es gratuita. Las claves para la inteligencia artificial o para los precios en tiempo real son opcionales y se pagan, si se quieren, al proveedor que se elija.',
      },
      {
        domanda: '¿Qué brókeres lee?',
        risposta:
          'Los CSV de once brókeres: Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (hoy parte de Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB y Revolut. Para los demás hay un lector CSV genérico. También acepta PDF, de los que intenta extraer la tabla.',
      },
      {
        domanda: '¿Los datos acaban en la nube?',
        risposta:
          'No. Carteras, posiciones y objetivos se quedan en el dispositivo, cifrados. Solo salen datos por las funciones opcionales que el usuario activa: la inteligencia artificial, los precios en tiempo real y el diagnóstico de fallos, cada una hacia su propio proveedor y nunca hacia PluriFin.',
      },
      {
        domanda: '¿La app compra y vende títulos?',
        risposta:
          'No. No ejecuta órdenes, no es un bróker y no se conecta a las cuentas.',
      },
      {
        domanda: '¿Qué hace la inteligencia artificial?',
        risposta:
          'Responde a preguntas sobre la cartera y escribe análisis sobre ella, incluidas ideas sobre qué cambiar. Son textos generados por un modelo, Google Gemini: no son asesoramiento financiero personalizado y pueden contener errores o datos desactualizados. Las decisiones siguen siendo de quien invierte.',
      },
      {
        domanda: '¿Hace falta una cuenta?',
        risposta:
          'No. No hay registro. La prueba de siete días va ligada a la instalación de la app; la compra va ligada a la cuenta de Google con la que se paga, no a una cuenta de PluriFin.',
      },
      {
        domanda: '¿Funciona sin conexión?',
        risposta:
          'Sí, para lo que ya está en el teléfono: la app se abre y muestra carteras y posiciones también sin red, con los últimos precios descargados. La red hace falta para actualizar los precios y para la inteligencia artificial.',
      },
      {
        domanda: '¿Se puede usar desde el navegador?',
        risposta:
          'Sí, en la demo web, con los límites declarados en la página de Portfolio Manager.',
      },
      {
        domanda: '¿En cuántos idiomas?',
        risposta: 'Seis: italiano, inglés, español, francés, alemán y portugués.',
      },
      {
        domanda: '¿Cómo llegan las actualizaciones?',
        risposta:
          'La app se actualiza desde la tienda desde la que se instaló. La demo web se actualiza al recargar la página.',
      },
    ],
  },

  /* ================================ CONTACTO ================================ */
  contatti: {
    meta: {
      titolo: 'Contacto',
      descrizione: 'Las direcciones de PluriFin para información, prensa, privacidad y Games.',
    },
    occhiello: 'Contacto',
    titolo: 'Escribir a PluriFin',
    sommario:
      'Cuatro direcciones y una persona que responde.',
    voci: [
      { termine: 'Información', descrizione: 'Preguntas sobre los productos y asistencia.' },
      { termine: 'Prensa', descrizione: 'Periodistas, reseñas, solicitudes de materiales.' },
      {
        termine: 'Privacidad',
        descrizione:
          'Preguntas sobre el tratamiento de los datos. Para las solicitudes formales de acceso, rectificación y supresión vale la dirección indicada en la política de privacidad.',
      },
      { termine: 'Games', descrizione: 'Todo lo que tiene que ver con ROLLQUEST.' },
    ],
  },

  /* ================================ NOTICIAS ================================ */
  notizie: {
    meta: {
      titolo: 'Noticias de PluriFin',
      descrizione: 'Qué cambia en PluriFin, en Portfolio Manager y en ROLLQUEST.',
    },
    occhiello: 'Noticias',
    titolo: 'Noticias',
    sommario: 'Qué cambia, escrito por quien lo ha cambiado.',
    pubblicato: 'Publicado el',
    leggi: 'Leer el artículo',
    vuoto: 'Todavía no hay noticias en este idioma.',
    ritorno: 'Todas las noticias',
  },

  legali: {
    ritorno: 'Volver a la portada',
    indice: 'Índice',
    aggiornato: 'Última actualización',
  },
};

export default es;
