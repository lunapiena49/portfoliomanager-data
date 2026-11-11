import type { Testi } from '../testi';

/* PORTOGHESE EUROPEO (pt-PT), riscritto dall'italiano di it.ts (commit 45f902a).
 *
 * File di LOCALIZZAZIONE: UTF-8 con accenti e virgolette vere (le caporali,
 * che sono la forma tipografica del portoghese europeo).
 *
 * LA VARIANTE: europea, come il sito di prima (`telemóvel`, `ficheiro`,
 * `ecrã`, `contacto`, `subscrição`, `factos`). Mai `você`, mai `tu`: la voce e'
 * impersonale e in terza persona, come in italiano. La voce e i vincoli su
 * Google Play sono quelli scritti in testa a it.ts e valgono qui senza sconti.
 *
 * I TERMINI CHE SONO FATTI non si scelgono: si copiano da dove il prodotto li
 * mostra. Dall'app (assets/translations/pt.json): `Carteira`, `Mercado`,
 * `Rebalanceamento`, `Análise`, «Exportar os meus dados», «Limpar todos os
 * dados». Dal gioco (rollquest/localization/strings/pt.json): `as Astralitas`
 * (femminile), `Rei Corvax`, `Ascensão`, `chefe`, `andar`, `casa`, `baú`,
 * `espólio`. Dai documenti legali portoghesi dell'app: `livre resolução`,
 * `subscrição`, `pessoa singular`. Da Google: `grupo familiar`.
 *
 * I broker sono `corretoras`, il listino dei prezzi e' `o preçário`.
 */
const pt: Testi = {
  lingua: 'pt',

  comune: {
    salta: 'Ir para o texto',
    navEtichetta: 'Secções',
    nav: { finance: 'Finance', games: 'Games', casa: 'A casa', notizie: 'Notícias' },
    lingua: 'Língua',
    azioni: {
      demo: 'Abrir a demo web',
      play: 'Descarregar no Google Play',
      prezzi: 'Ler o preçário completo',
      finance: 'Ler tudo sobre o Portfolio Manager',
      games: 'Ler tudo sobre o ROLLQUEST',
      notizie: 'Acompanhar a obra nas Notícias',
      scrivi: 'Escrever à PluriFin',
    },
    avvisoFinance:
      'O Portfolio Manager é uma ferramenta informativa: não executa ordens. A análise com inteligência artificial produz pistas geradas por um modelo, não aconselhamento financeiro personalizado.',
    avvisoFinanceLungo:
      'O Portfolio Manager é uma ferramenta informativa. Os conteúdos e as análises apresentados, incluindo os gerados por inteligência artificial, não constituem aconselhamento financeiro, fiscal ou jurídico nos termos do Texto Único das Finanças italiano (D.Lgs. 58/1998) ou de normas equivalentes. A PluriFin não gere capitais e não executa ordens. As decisões de investimento tomam-se com um profissional habilitado.',
    datiEsempio: 'Dados de exemplo.',
    colophon: {
      riga: 'A PluriFin foi fundada e é dirigida por Filippo Salemi, em Itália.',
      stampa: 'Imprensa',
      informazioni: 'Informações',
      privacy: 'Privacidade',
      giochi: 'Games',
      lingue: 'Línguas',
      pagine: 'Páginas',
      legali: 'Documentos legais',
      voci: {
        prezzi: 'Preços',
        domande: 'Perguntas frequentes',
        contatti: 'Contactos',
        stampa: 'Imprensa',
        informativa: 'Política de privacidade',
        termini: 'Termos de serviço',
        avvertenza: 'Aviso financeiro',
        dmca: 'DMCA',
        codice: 'Código do site e dados de mercado',
      },
      diritti: '© 2026 PluriFin',
    },
  },

  /* ============================ A PRIMEIRA PÁGINA ============================ */
  home: {
    meta: {
      titolo: 'PluriFin: contas de dia, dados de noite',
      descrizione:
        'A PluriFin é a empresa italiana fundada por Filippo Salemi. O Portfolio Manager reúne numa só carteira os extratos de onze corretoras; o ROLLQUEST é o jogo de tabuleiro em que se sobe uma torre um dado de cada vez.',
    },
    occhiello: 'Itália, duas divisões sob o mesmo nome',
    titolo: 'A PluriFin faz contas de dia e lança dados de noite',
    sommario:
      'A empresa fundada e dirigida por Filippo Salemi tem dois ofícios que não se falam. De dia, o Portfolio Manager reúne numa só carteira os extratos de onze corretoras e guarda-a no telemóvel de quem a possui. De noite, o ROLLQUEST ergue uma torre que se sobe um dado de cada vez. A regra é a mesma para os dois: não ganhar dinheiro contra quem os usa.',
    casa: {
      titolo: 'Uma casa, dois ofícios, uma regra',
      paragrafi: [
        'A PluriFin nasceu em Itália. Dirige-a Filippo Salemi, fundador e CEO, que a dividiu em duas: a Finance faz ferramentas para quem gere sozinho as suas poupanças, a Games faz jogos. As duas divisões nem as palavras emprestam uma à outra: nos textos da Finance não entra o vocabulário do jogo, nos da Games não entra o das finanças.',
        'Têm em comum uma regra: não se ganha dinheiro contra o interesse de quem os usa. No setor é menos óbvio do que parece. Há apps de finanças gratuitas porque a mercadoria é a carteira de quem as instala, e há jogos gratuitos sem teto de despesa, em que a conta se descobre no fim do mês. A PluriFin diz o preço antes, põe um teto à despesa no jogo e não revende nada de quem compra.',
        'Cada produto sai em seis línguas ao mesmo tempo: italiano, inglês, espanhol, francês, alemão e português.',
      ],
    },
    finance: {
      rubrica: 'Finance, Portfolio Manager',
      titolo: 'Onze extratos, uma só carteira',
      passi: [
        [
          'Quem investe através de várias corretoras recebe de cada uma um extrato com formato próprio: colunas por outra ordem, datas escritas ao contrário, moedas dadas por adquiridas. Onze intermediários, onze maneiras de dizer a mesma coisa.',
          'O Portfolio Manager lê os CSV de onze corretoras, da Interactive Brokers à DEGIRO, da Fidelity à Revolut, e reúne-os numa única carteira. Para as outras há um leitor genérico. Aceita também PDF, dos quais tenta extrair a tabela.',
        ],
        [
          'A carteira fica no telemóvel, cifrada com AES-256. A PluriFin não tem um arquivo onde a guardar e não pede que se crie uma conta: não há nada para roubar onde não há nada em depósito.',
          'À PluriFin a carteira nunca chega. Para verificar o teste e a subscrição bastam um identificador anónimo do dispositivo e o recibo da compra. A análise com inteligência artificial é facultativa: quem a ativa envia a pergunta e a composição da carteira ao Google Gemini, com uma chave que introduz pessoalmente.',
        ],
        [
          'O preçário tem quatro linhas. Depois de sete dias de teste sem cartão de crédito, escolhe-se: uma subscrição anual ou um só pagamento, para sempre. O plano Família vale para quem compra e para os membros do seu grupo familiar da Google, até cinco.',
          'Nenhum plano tem publicidade: o produto é a app, não quem a usa.',
        ],
      ],
      listinoTitolo: 'O preçário do Portfolio Manager',
      listinoNota: 'Preços em euros para o mercado italiano, com IVA incluído quando devido.',
      colonne: { piano: 'Plano', prezzo: 'Preço' },
      palco: {
        testa: 'Carteira',
        valuta: 'EUR',
        totale: 'Total',
        sigillo: 'Cifrada, no telemóvel',
      },
    },
    mercato: {
      titolo: 'Da bolsa',
      nota: 'As três maiores subidas e as três maiores descidas do dia, tiradas do fluxo público de dados que a app também descarrega. O fluxo fica com os títulos com pelo menos 20 milhões de dólares transacionados no dia e descarta as variações acima de 25%. Dados de fecho, fonte EODHD, regenerados todas as noites. É uma tabela de cotações, não um conselho.',
      colonne: { titolo: 'Título', chiusura: 'Fecho', variazione: 'Variação' },
      rialzi: 'Subidas',
      ribassi: 'Descidas',
      seduta: 'Wall Street, sessão de',
    },
    imbrunire: 'Ferramentas sérias, e jogos que se acendem.',
    games: {
      rubrica: 'Games, em desenvolvimento',
      titolo: 'ROLLQUEST, a torre sobe-se um dado de cada vez',
      passi: [
        [
          'O ROLLQUEST é um jogo de tabuleiro digital para Android. Lança-se um dado e Rollo, cavaleiro redondo e teimoso, avança por um anel de catorze casas à volta da torre do Rei Corvax, o corvo feiticeiro que roubou as estrelas.',
          'As casas não são todas iguais: numa combate-se, outra esconde um baú, outra oferece um talismã a escolher entre três cartas, e algumas estão queimadas e não dão nada. Fechada a volta, sobe-se um andar.',
        ],
        [
          'Quem não gasta completa todos os conteúdos. Compram-se comodidade, estética e Astralitas, com um teto de 20 euros por mês: quem compra chega mais cedo, não aonde os outros não podem chegar.',
          'Dito por inteiro: as Astralitas são a moeda do jogo e pagam também baús de conteúdo aleatório, e é por isso que a classificação etária é 16+. O vício do setor é o jogo sem teto, em que a conta se descobre no fim do mês. A PluriFin escreve o seu teto aqui, onde qualquer pessoa lho poderá atirar à cara.',
        ],
        [
          'O mundo é um conto de fadas sombrio, ilustrado: pedra, vitrais, luz de lanterna, e nunca o horror. Rollo, os inimigos, a torre e os dados são originais, desenhados para este jogo, que sairá em seis línguas.',
          'O estúdio é pequeno, a ambição não. O ROLLQUEST está em desenvolvimento e não tem data: a PluriFin vai anunciá-la quando houver alguma coisa para jogar.',
        ],
      ],
      palco: { ascesa: 'Ascensão', cima: 'No topo' },
    },
  },

  /* ============================ PORTFOLIO MANAGER ============================ */
  finance: {
    meta: {
      titolo: 'Portfolio Manager: onze corretoras, uma só carteira',
      descrizione:
        'O Portfolio Manager lê os extratos de onze corretoras e reúne-os numa carteira cifrada no telemóvel. Sem conta, sem publicidade, com sete dias de teste.',
    },
    occhiello: 'PluriFin Finance',
    titolo: 'O Portfolio Manager junta as contas que as corretoras mantêm separadas',
    sommario:
      'A app da PluriFin lê os extratos de onze corretoras e reúne-os numa só carteira, cifrada no telemóvel de quem a possui. Não pede uma conta e não mostra publicidade. A empresa que a faz não sabe quanto tem quem a usa, e tratou de não o poder saber.',
    capitoli: [
      {
        id: 'import',
        titolo: 'Onze formatos, uma só tabela',
        paragrafi: [
          'Cada corretora exporta as posições à sua maneira. O Portfolio Manager reconhece o formato dos CSV de onze corretoras, mostra uma pré-visualização das linhas a corrigir e trata dos duplicados antes de guardar. Aceita também PDF, dos quais tenta extrair a tabela.',
          'A app nunca se liga à conta e não executa ordens: os dados entram porque os traz quem os possui, um ficheiro de cada vez. É mais lento do que uma ligação automática, e é a razão pela qual ninguém tem de entregar à PluriFin as credenciais do seu banco.',
        ],
      },
      {
        id: 'portafoglio',
        titolo: 'O que se vê, depois de reunidas as contas',
        paragrafi: [
          'Reunidas as contas, a app mostra a carteira inteira numa só moeda, a repartição por tipos de ativo, e os ganhos e perdas de cada posição. Os objetivos dizem quanto falta para a meta e quanto pôr de parte todos os meses; o rebalanceamento propõe como voltar aos pesos decididos.',
          'A análise com inteligência artificial é facultativa e usa o Google Gemini, com uma chave que o utilizador introduz pessoalmente. Quem a ativa envia à Google a pergunta e a composição da carteira: títulos, quantidades, preços médios. As respostas são pistas geradas por um modelo, não aconselhamento personalizado, e podem conter erros: as decisões continuam a ser de quem investe.',
        ],
      },
    ],
    broker: {
      titolo: 'As corretoras que a app lê sozinha',
      generico:
        'Para qualquer outro intermediário há um leitor CSV genérico: encontra sozinho a linha dos cabeçalhos, e bastam-lhe o símbolo do título e uma coluna entre quantidade, valor e preço.',
    },
    dati: {
      titolo: 'Onde ficam os dados, dito por extenso',
      premessa:
        'As políticas de privacidade têm fama de ser escritas para que ninguém as leia. Esta é a versão curta. Onde disser menos do que a longa, vale a longa, que é o documento legal.',
      voci: [
        {
          termine: 'No telemóvel',
          descrizione:
            'Carteiras, posições e objetivos, cifrados com AES-256. A chave fica à guarda do sistema operativo, tal como as chaves API introduzidas pelo utilizador. Em claro ficam algumas opções de serviço, por exemplo o consentimento para o diagnóstico.',
        },
        {
          termine: 'Em nenhum arquivo da PluriFin',
          descrizione: 'A empresa não conserva as carteiras e não pede que se crie uma conta.',
        },
        {
          termine: 'À PluriFin',
          descrizione:
            'A carteira, nunca. Para verificar o teste de sete dias e a subscrição bastam um identificador anónimo do dispositivo e o recibo da compra.',
        },
        {
          termine: 'A terceiros, só se o utilizador o ativar',
          descrizione:
            'Com a inteligência artificial ativada, a pergunta e a composição da carteira (títulos, quantidades, preços médios) vão para o Google Gemini. Com os preços em tempo real ativados, os símbolos dos títulos vão para o fornecedor escolhido. Nos dois casos o pedido parte do telemóvel e não passa pela PluriFin.',
        },
        {
          termine: 'A quem aloja o site',
          descrizione:
            'As cotações públicas de mercado, a app descarrega-as de plurifin.app. O GitHub e a Cloudflare, que alojam o site, veem o endereço IP do pedido, como em qualquer página web.',
        },
        {
          termine: 'Diagnóstico',
          descrizione:
            'Os relatórios de falhas (Firebase Crashlytics, só em Android) só partem se o utilizador ativar o diagnóstico nas definições. Enquanto estiver desativado nada é transmitido: os relatórios recolhidos entretanto ficam no telemóvel e partem se e quando for ativado. Não contêm dados da carteira nem chaves, e desinstalar a app elimina-os.',
        },
        {
          termine: 'Publicidade e rastreio',
          descrizione: 'Nenhuma publicidade. Na app não há nenhum SDK de analytics.',
        },
        {
          termine: 'Saída',
          descrizione:
            '«Exportar os meus dados» gera um ficheiro JSON com todo o conteúdo; «Limpar todos os dados» elimina-o do telemóvel.',
        },
      ],
      chiusa: 'O texto completo está na política de privacidade, em seis línguas.',
    },
    prezzi: {
      titolo: 'Quanto custa',
      testo:
        'Sete dias de teste sem cartão de crédito. Depois, quatro planos, os mesmos para todos: de 4,99 € por ano a 49,99 € de uma só vez para a família. Nenhuma publicidade em nenhum plano.',
    },
    provare: {
      titolo: 'Experimentar, antes de confiar',
      demo: 'A demo web abre-se no navegador sem instalar nada. Tem limites declarados: cinco posições introduzidas à mão, sem importação, sem objetivos e sem inteligência artificial. Os seus dados ficam no navegador, sem cifragem: serve para ver como a app é feita, não para guardar uma carteira verdadeira.',
      suPlay: 'A app completa está no Google Play.',
    },
    palco: {
      titolo: 'Os ecrãs da app',
      schermate: [
        {
          termine: 'Carteira',
          descrizione:
            'Ecrã da app: o valor total da carteira, o ganho global e o mapa das posições, um retângulo por título.',
        },
        {
          termine: 'Mercado',
          descrizione:
            'Ecrã da app: a panorâmica do mercado e os preços atualizados das posições em carteira.',
        },
        {
          termine: 'Rebalanceamento',
          descrizione:
            'Ecrã da app: os pesos-alvo, o valor da carteira e o resultado do rebalanceamento.',
        },
        {
          termine: 'Análise',
          descrizione:
            'Ecrã da app: as análises rápidas, os indicadores da carteira e o aviso de que os conteúdos não são aconselhamento financeiro.',
        },
      ],
    },
  },

  /* ================================ ROLLQUEST ================================ */
  games: {
    meta: {
      titolo: 'ROLLQUEST: a torre sobe-se um dado de cada vez',
      descrizione:
        'O ROLLQUEST é o jogo de tabuleiro digital da PluriFin Games: um dado, um anel de catorze casas, uma torre para subir. Em desenvolvimento para Android, em seis línguas.',
    },
    occhiello: 'PluriFin Games, em desenvolvimento',
    titolo: 'O ROLLQUEST leva o jogo de tabuleiro ao topo de uma torre',
    sommario:
      'Um dado, um anel de catorze casas e uma torre para subir andar a andar. O jogo da PluriFin está em desenvolvimento para Android, em seis línguas. Sobre o dinheiro tem uma regra escrita, com um teto de despesa: está por inteiro no capítulo que leva o seu nome.',
    capitoli: [
      {
        id: 'gioco',
        titolo: 'Como se joga',
        paragrafi: [
          'Lança-se o dado e Rollo avança no anel. A casa decide o que acontece: um combate, um baú, um talismã a escolher entre três cartas, ou nada, se a casa estiver queimada. Com o espólio equipa-se o herói e, fechada a volta, sobe-se um andar. Dez andares fazem uma Ascensão, e no último espera um chefe.',
          'É um jogo de tabuleiro que apanhou dois hábitos aos videojogos: do roguelite, a partida que recomeça e nunca volta igual; do soulslike, a derrota que ensina alguma coisa. Uma partida dura de dois a cinco minutos; a progressão do herói continua de uma partida para a outra.',
        ],
      },
      {
        id: 'storia',
        titolo: 'A história, em poucas linhas',
        paragrafi: [
          'O Rei Corvax, corvo e feiticeiro, saqueou o reino das Estrelas e fechou-as na sua Torre, suspensa no céu. Rollo, cavaleiro redondo e teimoso, sobe-a andar a andar para as recuperar.',
          'Acompanham-no Lumen, pirilampo encantado; Baffo, texugo e lojista; Bruna, ursa e ferreira. O tom é o de um conto de fadas sombrio, ilustrado: arquitetura, vitrais e luz de lanterna. Nunca o horror, nunca o sangue.',
        ],
      },
      {
        id: 'soldi',
        titolo: 'A regra do dinheiro',
        paragrafi: [
          'Quem não gasta completa todos os conteúdos do jogo. É a restrição com que a PluriFin equilibra a economia: cada alteração tem de ser verificada contra esse jogador, com um simulador, antes de chegar aos jogadores.',
          'Compram-se comodidade, estética e Astralitas, com um teto de 20 euros por mês: quem compra chega mais cedo, não aonde os outros não podem chegar. Dito por inteiro: as Astralitas são a moeda do jogo e pagam tudo, incluindo baús de conteúdo aleatório. É por isso que a classificação etária é 16+, enquanto o conteúdo continua a ser um conto de fadas sem horror e sem sangue.',
          'Hoje o ROLLQUEST está em desenvolvimento e ainda não vende nada. O vício do setor é o jogo sem teto, em que a conta se descobre no fim do mês. Aqui o teto existe e está escrito nesta página, onde qualquer pessoa o poderá atirar à cara da PluriFin.',
        ],
      },
      {
        id: 'mestiere',
        titolo: 'De que é feito',
        paragrafi: [
          'Rollo, os inimigos, os chefes, o dado, o tabuleiro e a interface são originais, desenhados para este jogo. O equipamento pode incluir peças de outros autores, sempre com licença e créditos declarados.',
          'O motor é o Unity. Os números da economia passam por um simulador antes de chegarem ao ecrã, porque num jogo de tabuleiro as regras veem-se, e uma regra que se vê tem de aguentar.',
        ],
      },
    ],
    stato: {
      titolo: 'Em que ponto está',
      paragrafi: [
        'O ROLLQUEST está em desenvolvimento. Não tem data de lançamento, e a PluriFin não inventa uma para encher uma linha: vai anunciá-la nas Notícias quando houver alguma coisa para jogar.',
        'Neste site não há lista de espera em que se inscrever. O jogo está declarado para jogadores a partir dos dezasseis anos e sairá em seis línguas: italiano, inglês, espanhol, francês, alemão e português.',
        'O estúdio é pequeno e pensa em grande: um mundo inteiro, uma torre que não acaba no primeiro chefe, e a pretensão de ficar na mesma prateleira dos jogos feitos por cem pessoas.',
      ],
    },
    /* Corsia B2: la didascalia delle immagini della pagina. Fonte:
       strumenti/torre.mjs e src/assets/torre/PROVENIENZA.json. */
    immagini:
      'A torre desta página é feita com os cenários do jogo, reduzidos para a web. As janelas apagadas não vêm do jogo: são uma versão feita para o site, para que se acendam à medida que se sobe.',
  },

  /* ================================= A CASA ================================= */
  casa: {
    meta: {
      titolo: 'A casa: quem dirige a PluriFin e como trabalha',
      descrizione:
        'A PluriFin é uma empresa italiana fundada e dirigida por Filippo Salemi. Tem duas divisões, Finance e Games, e uma regra: não ganhar dinheiro contra quem usa os seus produtos.',
    },
    occhiello: 'A casa',
    titolo: 'PluriFin, duas divisões e um só modo de ganhar dinheiro',
    sommario:
      'Uma empresa italiana, fundada e dirigida por Filippo Salemi, que faz uma app de finanças pessoais e um jogo de tabuleiro. Quando pede dinheiro, diz primeiro quanto: um preçário de quatro linhas para a app, um teto de 20 euros por mês para o jogo.',
    capitoli: [
      {
        id: 'fondatore',
        titolo: 'Quem a dirige',
        paragrafi: [
          'Filippo Salemi é o fundador e CEO da PluriFin. Assentou a empresa em duas divisões e numa regra que vem antes de ambas: não ganhar dinheiro contra o interesse de quem usa os produtos.',
          'Nos documentos legais, o titular dos produtos e responsável pelo tratamento dos dados é indicado pelo nome, e é a mesma pessoa. Quem tem uma pergunta sabe a quem a dirigir.',
        ],
      },
      {
        id: 'divisioni',
        titolo: 'As duas divisões',
        paragrafi: [
          'A PluriFin Finance faz o Portfolio Manager, a app que reúne numa só carteira os extratos de onze corretoras e a guarda cifrada no telemóvel.',
          'A PluriFin Games faz o ROLLQUEST, um jogo de tabuleiro digital para Android em que se sobe uma torre um dado de cada vez. Está em desenvolvimento.',
          'As duas divisões não se parecem nem têm de se parecer. Têm em comum o método: trabalha-se até a coisa funcionar, depois publica-se.',
        ],
      },
      {
        id: 'metodo',
        titolo: 'Como trabalha',
        paragrafi: [
          'Cada produto sai em seis línguas ao mesmo tempo. Os preços do Portfolio Manager estão num só preçário, e uma verificação automática compara com esse preçário cada página que os repete, incluindo esta.',
          'O código deste site e o fluxo dos dados de mercado são públicos: quem quiser verificar como são feitos não tem de pedir autorização.',
        ],
      },
    ],
    /* Aggiunta dalla corsia B3: la forma giuridica detta in chiaro. Fonti:
       assets/legal/pt/privacy_policy.md, terms_of_service.md. */
    titolare: {
      titolo: 'Quem responde perante a lei',
      testo:
        'PluriFin é a marca com que Filippo Salemi publica os seus produtos. Nos documentos legais, da política de privacidade aos termos de serviço, o titular é ele: uma pessoa singular, em Itália, não uma sociedade.',
    },
    nonFa: {
      titolo: 'O que a PluriFin não faz',
      voci: [
        'Não vende os dados de quem usa os seus produtos, nem os recolhe para o poder fazer.',
        'Não mostra publicidade no Portfolio Manager nem neste site.',
        'Neste site não há nada em que se inscrever: nenhuma lista de espera, nenhuma newsletter.',
        'Não anuncia datas que não pode cumprir.',
      ],
    },
    contatti: {
      titolo: 'Escrever à PluriFin',
      testo: 'Responde uma pessoa.',
    },
  },

  /* ================================ IMPRENSA ================================ */
  stampa: {
    meta: {
      titolo: 'Imprensa: factos, textos prontos e contactos',
      descrizione:
        'Factos verificáveis sobre a PluriFin, o Portfolio Manager e o ROLLQUEST, textos prontos a citar e o contacto para a imprensa.',
    },
    occhiello: 'Imprensa',
    titolo: 'Para quem escreve sobre a PluriFin',
    sommario:
      'Factos que se podem verificar, dois textos prontos a citar e um endereço onde responde uma pessoa. Adjetivos, nenhum: esses, põe-nos quem escreve.',
    inBreve: {
      titolo: 'A empresa em resumo',
      voci: [
        { termine: 'Nome', descrizione: 'PluriFin' },
        { termine: 'Fundador e CEO', descrizione: 'Filippo Salemi' },
        { termine: 'País', descrizione: 'Itália' },
        {
          termine: 'Divisões',
          descrizione: 'PluriFin Finance (Portfolio Manager) e PluriFin Games (ROLLQUEST)',
        },
        {
          termine: 'Línguas',
          descrizione: 'Seis: italiano, inglês, espanhol, francês, alemão e português',
        },
      ],
    },
    /* Aggiunta dalla corsia B3: chi scrive deve poterla riportare giusta. */
    formaGiuridica: {
      termine: 'Forma jurídica',
      descrizione:
        'Pessoa singular. Nos documentos legais o titular é Filippo Salemi; PluriFin é a marca.',
    },
    finance: {
      titolo: 'Portfolio Manager, os factos',
      voci: [
        {
          termine: 'O que é',
          descrizione:
            'Uma app que reúne numa só carteira os extratos de várias corretoras e a guarda no dispositivo.',
        },
        { termine: 'Plataformas', descrizione: 'Android. Uma demo gratuita corre no navegador.' },
        { termine: 'Corretoras lidas', descrizione: 'Onze, mais um leitor CSV genérico.' },
        {
          termine: 'Ficheiros',
          descrizione:
            'CSV de onze corretoras, mais um leitor genérico; também PDF, dos quais a app tenta extrair a tabela. Importados à mão, sem ligação às contas.',
        },
        { termine: 'Dados', descrizione: 'No dispositivo, cifrados com AES-256. Sem conta.' },
        {
          termine: 'Inteligência artificial',
          descrizione: 'Facultativa: Google Gemini, com a chave do utilizador.',
        },
        {
          termine: 'Preços',
          descrizione:
            'Sete dias de teste sem cartão. Quatro planos, de 4,99 € por ano a 49,99 € em pagamento único.',
        },
        { termine: 'Publicidade', descrizione: 'Nenhuma.' },
        {
          termine: 'Aviso',
          descrizione:
            'É uma ferramenta informativa: não executa ordens, e os seus conteúdos, incluindo as análises da inteligência artificial, não constituem aconselhamento financeiro. Este aviso deve manter-se em todos os artigos.',
        },
      ],
    },
    games: {
      titolo: 'ROLLQUEST, os factos',
      voci: [
        {
          termine: 'O que é',
          descrizione:
            'Um jogo de tabuleiro digital: um dado, um anel de catorze casas, uma torre para subir.',
        },
        { termine: 'Plataforma', descrizione: 'Android.' },
        { termine: 'Motor', descrizione: 'Unity.' },
        { termine: 'Línguas', descrizione: 'Seis.' },
        { termine: 'Público', descrizione: 'Jogadores a partir dos dezasseis anos.' },
        { termine: 'Estado', descrizione: 'Em desenvolvimento. Nenhuma data anunciada.' },
        {
          termine: 'Regra',
          descrizione:
            'Quem não gasta completa todos os conteúdos e quem gasta tem um teto de 20 euros por mês: a regra inteira, baús de conteúdo aleatório incluídos, está no capítulo do dinheiro da página Games.',
        },
      ],
    },
    pronti: {
      titolo: 'Textos prontos',
      premessa: 'Podem copiar-se tal como estão.',
      riga: 'A PluriFin é uma empresa italiana, fundada por Filippo Salemi, que faz ferramentas sérias e jogos que se acendem: o Portfolio Manager para as finanças pessoais e o ROLLQUEST para o jogo.',
      paragrafo:
        'A PluriFin é uma empresa italiana fundada e dirigida por Filippo Salemi, com duas divisões. A Finance desenvolve o Portfolio Manager, uma app que reúne numa só carteira os extratos de onze corretoras e a guarda cifrada no dispositivo, sem conta e sem publicidade. A Games desenvolve o ROLLQUEST, um jogo de tabuleiro digital para Android passado numa torre, hoje em desenvolvimento. As duas divisões partilham uma regra, não ganhar dinheiro contra o interesse de quem usa os produtos, e publicam cada produto em seis línguas.',
    },
    materiali: {
      titolo: 'Materiais',
      voci: [
        { termine: 'Marca', descrizione: 'O glifo da PluriFin, em formato SVG.' },
        { termine: 'Imagem para redes sociais', descrizione: '1200 por 630 píxeis, em formato PNG.' },
        {
          termine: 'Capturas de ecrã e outro material',
          descrizione: 'A pedido, escrevendo para o endereço da imprensa.',
        },
      ],
      uso: 'A marca e as capturas de ecrã podem usar-se em artigos e análises que falem da PluriFin. O glifo não se redesenha nem se recolore.',
    },
    contatto: {
      titolo: 'Contacto para a imprensa',
      testo: 'Responde uma pessoa.',
    },
  },

  /* ================================= PREÇOS ================================= */
  prezzi: {
    meta: {
      titolo: 'Preços do Portfolio Manager',
      descrizione:
        'Quatro planos, os mesmos para todos, a partir de 4,99 € por ano. Sete dias de teste sem cartão de crédito, nenhuma publicidade.',
    },
    occhiello: 'Finance, o preçário',
    titolo: 'Quanto custa o Portfolio Manager, por inteiro',
    sommario:
      'O Portfolio Manager tem quatro planos, os mesmos para todos, e sete dias de teste sem cartão de crédito. Nenhum plano tem publicidade. O resto desta página são pormenores, e num preçário os pormenores são o que conta.',
    colonne: { piano: 'Plano', prezzo: 'Preço', perChi: 'Para quem', rinnovo: 'Renovação' },
    piani: [
      {
        id: 'single_annual',
        nome: 'Individual, anual',
        prezzo: '4,99 € por ano',
        perChi: 'Uma conta Google',
        rinnovo: 'Automática de doze em doze meses, desativável quando se quiser',
      },
      {
        id: 'single_lifetime',
        nome: 'Individual, vitalício',
        prezzo: '29,99 € em pagamento único',
        perChi: 'Uma conta Google',
        rinnovo: 'Nenhuma: paga-se uma vez',
      },
      {
        id: 'family_annual',
        nome: 'Família, anual',
        prezzo: '9,99 € por ano',
        perChi: 'Quem compra e até cinco membros do seu grupo familiar da Google',
        rinnovo: 'Automática de doze em doze meses, desativável quando se quiser',
      },
      {
        id: 'family_lifetime',
        nome: 'Família, vitalício',
        prezzo: '49,99 € em pagamento único',
        perChi: 'Quem compra e até cinco membros do seu grupo familiar da Google',
        rinnovo: 'Nenhuma: paga-se uma vez',
      },
    ],
    nota: 'Preços em euros para o mercado italiano, com IVA incluído quando devido. Nos outros países, o Google Play aplica a sua própria conversão.',
    capitoli: [
      {
        id: 'prova',
        titolo: 'O teste de sete dias',
        paragrafi: [
          'A partir do primeiro arranque, a app funciona durante sete dias com todas as funções, sem pedir cartão de crédito. Nenhuma cobrança se faz sozinha. O teste está ligado à instalação da app, não a uma conta: para o começar não é preciso registo.',
          'Terminado o teste, fica a versão gratuita. As posições introduzem-se à mão, o rebalanceamento e os dados de mercado continuam a funcionar; a importação das corretoras, os objetivos e a inteligência artificial param até se escolher um plano.',
        ],
      },
      {
        id: 'tutti',
        titolo: 'O que há em cada plano',
        paragrafi: [
          'Os quatro planos desbloqueiam as mesmas funções: importação das corretoras, objetivos e análise com inteligência artificial. O rebalanceamento e os dados de mercado também existem na versão gratuita. De um plano para outro só mudam a forma de pagar e o número de pessoas.',
        ],
      },
      {
        id: 'famiglia',
        titolo: 'Como funciona o plano Família',
        paragrafi: [
          'Quem compra partilha o plano com os membros do seu grupo familiar da Google, até cinco, que acedem a partir da sua conta sem pagar outra vez. O grupo, gere-o a Google, não a PluriFin: convites e remoções fazem-se nas ferramentas da Google.',
        ],
      },
      {
        id: 'pagamento',
        titolo: 'Pagamento, cancelamento e reembolsos',
        paragrafi: [
          'O pagamento passa inteiramente pelo Google Play: a PluriFin não recebe os dados do cartão. A renovação anual desativa-se na página de subscrições do Google Play, sem penalizações, e o acesso mantém-se até ao fim do ano já pago.',
          'Nos planos anuais o reembolso pede-se ao Google Play: nas quarenta e oito horas a seguir à compra, a partir do histórico de encomendas; mais tarde, decide a Google. Nos planos vitalícios a PluriFin honra o direito de livre resolução durante catorze dias a contar da compra, mediante pedido escrito para o endereço indicado nos Termos de serviço. Encaminha o processo para a Google e, se a Google recusar, reconhece um crédito de igual valor ou um reembolso bancário. As condições completas estão nos Termos de serviço.',
        ],
      },
      {
        id: 'perche',
        titolo: 'Porque custa tão pouco',
        paragrafi: [
          'Porque só tem de se pagar a si mesma. Não há anunciantes para contentar nem dados para rentabilizar: há uma app, e há o seu preço.',
        ],
      },
      {
        id: 'chiude',
        titolo: 'Se a PluriFin fechasse amanhã',
        paragrafi: [
          'Os dados ficariam onde sempre estiveram: no telemóvel de quem os possui, exportáveis para um ficheiro JSON que outros programas sabem ler.',
        ],
      },
    ],
    suPlay: 'Os planos compram-se a partir da app, no Google Play.',
    /* Lotto TESTO-IT-2: la frase che la pagina mostra finche' `pmSuPlay` e'
       falso, al posto di `suPlay`. Non nomina il negozio (lo vieta il
       presidio): dice quando si potra' comprare e come si prova oggi. */
    primaDellaScheda:
      'As compras abrem com a publicação da app. Até lá, a maneira de a experimentar é a demo web, que é gratuita.',
  },

  /* =============================== PERGUNTAS =============================== */
  domande: {
    meta: {
      titolo: 'Perguntas frequentes sobre o Portfolio Manager',
      descrizione:
        'Custos, corretoras suportadas, onde ficam os dados, o que faz e o que não faz a app da PluriFin Finance.',
    },
    occhiello: 'Finance, as perguntas',
    titolo: 'As perguntas a fazer a uma app de finanças',
    sommario: 'Respostas curtas. Onde é preciso o pormenor, há a página que o contém.',
    voci: [
      {
        domanda: 'Quanto custa?',
        risposta:
          'Sete dias de teste sem cartão de crédito, depois um dos quatro planos da página Preços, ou a versão gratuita com menos funções. A demo web é gratuita. As chaves para a inteligência artificial ou para os preços em tempo real são facultativas e pagam-se, se se quiserem, ao fornecedor que se escolher.',
      },
      {
        domanda: 'Que corretoras lê?',
        risposta:
          'Os CSV de onze corretoras: Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (hoje parte da Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB e Revolut. Para as outras há um leitor CSV genérico. Aceita também PDF, dos quais tenta extrair a tabela.',
      },
      {
        domanda: 'Os dados vão parar à cloud?',
        risposta:
          'Não. Carteiras, posições e objetivos ficam no dispositivo, cifrados. Só saem dados pelas funções facultativas que o utilizador ativa: a inteligência artificial, os preços em tempo real e o diagnóstico de falhas, cada uma para o seu fornecedor e nunca para a PluriFin.',
      },
      {
        domanda: 'A app compra e vende títulos?',
        risposta:
          'Não. Não executa ordens, não é uma corretora e não se liga às contas.',
      },
      {
        domanda: 'O que faz a inteligência artificial?',
        risposta:
          'Responde a perguntas sobre a carteira e escreve análises sobre ela, incluindo pistas sobre o que mudar. São textos gerados por um modelo, o Google Gemini: não são aconselhamento financeiro personalizado e podem conter erros ou dados desatualizados. As decisões continuam a ser de quem investe.',
      },
      {
        domanda: 'É preciso uma conta?',
        risposta:
          'Não. Não há registo. O teste de sete dias está ligado à instalação da app; a compra está ligada à conta Google com que se paga, não a uma conta PluriFin.',
      },
      {
        domanda: 'Funciona sem ligação?',
        risposta:
          'Sim, para o que já está no telemóvel: a app abre-se e mostra carteiras e posições mesmo sem rede, com os últimos preços descarregados. A rede serve para atualizar os preços e para a inteligência artificial.',
      },
      {
        domanda: 'Pode usar-se no navegador?',
        risposta:
          'Sim, na demo web, com os limites declarados na página do Portfolio Manager.',
      },
      {
        domanda: 'Em quantas línguas?',
        risposta: 'Seis: italiano, inglês, espanhol, francês, alemão e português.',
      },
      {
        domanda: 'Como chegam as atualizações?',
        risposta:
          'A app atualiza-se a partir da loja de onde foi instalada. A demo web atualiza-se recarregando a página.',
      },
    ],
  },

  /* =============================== CONTACTOS =============================== */
  contatti: {
    meta: {
      titolo: 'Contactos',
      descrizione: 'Os endereços da PluriFin para informações, imprensa, privacidade e Games.',
    },
    occhiello: 'Contactos',
    titolo: 'Escrever à PluriFin',
    sommario:
      'Quatro endereços e uma pessoa que responde.',
    voci: [
      { termine: 'Informações', descrizione: 'Perguntas sobre os produtos e assistência.' },
      { termine: 'Imprensa', descrizione: 'Jornalistas, análises, pedidos de materiais.' },
      {
        termine: 'Privacidade',
        descrizione:
          'Perguntas sobre o tratamento dos dados. Para os pedidos formais de acesso, retificação e apagamento vale o endereço indicado na política de privacidade.',
      },
      { termine: 'Games', descrizione: 'Tudo o que diz respeito ao ROLLQUEST.' },
    ],
  },

  /* ================================ NOTÍCIAS ================================ */
  notizie: {
    meta: {
      titolo: 'Notícias da PluriFin',
      descrizione: 'O que muda na PluriFin, no Portfolio Manager e no ROLLQUEST.',
    },
    occhiello: 'Notícias',
    titolo: 'Notícias',
    sommario: 'O que muda, escrito por quem o mudou.',
    pubblicato: 'Publicado a',
    leggi: 'Ler o artigo',
    vuoto: 'Ainda não há notícias nesta língua.',
    ritorno: 'Todas as notícias',
  },

  legali: {
    ritorno: 'Voltar à primeira página',
    indice: 'Índice',
    aggiornato: 'Última atualização',
  },
};

export default pt;
