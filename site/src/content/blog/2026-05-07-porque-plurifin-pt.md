---
title: "Porque construí a PluriFin"
summary: "A história pessoal por trás de uma app privacy-first para investidores retalhistas, e como um programador único pode oferecer um plano a 0,99 EUR/ano."
publishedAt: 2026-05-07
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: pt
tags: ["founder", "story", "personal-finance"]
---

Trabalho na PluriFin há cerca de 18 meses, em part-time, enquanto o meu
trabalho principal continua a ser programador de software numa empresa
italiana. A app não nasceu como produto comercial: nasceu como ferramenta
pessoal para seguir uma carteira multi-broker que ano após ano se tornava
mais difícil de gerir com ferramentas generalistas.

## O problema

Tinha posições distribuídas por 4 brokers (Interactive Brokers, Trade Republic,
Fineco e Directa) em 3 moedas (EUR, USD, GBP), com ativos de natureza mista
(ações individuais, ETFs cotados nos EUA, ETFs UCITS, alguns ETP cripto,
fundos de obrigações). Cada broker exporta num formato CSV diferente, cada
broker tem a sua granularidade de transação, e cada broker tem a sua
interpretação de "custo médio de aquisição" e "P&amp;L realizado".

As ferramentas generalistas que tinha experimentado (templates Google Sheets,
alguns serviços web italianos) ou não percebiam os CSV multi-broker, ou
exigiam entregar as credenciais API a um serviço cloud terceiro. Nenhuma das
duas opções era aceitável para mim: as folhas de cálculo tornam-se
ingerenciáveis para além de ~30 posições, e dar um token API read-only a um
serviço não auditável é um tradeoff que não estou disposto a aceitar.

## A resposta pessoal e depois o produto

A PluriFin nasceu como projeto interno com três restrições rígidas:

1. **Os dados vivem no dispositivo do utilizador**, em armazenamento cifrado
   AES-256. Sem cloud PluriFin obrigatória. A exportação GDPR está a um clique
   de distância.
2. **A app nunca fala com um broker em nome do utilizador**. Tudo acontece via
   importação de ficheiros CSV/PDF que o utilizador descarrega do seu broker.
   Sem chaves API de terceiros guardadas pela PluriFin.
3. **As funções IA são opcionais e usam chaves do utilizador**. Se queres a
   análise Gemini, introduzes a tua chave API; permanece no keystore do teu
   dispositivo.

Quando percebi que o produto podia ser útil a mais alguém além de mim, decidi
publicá-lo. O modelo comercial é deliberadamente low-friction:

- 7 dias de teste grátis sem cartão
- 0,99 EUR/ano para Single, 1,99 EUR/ano para Família
- Lifetime pagamento único 4,99 EUR (Single) ou 9,99 EUR (Família)

Sem "early bird", sem "primeiros N utilizadores", sem promoções que segmentem.
Mesmo preço para todos, hoje e sempre.

## Porque tão barato

A app custa 25 USD pagamento único de Play Console e ~0 EUR de hosting
(Cloudflare free tier para o Worker e GitHub Pages para o site). Não há
investidores a quem devolver capital, não há churn a combater com descontos,
não há equipa a pagar. O objetivo é cobrir os custos operacionais e manter
viva uma comunidade de utilizadores que apreciam uma abordagem honesta à
poupança.

Se a PluriFin um dia parar as operações, a exportação GDPR devolve todos os
teus dados num único JSON portável -- e os planos Lifetime permanecem
acessíveis para sempre na tua conta Google.

## O que esperar nos próximos meses

- **Q2 2026**: lançamento Play Store (Android), webapp gratuita já em direto
- **Q3 2026**: feedback recolhido do Closed Testing, hotfixes para crashes residuais
- **Q4 2026 / Q1 2027**: aumento do número de brokers suportados (prioridade: feedback dos utilizadores)
- **Fase 2 (pós-receita)**: iOS, Apple Pay, marca EUIPO, eventual seguro RC Tech

Para acompanhar o desenvolvimento em tempo real, o repositório público
[portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data)
aloja a pipeline dos dados de mercado e o site que estás a ler. O código da
app Android permanece closed-source por razões de compliance (chaves de
assinatura, anti-piracy, integridade do contexto Play Billing), mas as
especs de formato CSV dos brokers e os templates dos documentos legais
são públicos.

Até breve.
