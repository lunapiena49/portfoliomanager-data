---
title: "Porque construi a PluriFin"
summary: "A historia pessoal por tras de uma app privacy-first para investidores retalhistas, e como um unico programador pode oferecer um plano a 0,99 EUR/ano."
publishedAt: 2026-05-07
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: pt
tags: ["founder", "story", "personal-finance"]
---

Trabalho na PluriFin ha cerca de 18 meses, em part-time, enquanto o meu
trabalho principal continua a ser programador de software numa empresa
italiana. A app nao nasceu como produto comercial: nasceu como ferramenta
pessoal para seguir uma carteira multi-broker que ano apos ano se tornava
mais dificil de gerir com ferramentas generalistas.

## O problema

Tinha posicoes distribuidas por 4 brokers (Interactive Brokers, Trade Republic,
Fineco e Directa) em 3 moedas (EUR, USD, GBP), com ativos de natureza mista
(acoes individuais, ETFs cotados nos EUA, ETFs UCITS, alguns ETP cripto,
fundos de obrigacoes). Cada broker exporta num formato CSV diferente, cada
broker tem a sua granularidade de transacao, e cada broker tem a sua
interpretacao de "custo medio de aquisicao" e "P&amp;L realizado".

As ferramentas generalistas que tinha experimentado (templates Google Sheets,
alguns servicos web italianos) ou nao percebiam os CSV multi-broker, ou
exigiam entregar as credenciais API a um servico cloud terceiro. Nenhuma das
duas opcoes era aceitavel para mim: as folhas de calculo tornam-se
ingerenciaveis para alem de ~30 posicoes, e dar um token API read-only a um
servico nao auditavel e um tradeoff que nao estou disposto a aceitar.

## A resposta pessoal e depois o produto

A PluriFin nasceu como projeto interno com tres restricoes rigidas:

1. **Os dados vivem no dispositivo do utilizador**, em armazenamento cifrado
   AES-256. Sem cloud PluriFin obrigatoria. A exportacao GDPR esta a um clique
   de distancia.
2. **A app nunca fala com um broker em nome do utilizador**. Tudo acontece via
   importacao de ficheiros CSV/PDF que o utilizador descarrega do seu broker.
   Sem chaves API de terceiros guardadas pela PluriFin.
3. **As funcoes IA sao opcionais e usam chaves do utilizador**. Se queres a
   analise Gemini, introduzes a tua chave API; permanece no keystore do teu
   dispositivo.

Quando percebi que o produto podia ser util a mais alguem alem de mim, decidi
publica-lo. O modelo comercial e deliberadamente low-friction:

- 7 dias de teste gratis sem cartao
- 0,99 EUR/ano para Single, 1,99 EUR/ano para Familia
- Lifetime pagamento unico 4,99 EUR (Single) ou 9,99 EUR (Familia)

Sem "early bird", sem "primeiros N utilizadores", sem promocoes que segmentem.
Mesmo preco para todos, hoje e sempre.

## Porque tao barato

A app custa 25 USD pagamento unico de Play Console e ~0 EUR de hosting
(Cloudflare free tier para o Worker e GitHub Pages para o site). Nao ha
investidores a quem devolver capital, nao ha churn a combater com descontos,
nao ha equipa a pagar. O objetivo e cobrir os custos operacionais e manter
viva uma comunidade de utilizadores que apreciam uma abordagem honesta a
poupanca.

Se a PluriFin um dia parar as operacoes, a exportacao GDPR devolve todos os
teus dados num unico JSON portavel -- e os planos Lifetime permanecem
acessiveis para sempre na tua conta Google.

## O que esperar nos proximos meses

- **Q2 2026**: lancamento Play Store (Android), webapp gratuita ja em direto
- **Q3 2026**: feedback recolhido do Closed Testing, hotfixes para crashes residuais
- **Q4 2026 / Q1 2027**: aumento do numero de brokers suportados (prioridade: feedback dos utilizadores)
- **Fase 2 (pos-receita)**: iOS, Apple Pay, marca EUIPO, eventual seguro RC Tech

Para acompanhar o desenvolvimento em tempo real, o repositorio publico
[portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data)
aloja a pipeline dos dados de mercado e o site que estas a ler. O codigo da
app Android permanece closed-source por razoes de compliance (chaves de
assinatura, anti-piracy, integridade do contexto Play Billing), mas as
especs de formato CSV dos brokers e os templates dos documentos legais
sao publicos.

Ate breve.
