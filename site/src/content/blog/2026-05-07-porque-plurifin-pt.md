---
title: "O Portfolio Manager assenta em três proibições"
summary: "Nenhum arquivo das carteiras, nenhuma ligação às contas, nenhuma inteligência artificial sem a chave de quem a usa. O preçário de quatro linhas vem daí."
publishedAt: 2026-05-07
updatedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Redação"
lang: pt
tags: ["portfolio-manager", "privacidade", "preços"]
---

As apps de finanças apresentam-se com a lista do que fazem. O Portfolio Manager, a app da PluriFin Finance, percebe-se mais depressa pelo que não pode fazer. Não tem um arquivo onde guardar as carteiras, não se liga às contas e não usa inteligência artificial sem uma chave do utilizador. São três proibições, e o preçário de quatro linhas é a consequência delas.

## Primeira proibição: nenhum arquivo das carteiras

A carteira fica no telemóvel de quem a possui, cifrada com AES-256, com a chave à guarda do sistema operativo. A PluriFin não conserva as carteiras e não pede que se crie uma conta. Para verificar o teste e a subscrição bastam-lhe um identificador anónimo do dispositivo e o recibo da compra.

Uma app de finanças gratuita que conserva as carteiras nos seus servidores tem um custo a cobrir. Antes de a instalar, convém perguntar com que o cobre.

Duas coisas têm de ser ditas por inteiro. A demo web guarda os dados no navegador, sem cifragem: serve para ver como a app é feita, não para guardar uma carteira verdadeira. Os relatórios de falhas (Firebase Crashlytics) só partem se o utilizador ativar o diagnóstico nas definições, e não contêm dados da carteira.

A saída está tão prevista como a entrada: «Exportar os meus dados» gera um ficheiro JSON com todo o conteúdo, «Limpar todos os dados» elimina-o do telemóvel.

## Segunda proibição: nenhuma ligação às contas

A app não pede as credenciais de uma corretora e não executa ordens. Os dados entram porque os traz quem os possui, um ficheiro de cada vez. O Portfolio Manager reconhece os CSV de onze corretoras, mostra uma pré-visualização das linhas a corrigir e trata dos duplicados antes de guardar. Para os outros intermediários há um leitor genérico, e dos PDF a app tenta extrair a tabela.

É mais lento do que uma ligação automática. É também a razão pela qual ninguém tem de entregar à PluriFin as credenciais do seu banco.

## Terceira proibição: inteligência artificial só com a chave do utilizador

A análise com inteligência artificial é facultativa. Usa o Google Gemini com uma chave que o utilizador introduz pessoalmente, à guarda do sistema operativo do telemóvel. Quem a ativa envia à Google a pergunta e a composição da carteira: títulos, quantidades, preços médios. O pedido parte do telemóvel e não passa pela PluriFin, que não o conserva.

As respostas são pistas geradas por um modelo, não aconselhamento financeiro personalizado, e podem conter erros. As decisões continuam a ser de quem investe.

## O preçário que daí resulta

Uma empresa que não conserva as carteiras não paga para as conservar, e uma que não mostra publicidade não tem anunciantes para contentar. Fica uma app, com o seu preço. São sete dias de teste sem cartão de crédito e, depois, quatro planos, os mesmos para todos, de 4,99 euros por ano a 49,99 euros de uma só vez para a família.

Terminado o teste, fica uma versão gratuita. As posições introduzem-se à mão, o rebalanceamento e os dados de mercado continuam a funcionar; a importação das corretoras, os objetivos e a inteligência artificial param até se escolher um plano. O preçário completo, com renovações e reembolsos, está na página [Preços](/pt/pricing).

## Onde verificar o que aqui está escrito

O código deste site e o fluxo dos dados de mercado são públicos no repositório [portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data). O que a app faz com os dados está escrito por extenso na [política de privacidade](/pt/privacy), em seis línguas. A [demo web](/app/) abre-se no navegador sem instalar nada.

*Artigo de 7 de maio de 2026, reescrito a 11 de novembro de 2026 com os factos de hoje.*
