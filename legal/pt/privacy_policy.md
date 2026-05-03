# Politica de Privacidade -- Portfolio Manager by PluriFin

**Versao**: 1.0.0
**Ultima atualizacao**: 2026-05-02
**Idioma original**: Italiano (versao vinculante para a jurisdicao)

---

## 1. Responsavel pelo tratamento

- **Nome**: Filippo Salemi
- **Forma juridica**: pessoa fisica (programador independente)
- **Marca comercial**: PluriFin
- **Pais**: Italia
- **Email para pedidos RGPD e privacidade**: `plurifin.app+gdpr@gmail.com`
- **Email geral**: `plurifin.app@gmail.com`

Nenhum Encarregado de Protecao de Dados (DPO) designado: pessoa fisica
fora dos casos obrigatorios do art. 37 RGPD.

## 2. Resumo (TL;DR)

- Todos os dados de carteira (posicoes, transacoes, objetivos, definicoes)
  sao **armazenados apenas no dispositivo do utilizador** em forma
  cifrada. Nao recebidos nem armazenados em servidores PluriFin.
- App **nao usa analytics de terceiros** (sem Google Analytics, Firebase,
  Facebook SDK, AppsFlyer, Sentry por defeito).
- App **nao partilha dados com anunciantes**. Sem publicidade.
- **Funcionalidades opcionais** existem que, se ativadas, transmitem
  dados a subprocessadores de terceiros: IA Gemini, precos mercado em
  tempo real (EODHD/FMP), validacao de subscricao (Cloudflare Worker).
  Cada uma requer acao explicita.
- Utilizador pode exportar e apagar todos os dados em qualquer momento
  pelas Definicoes, sem contactar o responsavel.

## 3. Categorias de dados

### 3.1 Dados locais no dispositivo

Cifrados Hive AES-256 + chave no keystore do sistema:

| Categoria | Exemplos | Base juridica | Conservacao |
|---|---|---|---|
| Dados de carteira | nome, ticker, quantidade, preco medio, broker, data | art. 6.1.b RGPD | Ate eliminacao |
| Objetivos financeiros | titulo, valor, prazo, contribuicoes | art. 6.1.b RGPD | Ate eliminacao |
| Preferencias | idioma, moeda, tema, notificacoes, modo demo | art. 6.1.b RGPD | Ate desinstalacao |
| Auditoria de consentimentos | timestamp, versao doc, decisao, hash texto | art. 6.1.c RGPD | Ate eliminacao |
| Chaves API do utilizador | chaves dos fornecedores ativados: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (introduzidas manualmente) | art. 6.1.b RGPD | Ate remocao |

`flutter_secure_storage` (Android Keystore / iOS Keychain / DPAPI).

### 3.2 Dados via Play Store (Google)

PluriFin recebe apenas: `purchaseToken`, `productId`, `device_id_hash`
(HMAC-SHA256). PluriFin **nao** recebe nome, email, morada, dados de
pagamento.

### 3.3 Validacao subscricao (Cloudflare Worker)

Dados enviados: `device_id_hash`, `purchase_token`, `product_id`, JWT
assinado. Resposta: JWT Ed25519. Sem PII. Hash nao identificavel sem o
salt servidor.

### 3.4 Dados a Gemini (so se ativado)

Se utilizador introduz a chave Gemini e usa IA, o prompt (pergunta +
estrutura carteira anonima) e transmitido diretamente a Google Gemini.
Aplicam-se [Google Gemini API Terms](https://ai.google.dev/terms).

### 3.5 Dados aos fornecedores de mercado (so se ativado)

A app suporta 10 fornecedores de dados de mercado que o utilizador pode
configurar independentemente introduzindo a sua API key nas Definicoes.
Quando o utilizador pede uma atualizacao de precos, a app transmite os
tickers diretamente ao fornecedor escolhido. PluriFin nao intermedeia
nem armazena.

Fornecedores suportados e politicas de privacidade:

- [EODHD](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage](https://www.alphavantage.co/privacy/)
- [Twelve Data](https://twelvedata.com/privacy)
- [Finnhub](https://finnhub.io/privacy-policy)
- [Polygon.io](https://polygon.io/privacy)
- [Marketstack](https://marketstack.com/privacy)
- [Tiingo](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): download CSV publico sem API key (a
  requisicao HTTP vai diretamente do dispositivo a stooq.com)

Para cada fornecedor, a transmissao ocorre **so** se o utilizador:
1. introduziu a sua API key nas Definicoes (Stooq excluido, gratuito);
2. selecionou o fornecedor como ativo para o refresh.

O utilizador pode remover a chave ou desativar o fornecedor a qualquer
momento.

## 4. Subprocessadores

| Subprocessador | Finalidade | Dados | Quando |
|---|---|---|---|
| Google Play Billing | Pagamento subscricao | purchaseToken, productId | So compra |
| Google Gemini API | Analise IA | Prompt + carteira anonima | So ativacao |
| EODHD | Precos real-time e historicos | Lista tickers | So ativacao |
| FMP | Precos real-time, fundamentais | Lista tickers | So ativacao |
| Alpha Vantage | Precos historicos | Lista tickers | So ativacao |
| Twelve Data | Precos real-time e historicos | Lista tickers | So ativacao |
| Finnhub | Precos real-time | Lista tickers | So ativacao |
| Polygon.io | Precos historicos | Lista tickers | So ativacao |
| Marketstack | Precos end-of-day | Lista tickers | So ativacao |
| Tiingo | Precos real-time e historicos | Lista tickers | So ativacao |
| Nasdaq Data Link | Precos historicos | Lista tickers | So ativacao |
| Stooq | Download CSV publico precos historicos | Lista tickers (sem API key) | So ativacao Stooq |
| Cloudflare Worker | Validacao subscricao | device_id_hash, JWT | Sempre (gating) |
| GitHub Pages | Hosting | IP HTTP request | Cada visita |

## 5. Transferencias fora da UE

Google, Cloudflare, GitHub: empresas USA. Bases:

- Clausulas Contratuais Tipo UE 2021/914
- EU-US Data Privacy Framework (Google)
- Politicas proprias (EODHD, FMP)

Quem nao quer transferencias fora UE: nao ativar funcoes opcionais.

## 6. Direitos do titular (arts. 15-22 RGPD)

| Direito | Como exercer |
|---|---|
| Acesso | Definicoes > Privacidade > Exportar os meus dados (ZIP) |
| Retificacao | Edicao direta na app |
| Apagamento | Definicoes > Privacidade > Apagar todos os dados / desinstalar |
| Limitacao | Desativar funcoes opcionais |
| Portabilidade | Definicoes > Exportar (JSON+CSV) |
| Oposicao | Desativar funcoes opcionais |
| Reclamacao | [Garante (Italia)](https://www.garanteprivacy.it/), CNPD (Portugal) ou autoridade nacional |

Pedidos: `plurifin.app+gdpr@gmail.com`. Resposta em 30 dias (art. 12.3
RGPD).

## 7. Conservacao

Dados locais ate eliminacao pelo utilizador. Auditoria consentimentos:
ate exportacao e eliminacao explicitas. Subprocessadores: politica
propria.

## 8. Seguranca

- Hive AES-256 + HMAC-SHA256
- `flutter_secure_storage`
- HTTPS apenas (TLS 1.2+)
- `FLAG_SECURE` Android nas paginas sensiveis
- `allowBackup=false`
- Detecao root/jailbreak com degradacao graceful
- Obfuscation Dart em releases

## 9. Menores (art. 8 RGPD)

App nao destinada a menores de 18 anos. Content rating Play "18+".
Pais/tutores podem pedir eliminacao em `plurifin.app+gdpr@gmail.com`.

## 10. Cookies

App movel: nenhum cookie. Webapp: `localStorage` + cookie tecnico GitHub
Pages. Site vitrine: GoatCounter self-hosted (sem cookies, sem
fingerprinting).

## 11. Alteracoes

Notificacao via app (re-consent), banner site (30 dias), email
newsletter. Versoes anteriores em repo `lunapiena49/portfoliomanager-data`,
historico Git.

## 12. Contactos

- RGPD: `plurifin.app+gdpr@gmail.com`
- Privacidade: `plurifin.app+privacy@gmail.com`
- Suporte: `plurifin.app+support@gmail.com`
- Publico Play Store: `plurifin.app@gmail.com`

## 13. Jurisdicao e lei aplicavel

Lei italiana e RGPD. Para consumidores: foro do consumidor segundo
D.Lgs. 206/2005 (Italia) ou regras nacionais mais protetoras.
