import type { Testi } from '../testi';

/* FRANCESE (fr, Francia). Riscrittura di it.ts, la lingua sorgente: stesse
 * chiavi, stessi fatti, stessa voce (cronista, satira sui vizi del settore,
 * trasparenza piana su dati e soldi, slancio da studio per il gioco, terza
 * persona, nessun virgolettato attribuito a Filippo Salemi).
 *
 * File di LOCALIZZAZIONE, UTF-8. Tipografia francese: apostrofo U+2019,
 * guillemets, spazio insecabile U+00A0 prima dei due punti, del punto e
 * virgola, del punto interrogativo, del punto esclamativo, dentro i
 * guillemets e fra cifra e unita'. Si usa U+00A0 e non lo spazio fine
 * U+202F: sta nel sottoinsieme latino di ogni font del sito.
 *
 * LESSICO: broker = courtier, estratto conto = releve, piano = formule,
 * listino dei prezzi = tarifs o grille tarifaire, listino di mercato = cote,
 * archivio = archives (mai "serveur": un server per la verifica
 * dell'abbonamento esiste), la casa = la maison. Le etichette dell'app sono
 * quelle di assets/translations/fr.json; i nomi del gioco (Astralites, Roi
 * Corvax, Ascension, etage, coffre, plateau) sono quelli di
 * rollquest/localization/strings/fr.json.
 *
 * GOOGLE PLAY: come luogo da cui si prende l'app solo in `suPlay` e
 * `azioni.play`; come canale di pagamento solo in `prezzi.nota` e nei
 * capitoli `pagamento` e `famiglia`. Lo presidia integrations/testi.test.mjs.
 */
const fr: Testi = {
  lingua: 'fr',

  comune: {
    salta: 'Aller au texte',
    navEtichetta: 'Rubriques',
    nav: { finance: 'Finance', games: 'Games', casa: 'La maison', notizie: 'Actualités' },
    lingua: 'Langue',
    azioni: {
      demo: 'Ouvrir la démo web',
      play: 'Télécharger sur Google Play',
      prezzi: 'Lire tous les tarifs',
      finance: 'Tout lire sur Portfolio Manager',
      games: 'Tout lire sur ROLLQUEST',
      notizie: 'Suivre le chantier dans les Actualités',
      scrivi: 'Écrire à PluriFin',
    },
    avvisoFinance:
      'Portfolio Manager est un outil d’information : il n’exécute aucun ordre. L’analyse par intelligence artificielle produit des pistes générées par un modèle, pas un conseil financier personnalisé.',
    avvisoFinanceLungo:
      'Portfolio Manager est un outil d’information. Les contenus et les analyses affichés, y compris ceux que génère l’intelligence artificielle, ne constituent pas un conseil financier, fiscal ou juridique au sens du texte unique italien de la finance (TUF, D.Lgs. 58/1998) ou de règles analogues. PluriFin ne gère pas de capitaux et n’exécute aucun ordre. Les décisions d’investissement se prennent avec un professionnel habilité.',
    datiEsempio: 'Données d’exemple.',
    colophon: {
      riga: 'PluriFin est fondée et dirigée par Filippo Salemi, en Italie.',
      stampa: 'Presse',
      informazioni: 'Informations',
      privacy: 'Confidentialité',
      giochi: 'Games',
      lingue: 'Langues',
      pagine: 'Pages',
      legali: 'Documents juridiques',
      voci: {
        prezzi: 'Tarifs',
        domande: 'Questions fréquentes',
        contatti: 'Contact',
        stampa: 'Presse',
        informativa: 'Politique de confidentialité',
        termini: 'Conditions de service',
        avvertenza: 'Avertissement financier',
        dmca: 'DMCA',
        codice: 'Code du site et données de marché',
      },
      diritti: '© 2026 PluriFin',
    },
  },

  /* ================================ LA UNE ================================ */
  home: {
    meta: {
      titolo: 'PluriFin : les comptes le jour, les dés la nuit',
      descrizione:
        'PluriFin est l’entreprise italienne fondée par Filippo Salemi. Portfolio Manager réunit en un seul portefeuille les relevés de onze courtiers ; ROLLQUEST est le jeu de plateau où une tour se gravit un dé à la fois.',
    },
    occhiello: 'Italie, deux divisions sous un même nom',
    titolo: 'PluriFin tient les comptes le jour et lance les dés la nuit',
    sommario:
      'L’entreprise fondée et dirigée par Filippo Salemi exerce deux métiers qui ne s’adressent pas la parole. Le jour, Portfolio Manager réunit en un seul portefeuille les relevés de onze courtiers et le garde sur le téléphone de son propriétaire. La nuit, ROLLQUEST dresse une tour à gravir un dé à la fois. La règle est la même pour les deux : ne pas gagner d’argent aux dépens de ceux qui les utilisent.',
    casa: {
      titolo: 'Une maison, deux métiers, une règle',
      paragrafi: [
        'PluriFin est née en Italie. Filippo Salemi, fondateur et CEO, la dirige et l’a scindée en deux : Finance construit des outils pour ceux qui gèrent seuls leur épargne, Games construit des jeux. Les deux divisions ne se prêtent même pas leurs mots : le vocabulaire du jeu n’entre pas dans les textes de Finance, celui de la finance n’entre pas dans ceux de Games.',
        'Elles ont une règle en commun : on ne gagne pas d’argent contre l’intérêt de ceux qui utilisent les produits. Dans le secteur, cela va moins de soi qu’il n’y paraît. Il existe des applications de finance gratuites parce que la marchandise, c’est le portefeuille de celui qui les installe, et des jeux gratuits sans plafond de dépense, où l’addition se découvre à la fin du mois. PluriFin annonce le prix d’abord, plafonne la dépense dans le jeu et ne revend rien de ceux qui achètent.',
        'Chaque produit sort en six langues au même moment : italien, anglais, espagnol, français, allemand et portugais.',
      ],
    },
    finance: {
      rubrica: 'Finance, Portfolio Manager',
      titolo: 'Onze relevés, un seul portefeuille',
      passi: [
        [
          'Qui investit chez plusieurs courtiers reçoit de chacun un relevé dans un format qui n’appartient qu’à lui : colonnes dans un autre ordre, dates écrites à l’envers, devises sous-entendues. Onze intermédiaires, onze façons de dire la même chose.',
          'Portfolio Manager lit les CSV de onze courtiers, d’Interactive Brokers à DEGIRO, de Fidelity à Revolut, et les réunit en un seul portefeuille. Pour les autres, il y a un lecteur générique. L’application accepte aussi les PDF, dont elle tente d’extraire le tableau.',
        ],
        [
          'Le portefeuille reste sur le téléphone, chiffré en AES-256. PluriFin n’a pas d’archives où le conserver et ne demande pas d’ouvrir un compte : il n’y a rien à voler là où rien n’est déposé.',
          'Le portefeuille n’arrive jamais chez PluriFin. Pour vérifier l’essai et l’abonnement, une empreinte anonyme de l’appareil et le reçu de l’achat suffisent. L’analyse par intelligence artificielle est facultative : qui l’active envoie sa question et la composition du portefeuille à Google Gemini, avec une clé qu’il saisit lui-même.',
        ],
        [
          'La grille tarifaire tient en quatre lignes. Après sept jours d’essai sans carte bancaire, on choisit : un abonnement annuel ou un paiement unique, pour toujours. La formule Famille vaut pour l’acheteur et pour les membres de son groupe familial Google, cinq au plus.',
          'Aucune formule ne contient de publicité : le produit, c’est l’application, pas celui qui l’utilise.',
        ],
      ],
      listinoTitolo: 'Les tarifs de Portfolio Manager',
      listinoNota: 'Prix en euros pour le marché italien, TVA incluse là où elle est due.',
      colonne: { piano: 'Formule', prezzo: 'Prix' },
      palco: {
        testa: 'Portefeuille',
        valuta: 'EUR',
        totale: 'Total',
        sigillo: 'Chiffré, sur le téléphone',
      },
    },
    mercato: {
      titolo: 'À la cote',
      nota: 'Les trois plus fortes hausses et les trois plus fortes baisses du jour, tirées du flux public que l’application télécharge elle aussi. Le flux ne retient que les titres dont les échanges du jour atteignent au moins 20 millions de dollars et écarte les variations supérieures à 25 %. Données de fin de journée, source EODHD, régénérées chaque nuit. C’est une cote, pas un conseil.',
      colonne: { titolo: 'Titre', chiusura: 'Clôture', variazione: 'Variation' },
      rialzi: 'Hausses',
      ribassi: 'Baisses',
      seduta: 'Wall Street, séance du',
    },
    imbrunire: 'Des outils sérieux, et des jeux qui s’allument.',
    games: {
      rubrica: 'Games, en développement',
      titolo: 'ROLLQUEST, la tour se gravit un dé à la fois',
      passi: [
        [
          'ROLLQUEST est un jeu de plateau numérique pour Android. On lance un dé et Rollo, chevalier rond et têtu, avance le long d’un anneau de quatorze cases autour de la tour du Roi Corvax, le corbeau sorcier qui a volé les étoiles.',
          'Les cases ne se valent pas : sur l’une on se bat, une autre cache un coffre au trésor, une autre encore offre un talisman à choisir parmi trois cartes, et quelques-unes, brûlées, ne donnent rien. La boucle bouclée, on monte d’un étage.',
        ],
        [
          'Qui ne dépense rien termine tous les contenus. On achète du confort, des cosmétiques et des Astralites, avec un plafond de 20 euros par mois : qui achète arrive plus tôt, pas là où les autres ne peuvent pas arriver.',
          'Pour tout dire : les Astralites sont la monnaie du jeu et paient aussi des coffres au contenu aléatoire, et c’est pour cela que le jeu porte la mention 16+. Le vice du secteur, c’est le jeu sans plafond, où l’addition se découvre à la fin du mois. Son plafond, PluriFin l’écrit ici, où n’importe qui pourra le lui mettre sous le nez.',
        ],
        [
          'Le monde est un conte sombre illustré : pierre, vitraux, lumière de lanterne, et jamais l’horreur. Rollo, les ennemis, la tour et les dés sont originaux, dessinés pour ce jeu, qui sortira en six langues.',
          'Le studio est petit, l’ambition non. ROLLQUEST est en développement et n’a pas de date : PluriFin l’annoncera quand il y aura de quoi jouer.',
        ],
      ],
      palco: { ascesa: 'Ascension', cima: 'Au sommet' },
    },
  },

  /* ============================ PORTFOLIO MANAGER ============================ */
  finance: {
    meta: {
      titolo: 'Portfolio Manager : onze courtiers, un seul portefeuille',
      descrizione:
        'Portfolio Manager lit les relevés de onze courtiers et les réunit en un portefeuille chiffré sur le téléphone. Sans compte à créer, sans publicité, avec sept jours d’essai.',
    },
    occhiello: 'PluriFin Finance',
    titolo: 'Portfolio Manager rassemble les comptes que les courtiers tiennent séparés',
    sommario:
      'L’application de PluriFin lit les relevés de onze courtiers et les réunit en un seul portefeuille, chiffré sur le téléphone de son propriétaire. Elle ne demande pas de créer un compte et n’affiche pas de publicité. L’entreprise qui la produit ne sait pas combien possèdent ceux qui l’utilisent, et s’est arrangée pour ne pas pouvoir le savoir.',
    capitoli: [
      {
        id: 'import',
        titolo: 'Onze formats, un seul tableau',
        paragrafi: [
          'Chaque courtier exporte les positions à sa façon. Portfolio Manager reconnaît le format des CSV de onze courtiers, montre un aperçu des lignes à corriger et traite les doublons avant d’enregistrer. L’application accepte aussi les PDF, dont elle tente d’extraire le tableau.',
          'L’application ne se connecte jamais à un compte et n’exécute aucun ordre : les données entrent parce que leur propriétaire les apporte, un fichier à la fois. C’est plus lent qu’une connexion automatique, et c’est la raison pour laquelle personne n’a à confier à PluriFin les identifiants de sa banque.',
        ],
      },
      {
        id: 'portafoglio',
        titolo: 'Ce que l’on voit, une fois les comptes réunis',
        paragrafi: [
          'Les comptes réunis, l’application montre le portefeuille entier dans une seule devise, la répartition par type d’actif, les gains et les pertes de chaque position. Les objectifs disent ce qu’il reste à parcourir et combien verser chaque mois ; le rééquilibrage propose comment revenir à l’allocation décidée.',
          'L’analyse par intelligence artificielle est facultative et utilise Google Gemini, avec une clé que l’utilisateur saisit lui-même. Qui l’active envoie à Google sa question et la composition du portefeuille : titres, quantités, prix moyens. Les réponses sont des pistes générées par un modèle, pas un conseil personnalisé, et peuvent contenir des erreurs : les décisions restent celles de l’investisseur.',
        ],
      },
    ],
    broker: {
      titolo: 'Les courtiers que l’application lit toute seule',
      generico:
        'Pour tout autre intermédiaire, il y a un lecteur CSV générique : il trouve seul la ligne des en-têtes, et il lui suffit du symbole du titre et d’une colonne parmi quantité, valeur et prix.',
    },
    dati: {
      titolo: 'Où sont les données, en toutes lettres',
      premessa:
        'Les politiques de confidentialité ont la réputation d’être écrites pour que personne ne les lise. Voici la version courte. Là où elle en dit moins que la longue, c’est la longue qui fait foi : le document juridique, c’est elle.',
      voci: [
        {
          termine: 'Sur le téléphone',
          descrizione:
            'Portefeuilles, positions et objectifs, chiffrés en AES-256. Le système d’exploitation garde la clé, comme il garde les clés API saisies par l’utilisateur. Restent en clair quelques réglages de service, par exemple le consentement au diagnostic.',
        },
        {
          termine: 'Dans aucune archive de PluriFin',
          descrizione: 'L’entreprise ne conserve pas les portefeuilles et ne demande pas d’ouvrir un compte.',
        },
        {
          termine: 'À PluriFin',
          descrizione:
            'Le portefeuille, jamais. Pour vérifier l’essai de sept jours et l’abonnement, une empreinte anonyme de l’appareil et le reçu de l’achat suffisent.',
        },
        {
          termine: 'À des tiers, seulement si l’utilisateur l’active',
          descrizione:
            'Intelligence artificielle activée, la question et la composition du portefeuille (titres, quantités, prix moyens) vont à Google Gemini. Cours en temps réel activés, les symboles des titres vont au fournisseur choisi. Dans les deux cas, la requête part du téléphone et ne passe pas par PluriFin.',
        },
        {
          termine: 'À ceux qui hébergent le site',
          descrizione:
            'La cote publique du marché, l’application la télécharge depuis plurifin.app. GitHub et Cloudflare, qui hébergent le site, voient l’adresse IP de la requête, comme pour toute page web.',
        },
        {
          termine: 'Diagnostic',
          descrizione:
            'Les rapports de plantage (Firebase Crashlytics, sur Android seulement) ne partent que si l’utilisateur active le diagnostic dans les paramètres. Tant qu’il est désactivé, rien n’est transmis : les rapports recueillis entre-temps restent sur le téléphone et partent si et quand on l’active. Ils ne contiennent ni données de portefeuille ni clés, et désinstaller l’application les supprime.',
        },
        {
          termine: 'Publicité et pistage',
          descrizione: 'Aucune publicité. L’application ne contient aucun SDK de mesure d’audience.',
        },
        {
          termine: 'Sortie',
          descrizione:
            '« Exporter mes données » produit un fichier JSON avec tout le contenu ; « Effacer toutes les données » le supprime du téléphone.',
        },
      ],
      chiusa: 'Le texte complet figure dans la politique de confidentialité, en six langues.',
    },
    prezzi: {
      titolo: 'Ce que ça coûte',
      testo:
        'Sept jours d’essai sans carte bancaire. Puis quatre formules, les mêmes pour tous : de 4,99 € par an à 49,99 € en une seule fois pour la famille. Aucune publicité, dans aucune formule.',
    },
    provare: {
      titolo: 'L’essayer avant de s’y fier',
      demo: 'La démo web s’ouvre dans le navigateur, sans rien installer. Ses limites sont déclarées : cinq positions saisies à la main, pas d’import, pas d’objectifs, pas d’intelligence artificielle. Ses données restent dans le navigateur, sans chiffrement : elle sert à voir comment l’application est faite, pas à garder un vrai portefeuille.',
      suPlay: 'L’application complète est sur Google Play.',
    },
    palco: {
      titolo: 'Les écrans de l’application',
      schermate: [
        {
          termine: 'Portefeuille',
          descrizione:
            'Écran de l’application : la valeur totale du portefeuille, le gain global et la carte des positions, un rectangle par titre.',
        },
        {
          termine: 'Marché',
          descrizione:
            'Écran de l’application : l’aperçu du marché et les cours à jour des positions en portefeuille.',
        },
        {
          termine: 'Rééquilibrage',
          descrizione:
            'Écran de l’application : l’allocation cible, la valeur du portefeuille et le résultat du rééquilibrage.',
        },
        {
          termine: 'Analyse',
          descrizione:
            'Écran de l’application : les analyses rapides, les indicateurs du portefeuille et l’avertissement que les contenus ne sont pas un conseil financier.',
        },
      ],
    },
  },

  /* ================================ ROLLQUEST ================================ */
  games: {
    meta: {
      titolo: 'ROLLQUEST : la tour se gravit un dé à la fois',
      descrizione:
        'ROLLQUEST est le jeu de plateau numérique de PluriFin Games : un dé, un anneau de quatorze cases, une tour à gravir. En développement pour Android, en six langues.',
    },
    occhiello: 'PluriFin Games, en développement',
    titolo: 'ROLLQUEST hisse le jeu de plateau au sommet d’une tour',
    sommario:
      'Un dé, un anneau de quatorze cases et une tour à gravir étage après étage. Le jeu de PluriFin est en développement pour Android, en six langues. Sur l’argent, il a une règle écrite, avec un plafond de dépense : elle figure en entier dans le chapitre qui porte son nom.',
    capitoli: [
      {
        id: 'gioco',
        titolo: 'Comment on joue',
        paragrafi: [
          'On lance le dé et Rollo avance sur l’anneau. La case décide de la suite : un combat, un coffre au trésor, un talisman à choisir parmi trois cartes, ou rien, si la case est brûlée. Le butin sert à équiper le héros et, la boucle bouclée, on monte d’un étage. Dix étages font une Ascension, et au dernier attend un boss.',
          'C’est un jeu de plateau qui a pris deux habitudes au jeu vidéo : au roguelite, la partie qui recommence et ne revient jamais à l’identique ; au soulslike, la défaite qui apprend quelque chose. Une partie dure de deux à cinq minutes ; la progression du héros se poursuit d’une partie à l’autre.',
        ],
      },
      {
        id: 'storia',
        titolo: 'L’histoire, en quelques lignes',
        paragrafi: [
          'Le Roi Corvax, corbeau et sorcier, a pillé le royaume des Étoiles et les a enfermées dans sa Tour, suspendue dans le ciel. Rollo, chevalier rond et têtu, la gravit étage après étage pour les reprendre.',
          'L’accompagnent Lumen, luciole enchantée ; Baffo, blaireau et boutiquier ; Bruna, ourse et forgeronne. Le ton est celui d’un conte sombre illustré : architecture, vitraux et lumière de lanterne. Jamais l’horreur, jamais le sang.',
        ],
      },
      {
        id: 'soldi',
        titolo: 'La règle de l’argent',
        paragrafi: [
          'Qui ne dépense rien termine tous les contenus du jeu. C’est la contrainte avec laquelle PluriFin équilibre l’économie : chaque modification se vérifie d’abord sur ce joueur-là, au simulateur, avant d’arriver chez les joueurs.',
          'On achète du confort, des cosmétiques et des Astralites, avec un plafond de 20 euros par mois : qui achète arrive plus tôt, pas là où les autres ne peuvent pas arriver. Pour tout dire : les Astralites sont la monnaie du jeu et paient tout, y compris des coffres au contenu aléatoire. C’est pour cela que le jeu porte la mention 16+, alors que son contenu reste un conte sans horreur et sans sang.',
          'Aujourd’hui, ROLLQUEST est en développement et ne vend encore rien. Le vice du secteur, c’est le jeu sans plafond, où l’addition se découvre à la fin du mois. Ici, le plafond existe et il est écrit sur cette page, où n’importe qui pourra le mettre sous le nez de PluriFin.',
        ],
      },
      {
        id: 'mestiere',
        titolo: 'De quoi il est fait',
        paragrafi: [
          'Rollo, les ennemis, les boss, le dé, le plateau et l’interface sont originaux, dessinés pour ce jeu. L’équipement peut inclure des pièces d’auteurs tiers, toujours avec licence et crédits déclarés.',
          'Le moteur est Unity. Les chiffres de l’économie passent par un simulateur avant d’arriver à l’écran, parce que dans un jeu de plateau les règles se voient, et qu’une règle qui se voit doit tenir.',
        ],
      },
    ],
    stato: {
      titolo: 'Où en est le jeu',
      paragrafi: [
        'ROLLQUEST est en développement. Il n’a pas de date de sortie, et PluriFin n’en invente pas une pour remplir une ligne : elle l’annoncera dans les Actualités quand il y aura de quoi jouer.',
        'Ce site n’a pas de liste d’attente où s’inscrire. Le jeu est déclaré pour des joueurs de seize ans et plus et sortira en six langues : italien, anglais, espagnol, français, allemand et portugais.',
        'Le studio est petit et voit grand : un monde entier, une tour qui ne s’arrête pas au premier boss, et la prétention de figurer dans le même rayon que les jeux faits par cent personnes.',
      ],
    },
    /* Corsia B2: la didascalia delle immagini della pagina. */
    immagini:
      'La tour de cette page est faite avec les décors du jeu, réduits pour le web. Les fenêtres éteintes ne viennent pas du jeu : c’est un rendu fait pour le site, afin qu’elles s’allument à mesure que l’on monte.',
  },

  /* ================================ LA MAISON ================================ */
  casa: {
    meta: {
      titolo: 'La maison : qui dirige PluriFin et comment elle travaille',
      descrizione:
        'PluriFin est une entreprise italienne fondée et dirigée par Filippo Salemi. Elle a deux divisions, Finance et Games, et une règle : ne pas gagner d’argent aux dépens de ceux qui utilisent ses produits.',
    },
    occhiello: 'La maison',
    titolo: 'PluriFin, deux divisions et une seule façon de gagner de l’argent',
    sommario:
      'Une entreprise italienne, fondée et dirigée par Filippo Salemi, qui construit une application de finances personnelles et un jeu de plateau. Quand elle demande de l’argent, elle dit d’abord combien : une grille de quatre lignes pour l’application, un plafond de 20 euros par mois pour le jeu.',
    capitoli: [
      {
        id: 'fondatore',
        titolo: 'Qui la dirige',
        paragrafi: [
          'Filippo Salemi est le fondateur et CEO de PluriFin. Il a bâti l’entreprise sur deux divisions et sur une règle qui passe avant l’une et l’autre : ne pas gagner d’argent contre l’intérêt de ceux qui utilisent les produits.',
          'Dans les documents juridiques, le titulaire des produits et responsable du traitement des données est désigné par son nom, et c’est la même personne. Qui a une question sait à qui la poser.',
        ],
      },
      {
        id: 'divisioni',
        titolo: 'Les deux divisions',
        paragrafi: [
          'PluriFin Finance fait Portfolio Manager, l’application qui réunit en un seul portefeuille les relevés de onze courtiers et le garde chiffré sur le téléphone.',
          'PluriFin Games fait ROLLQUEST, un jeu de plateau numérique pour Android où une tour se gravit un dé à la fois. Il est en développement.',
          'Les deux divisions ne se ressemblent pas et n’ont pas à se ressembler. Elles ont la méthode en commun : on travaille jusqu’à ce que la chose fonctionne, puis on publie.',
        ],
      },
      {
        id: 'metodo',
        titolo: 'Comment elle travaille',
        paragrafi: [
          'Chaque produit sort en six langues au même moment. Les prix de Portfolio Manager tiennent dans une seule grille, et un contrôle automatique compare à cette grille chaque page qui les répète, celle-ci comprise.',
          'Le code de ce site et le flux des données de marché sont publics : qui veut vérifier comment ils sont faits n’a pas à demander la permission.',
        ],
      },
    ],
    /* Corsia B3: la forma giuridica detta in chiaro. Fonti:
       assets/legal/fr/privacy_policy.md sez. 1, terms_of_service.md sez. 1. */
    titolare: {
      titolo: 'Qui répond devant la loi',
      testo:
        'PluriFin est la marque sous laquelle Filippo Salemi publie ses produits. Dans les documents juridiques, de la politique de confidentialité aux conditions de service, le titulaire, c’est lui : une personne physique, en Italie, pas une société.',
    },
    nonFa: {
      titolo: 'Ce que PluriFin ne fait pas',
      voci: [
        'Elle ne vend pas les données de ceux qui utilisent ses produits, et ne les collecte pas pour pouvoir le faire.',
        'Elle n’affiche de publicité ni dans Portfolio Manager ni sur ce site.',
        'Ce site n’offre rien à quoi s’inscrire : ni liste d’attente, ni lettre d’information.',
        'Elle n’annonce pas de dates qu’elle ne peut pas tenir.',
      ],
    },
    contatti: {
      titolo: 'Écrire à PluriFin',
      testo: 'C’est une personne qui répond.',
    },
  },

  /* ================================= PRESSE ================================= */
  stampa: {
    meta: {
      titolo: 'Presse : faits, textes prêts à citer et contact',
      descrizione:
        'Des faits vérifiables sur PluriFin, Portfolio Manager et ROLLQUEST, des textes prêts à citer et le contact presse.',
    },
    occhiello: 'Presse',
    titolo: 'Pour qui écrit sur PluriFin',
    sommario:
      'Des faits que l’on peut vérifier, deux textes prêts à citer et une adresse où répond une personne. Pas d’adjectifs : ceux-là, c’est à celui qui écrit de les mettre.',
    inBreve: {
      titolo: 'L’entreprise en bref',
      voci: [
        { termine: 'Nom', descrizione: 'PluriFin' },
        { termine: 'Fondateur et CEO', descrizione: 'Filippo Salemi' },
        { termine: 'Pays', descrizione: 'Italie' },
        {
          termine: 'Divisions',
          descrizione: 'PluriFin Finance (Portfolio Manager) et PluriFin Games (ROLLQUEST)',
        },
        {
          termine: 'Langues',
          descrizione: 'Six : italien, anglais, espagnol, français, allemand et portugais',
        },
      ],
    },
    /* Corsia B3: chi scrive deve poterla riportare giusta. */
    formaGiuridica: {
      termine: 'Forme juridique',
      descrizione:
        'Personne physique. Dans les documents juridiques, le titulaire est Filippo Salemi ; PluriFin est la marque.',
    },
    finance: {
      titolo: 'Portfolio Manager, les faits',
      voci: [
        {
          termine: 'Ce que c’est',
          descrizione:
            'Une application qui réunit en un seul portefeuille les relevés de plusieurs courtiers et le garde sur l’appareil.',
        },
        { termine: 'Plateformes', descrizione: 'Android. Une démo gratuite tourne dans le navigateur.' },
        { termine: 'Courtiers lus', descrizione: 'Onze, plus un lecteur CSV générique.' },
        {
          termine: 'Fichiers',
          descrizione:
            'CSV de onze courtiers, plus un lecteur générique ; PDF aussi, dont l’application tente d’extraire le tableau. Importés à la main, sans connexion aux comptes.',
        },
        { termine: 'Données', descrizione: 'Sur l’appareil, chiffrées en AES-256. Aucun compte à créer.' },
        {
          termine: 'Intelligence artificielle',
          descrizione: 'Facultative : Google Gemini, avec la clé de l’utilisateur.',
        },
        {
          termine: 'Tarifs',
          descrizione:
            'Sept jours d’essai sans carte. Quatre formules, de 4,99 € par an à 49,99 € en une fois.',
        },
        { termine: 'Publicité', descrizione: 'Aucune.' },
        {
          termine: 'Avertissement',
          descrizione:
            'C’est un outil d’information : il n’exécute aucun ordre, et ses contenus, analyses de l’intelligence artificielle comprises, ne constituent pas un conseil financier. À conserver dans tout article.',
        },
      ],
    },
    games: {
      titolo: 'ROLLQUEST, les faits',
      voci: [
        {
          termine: 'Ce que c’est',
          descrizione:
            'Un jeu de plateau numérique : un dé, un anneau de quatorze cases, une tour à gravir.',
        },
        { termine: 'Plateforme', descrizione: 'Android.' },
        { termine: 'Moteur', descrizione: 'Unity.' },
        { termine: 'Langues', descrizione: 'Six.' },
        { termine: 'Public', descrizione: 'Joueurs de seize ans et plus.' },
        { termine: 'État', descrizione: 'En développement. Aucune date annoncée.' },
        {
          termine: 'Règle',
          descrizione:
            'Qui ne dépense rien termine tous les contenus et qui dépense a un plafond de 20 euros par mois : la règle entière, coffres au contenu aléatoire compris, figure dans le chapitre sur l’argent de la page Games.',
        },
      ],
    },
    pronti: {
      titolo: 'Textes prêts à citer',
      premessa: 'On peut les copier tels quels.',
      riga: 'PluriFin est une entreprise italienne, fondée par Filippo Salemi, qui construit des outils sérieux et des jeux qui s’allument : Portfolio Manager pour les finances personnelles et ROLLQUEST pour le jeu.',
      paragrafo:
        'PluriFin est une entreprise italienne fondée et dirigée par Filippo Salemi, avec deux divisions. Finance développe Portfolio Manager, une application qui réunit en un seul portefeuille les relevés de onze courtiers et le garde chiffré sur l’appareil, sans compte à créer et sans publicité. Games développe ROLLQUEST, un jeu de plateau numérique pour Android qui se déroule dans une tour, aujourd’hui en développement. Les deux divisions partagent une règle, ne pas gagner d’argent contre l’intérêt de ceux qui utilisent les produits, et publient chaque produit en six langues.',
    },
    materiali: {
      titolo: 'Matériel',
      voci: [
        { termine: 'Logo', descrizione: 'Le glyphe de PluriFin, au format SVG.' },
        { termine: 'Image pour les réseaux sociaux', descrizione: '1200 par 630 pixels, au format PNG.' },
        {
          termine: 'Captures d’écran et autre matériel',
          descrizione: 'Sur demande, en écrivant à l’adresse presse.',
        },
      ],
      uso: 'On peut utiliser le logo et les captures d’écran dans les articles et les critiques qui parlent de PluriFin. Le glyphe ne se redessine pas et ne se recolore pas.',
    },
    contatto: {
      titolo: 'Contact presse',
      testo: 'C’est une personne qui répond.',
    },
  },

  /* ================================= TARIFS ================================= */
  prezzi: {
    meta: {
      titolo: 'Tarifs de Portfolio Manager',
      descrizione:
        'Quatre formules, les mêmes pour tous, à partir de 4,99 € par an. Sept jours d’essai sans carte bancaire, aucune publicité.',
    },
    occhiello: 'Finance, les tarifs',
    titolo: 'Ce que coûte Portfolio Manager, en entier',
    sommario:
      'Portfolio Manager a quatre formules, les mêmes pour tous, et sept jours d’essai sans carte bancaire. Aucune formule ne contient de publicité. Le reste de cette page, ce sont des détails, et dans une grille tarifaire les détails sont l’essentiel.',
    colonne: { piano: 'Formule', prezzo: 'Prix', perChi: 'Pour qui', rinnovo: 'Renouvellement' },
    piani: [
      {
        id: 'single_annual',
        nome: 'Individuel, annuel',
        prezzo: '4,99 € par an',
        perChi: 'Un compte Google',
        rinnovo: 'Automatique tous les douze mois, désactivable à tout moment',
      },
      {
        id: 'single_lifetime',
        nome: 'Individuel, à vie',
        prezzo: '29,99 € en une fois',
        perChi: 'Un compte Google',
        rinnovo: 'Aucun : on paie une fois',
      },
      {
        id: 'family_annual',
        nome: 'Famille, annuel',
        prezzo: '9,99 € par an',
        perChi: 'L’acheteur et jusqu’à cinq membres de son groupe familial Google',
        rinnovo: 'Automatique tous les douze mois, désactivable à tout moment',
      },
      {
        id: 'family_lifetime',
        nome: 'Famille, à vie',
        prezzo: '49,99 € en une fois',
        perChi: 'L’acheteur et jusqu’à cinq membres de son groupe familial Google',
        rinnovo: 'Aucun : on paie une fois',
      },
    ],
    nota: 'Prix en euros pour le marché italien, TVA incluse là où elle est due. Dans les autres pays, Google Play applique sa propre conversion.',
    capitoli: [
      {
        id: 'prova',
        titolo: 'L’essai de sept jours',
        paragrafi: [
          'Dès le premier lancement, l’application fonctionne sept jours avec toutes ses fonctions, sans demander de carte bancaire. Aucun prélèvement ne part tout seul. L’essai est lié à l’installation de l’application, pas à un compte : pour le commencer, nul besoin de s’inscrire.',
          'L’essai terminé, il reste la version gratuite. Les positions se saisissent à la main, le rééquilibrage et les données de marché continuent de fonctionner ; l’import depuis les courtiers, les objectifs et l’intelligence artificielle s’arrêtent tant qu’on n’a pas choisi de formule.',
        ],
      },
      {
        id: 'tutti',
        titolo: 'Ce que contient chaque formule',
        paragrafi: [
          'Les quatre formules débloquent les mêmes fonctions : import depuis les courtiers, objectifs et analyse par intelligence artificielle. Le rééquilibrage et les données de marché existent aussi dans la version gratuite. D’une formule à l’autre, seuls changent la façon de payer et le nombre de personnes.',
        ],
      },
      {
        id: 'famiglia',
        titolo: 'Comment fonctionne la formule Famille',
        paragrafi: [
          'L’acheteur partage la formule avec les membres de son groupe familial Google, cinq au plus, qui y accèdent depuis leur propre compte sans payer de nouveau. Le groupe, c’est Google qui le gère, pas PluriFin : invitations et retraits se font avec les outils de Google.',
        ],
      },
      {
        id: 'pagamento',
        titolo: 'Paiement, résiliation et remboursements',
        paragrafi: [
          'Le paiement passe entièrement par Google Play : PluriFin ne reçoit pas les données de la carte. Le renouvellement annuel se désactive depuis la page Abonnements de Google Play, sans pénalité, et l’accès reste ouvert jusqu’à la fin de l’année déjà payée.',
          'Pour les formules annuelles, le remboursement se demande à Google Play : dans les quarante-huit heures qui suivent l’achat, depuis l’historique des commandes ; passé ce délai, c’est Google qui décide. Pour les formules à vie, PluriFin honore le droit de rétractation pendant quatorze jours à compter de l’achat, sur demande écrite à l’adresse indiquée dans les Conditions de service. Elle transmet le dossier à Google et, si Google refuse, accorde un crédit de même valeur ou un remboursement bancaire. Les conditions complètes figurent dans les Conditions de service.',
        ],
      },
      {
        id: 'perche',
        titolo: 'Pourquoi elle coûte si peu',
        paragrafi: [
          'Parce qu’elle n’a qu’à couvrir ses propres frais. Il n’y a ni annonceurs à contenter ni données à faire fructifier : il y a une application, et il y a son prix.',
        ],
      },
      {
        id: 'chiude',
        titolo: 'Si PluriFin fermait demain',
        paragrafi: [
          'Les données resteraient là où elles ont toujours été : sur le téléphone de leur propriétaire, exportables dans un fichier JSON que d’autres programmes savent lire.',
        ],
      },
    ],
    suPlay: 'Les formules s’achètent depuis l’application, sur Google Play.',
    /* Mostrata al posto di `suPlay` finche' `pmSuPlay` e' falso: non nomina
       il negozio, dice quando si potra' comprare e come si prova oggi. */
    primaDellaScheda:
      'Les achats ouvriront à la publication de l’application. D’ici là, le moyen de l’essayer est la démo web, qui est gratuite.',
  },

  /* ================================ QUESTIONS ================================ */
  domande: {
    meta: {
      titolo: 'Questions fréquentes sur Portfolio Manager',
      descrizione:
        'Coûts, courtiers pris en charge, emplacement des données, ce que fait et ce que ne fait pas l’application de PluriFin Finance.',
    },
    occhiello: 'Finance, les questions',
    titolo: 'Les questions à poser à une application de finance',
    sommario: 'Des réponses courtes. Là où il faut le détail, il y a la page qui le contient.',
    voci: [
      {
        domanda: 'Combien ça coûte ?',
        risposta:
          'Sept jours d’essai sans carte bancaire, puis l’une des quatre formules de la page Tarifs, ou la version gratuite avec moins de fonctions. La démo web est gratuite. Les clés pour l’intelligence artificielle ou pour les cours en temps réel sont facultatives et se paient, si on les veut, au fournisseur que l’on choisit.',
      },
      {
        domanda: 'Quels courtiers lit-elle ?',
        risposta:
          'Les CSV de onze courtiers : Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (aujourd’hui intégré à Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB et Revolut. Pour les autres, il y a un lecteur CSV générique. Elle accepte aussi les PDF, dont elle tente d’extraire le tableau.',
      },
      {
        domanda: 'Les données partent-elles dans le cloud ?',
        risposta:
          'Non. Portefeuilles, positions et objectifs restent sur l’appareil, chiffrés. Des données ne sortent que par les fonctions facultatives que l’utilisateur active : l’intelligence artificielle, les cours en temps réel et le diagnostic des plantages, chacune vers son propre fournisseur et jamais vers PluriFin.',
      },
      {
        domanda: 'L’application achète-t-elle et vend-elle des titres ?',
        risposta:
          'Non. Elle n’exécute aucun ordre, n’est pas un courtier et ne se connecte à aucun compte.',
      },
      {
        domanda: 'Que fait l’intelligence artificielle ?',
        risposta:
          'Elle répond à des questions sur le portefeuille et en rédige des analyses, y compris des pistes sur ce qu’il faudrait changer. Ce sont des textes générés par un modèle, Google Gemini : ils ne sont pas un conseil financier personnalisé et peuvent contenir des erreurs ou des données périmées. Les décisions restent celles de l’investisseur.',
      },
      {
        domanda: 'Faut-il un compte ?',
        risposta:
          'Non. Il n’y a pas d’inscription. L’essai de sept jours est lié à l’installation de l’application ; l’achat est lié au compte Google avec lequel on paie, pas à un compte PluriFin.',
      },
      {
        domanda: 'Fonctionne-t-elle hors connexion ?',
        risposta:
          'Oui, pour ce qui est déjà sur le téléphone : l’application s’ouvre et montre portefeuilles et positions même sans réseau, avec les derniers cours téléchargés. Le réseau sert à mettre les cours à jour et à l’intelligence artificielle.',
      },
      {
        domanda: 'Peut-on l’utiliser dans le navigateur ?',
        risposta:
          'Oui, dans la démo web, avec les limites déclarées sur la page de Portfolio Manager.',
      },
      {
        domanda: 'En combien de langues ?',
        risposta: 'Six : italien, anglais, espagnol, français, allemand et portugais.',
      },
      {
        domanda: 'Comment arrivent les mises à jour ?',
        risposta:
          'L’application se met à jour depuis la boutique d’applications où elle a été installée. La démo web se met à jour en rechargeant la page.',
      },
    ],
  },

  /* ================================= CONTACT ================================= */
  contatti: {
    meta: {
      titolo: 'Contact',
      descrizione: 'Les adresses de PluriFin pour les informations, la presse, la confidentialité et Games.',
    },
    occhiello: 'Contact',
    titolo: 'Écrire à PluriFin',
    sommario:
      'Quatre adresses et une personne qui répond.',
    voci: [
      { termine: 'Informations', descrizione: 'Questions sur les produits et assistance.' },
      { termine: 'Presse', descrizione: 'Journalistes, critiques, demandes de matériel.' },
      {
        termine: 'Confidentialité',
        descrizione:
          'Questions sur le traitement des données. Pour les demandes formelles d’accès, de rectification et d’effacement, c’est l’adresse indiquée dans la politique de confidentialité qui vaut.',
      },
      { termine: 'Games', descrizione: 'Tout ce qui concerne ROLLQUEST.' },
    ],
  },

  /* ================================ ACTUALITES ================================ */
  notizie: {
    meta: {
      titolo: 'Actualités de PluriFin',
      descrizione: 'Ce qui change chez PluriFin, dans Portfolio Manager et dans ROLLQUEST.',
    },
    occhiello: 'Actualités',
    titolo: 'Actualités',
    sommario: 'Ce qui change, écrit par ceux qui l’ont changé.',
    pubblicato: 'Publié le',
    leggi: 'Lire l’article',
    vuoto: 'Il n’y a pas encore d’actualités dans cette langue.',
    ritorno: 'Toutes les actualités',
  },

  legali: {
    ritorno: 'Retour à la une',
    indice: 'Sommaire',
    aggiornato: 'Dernière mise à jour',
  },
};

export default fr;
