---
title: "Cinco perguntas a fazer a uma app antes de lhe confiar a carteira"
summary: "Onde ficam os dados, como entram os extratos, quem lê as perguntas feitas à inteligência artificial, o que a app não faz e quanto custa. Com as respostas do Portfolio Manager."
publishedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Redação"
lang: "pt"
tags: ["portfolio-tracker", "investimentos", "guia", "privacidade"]
draft: false
---

Manter numa folha de cálculo uma carteira repartida por várias corretoras é reescrever à mão o que cada extrato diz à sua maneira. Quem se cansa procura uma app, e antes de lhe carregar os extratos convém fazer-lhe cinco perguntas. Por baixo de cada uma está a resposta do Portfolio Manager, a app da PluriFin Finance. Quem lê pode verificá-la na demo web e na política de privacidade, e exigir às outras a mesma clareza.

## 1. Onde ficam os dados

As respostas possíveis são três:

- **Nos servidores de quem faz a app**: cómodo para quem usa vários dispositivos, mas a carteira mora em casa alheia
- **No dispositivo, em claro**: é o caso da folha de cálculo, legível por qualquer programa com acesso aos ficheiros
- **No dispositivo, cifrados**: a chave nasce no telemóvel e lá fica

O Portfolio Manager está na terceira. Carteiras, posições e objetivos ficam no telemóvel, cifrados com AES-256, com a chave à guarda do sistema operativo. A PluriFin não tem um arquivo onde os guardar e não pede que se crie uma conta. A exceção é a demo web, e declara-o: os seus dados ficam no navegador, sem cifragem.

Uma app gratuita que conserva as carteiras nos seus servidores tem um custo a cobrir. A pergunta seguinte é com que o cobre.

## 2. Como entram os extratos

Os caminhos são dois: entregar à app as credenciais da corretora, ou importar os ficheiros que a corretora exporta. O Portfolio Manager só conhece o segundo: não se liga às contas e não executa ordens.

A app lê os CSV de onze corretoras: Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (hoje parte da Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB e Revolut. Para as outras há um leitor genérico, a que bastam o símbolo do título e uma coluna entre quantidade, valor e preço. Aceita também PDF, dos quais tenta extrair a tabela.

A qualquer app deve perguntar-se se a importação do próprio extrato pode ser experimentada antes de pagar. No Portfolio Manager, sim: os sete dias de teste têm todas as funções e não pedem cartão de crédito. Na demo web, não: aí as posições introduzem-se à mão, cinco no máximo.

## 3. Quem lê as perguntas feitas à inteligência artificial

Uma análise da carteira escrita por um modelo obriga a enviar a carteira a quem gere o modelo. Convém saber por que servidores passa e quem a conserva.

No Portfolio Manager a análise é facultativa e usa o Google Gemini, com uma chave que o utilizador introduz pessoalmente. A pergunta e a composição da carteira (títulos, quantidades, preços médios) vão do telemóvel para a Google sem passar pela PluriFin, que não as conserva. O mesmo vale para os preços em tempo real: os símbolos dos títulos vão para o fornecedor que o utilizador escolhe.

## 4. O que a app não faz

O Portfolio Manager não executa ordens e não é uma corretora. As análises da inteligência artificial são pistas geradas por um modelo: não são aconselhamento financeiro personalizado e podem conter erros.

A app também não calcula impostos. Os ganhos e perdas apresentados são contas aritméticas: preço atual menos preço médio, vezes a quantidade. Não têm em conta a tributação das mais-valias, o imposto de selo italiano sobre os títulos nem a compensação de menos-valias. Para a declaração de rendimentos, o aviso financeiro da app remete para um contabilista ou um consultor fiscal.

Para levar os dados para outro lado há «Exportar os meus dados», que gera um ficheiro JSON com todo o conteúdo.

## 5. Quanto custa, e o que acontece quando se deixa de pagar

O vício do setor é o teste que pede o cartão e a subscrição que arranca sozinha quando ninguém está a olhar. No Portfolio Manager o teste dura sete dias e não conhece o cartão de quem o usa: quando acaba, nenhuma cobrança se faz sozinha.

Depois há quatro planos, os mesmos para todos, de 4,99 euros por ano a 49,99 euros de uma só vez para a família. Nenhum plano tem publicidade. Renovações, cancelamento e reembolsos estão na página [Preços](/pt/pricing).

Terminado o teste, fica uma versão gratuita. As posições introduzem-se à mão, o rebalanceamento e os dados de mercado continuam a funcionar; a importação das corretoras, os objetivos e a inteligência artificial param até se escolher um plano. Em qualquer caso os dados ficam no telemóvel, exportáveis.

## Por onde começar

A [demo web](/app/) abre-se no navegador sem instalar nada, com limites declarados: cinco posições introduzidas à mão, sem importação, sem objetivos e sem inteligência artificial. Quem ficar pela folha de cálculo pode levar consigo as cinco perguntas: valem para qualquer app.

*Versão portuguesa, de 11 de novembro de 2026, do artigo publicado em italiano a 3 de maio de 2026. O Portfolio Manager é uma ferramenta informativa: os seus conteúdos não constituem aconselhamento financeiro, fiscal ou jurídico.*
