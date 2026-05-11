# Política de Privacidade -- Portfolio Manager by PluriFin

**Versão**: 1.0.0
**Última atualização**: 2026-05-02
**Idioma original**: Italiano (versão vinculante para a jurisdição)

---

## 1. Responsável pelo tratamento

- **Nome**: Filippo Salemi
- **Forma jurídica**: pessoa física (programador independente)
- **Marca comercial**: PluriFin
- **País**: Itália
- **Email para pedidos RGPD e privacidade**: `plurifin.app+gdpr@gmail.com`
- **Email geral**: `plurifin.app@gmail.com`

Nenhum Encarregado de Proteção de Dados (DPO) designado: pessoa física
fora dos casos obrigatórios do art. 37 RGPD.

## 2. Resumo (TL;DR)

- Todos os dados de carteira (posições, transações, objetivos, definições)
  são **armazenados apenas no dispositivo do utilizador** em forma
  cifrada. Não recebidos nem armazenados em servidores PluriFin.
- App **não usa analytics de terceiros** (sem Google Analytics, Firebase,
  Facebook SDK, AppsFlyer, Sentry por defeito).
- App **não partilha dados com anunciantes**. Sem publicidade.
- **Funcionalidades opcionais** existem que, se ativadas, transmitem
  dados a subprocessadores de terceiros: IA Gemini, preços mercado em
  tempo real (EODHD/FMP), validação de subscrição (Cloudflare Worker).
  Cada uma requer ação explícita.
- Utilizador pode exportar e apagar todos os dados em qualquer momento
  pelas Definições, sem contactar o responsável.

## 3. Categorias de dados

### 3.1 Dados locais no dispositivo

Cifrados Hive AES-256 + chave no keystore do sistema:

| Categoria | Exemplos | Base jurídica | Conservação |
|---|---|---|---|
| Dados de carteira | nome, ticker, quantidade, preço médio, broker, data | art. 6.1.b RGPD | Até eliminação |
| Objetivos financeiros | título, valor, prazo, contribuições | art. 6.1.b RGPD | Até eliminação |
| Preferências | idioma, moeda, tema, notificações, modo demo | art. 6.1.b RGPD | Até desinstalação |
| Auditoria de consentimentos | timestamp, versão doc, decisão, hash texto | art. 6.1.c RGPD | Até eliminação |
| Chaves API do utilizador | chaves dos fornecedores ativados: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (introduzidas manualmente) | art. 6.1.b RGPD | Até remoção |

`flutter_secure_storage` (Android Keystore / iOS Keychain / DPAPI).

### 3.2 Dados via Play Store (Google)

PluriFin recebe apenas: `purchaseToken`, `productId`, `device_id_hash`
(HMAC-SHA256). PluriFin **não** recebe nome, email, morada, dados de
pagamento.

### 3.3 Validação subscrição (Cloudflare Worker)

Dados enviados: `device_id_hash`, `purchase_token`, `product_id`, JWT
assinado. Resposta: JWT Ed25519. Sem PII. Hash não identificável sem o
salt servidor.

### 3.4 Dados a Gemini (só se ativado)

Se utilizador introduz a chave Gemini e usa IA, o prompt (pergunta +
estrutura carteira anónima) é transmitido diretamente à Google Gemini.
Aplicam-se [Google Gemini API Terms](https://ai.google.dev/terms).

### 3.5 Dados aos fornecedores de mercado (só se ativado)

A app suporta 10 fornecedores de dados de mercado que o utilizador pode
configurar independentemente introduzindo a sua API key nas Definições.
Quando o utilizador pede uma atualização de preços, a app transmite os
tickers diretamente ao fornecedor escolhido. PluriFin não intermedia
nem armazena.

Fornecedores suportados e políticas de privacidade:

- [EODHD](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage](https://www.alphavantage.co/privacy/)
- [Twelve Data](https://twelvedata.com/privacy)
- [Finnhub](https://finnhub.io/privacy-policy)
- [Polygon.io](https://polygon.io/privacy)
- [Marketstack](https://marketstack.com/privacy)
- [Tiingo](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): download CSV público sem API key (a
  requisição HTTP vai diretamente do dispositivo à stooq.com)

Para cada fornecedor, a transmissão ocorre **só** se o utilizador:
1. introduziu a sua API key nas Definições (Stooq excluído, gratuito);
2. selecionou o fornecedor como ativo para o refresh.

O utilizador pode remover a chave ou desativar o fornecedor a qualquer
momento.

## 4. Subprocessadores

| Subprocessador | Finalidade | Dados | Quando |
|---|---|---|---|
| Google Play Billing | Pagamento subscrição | purchaseToken, productId | Só compra |
| Google Gemini API | Análise IA | Prompt + carteira anónima | Só ativação |
| EODHD | Preços real-time e históricos | Lista tickers | Só ativação |
| FMP | Preços real-time, fundamentais | Lista tickers | Só ativação |
| Alpha Vantage | Preços históricos | Lista tickers | Só ativação |
| Twelve Data | Preços real-time e históricos | Lista tickers | Só ativação |
| Finnhub | Preços real-time | Lista tickers | Só ativação |
| Polygon.io | Preços históricos | Lista tickers | Só ativação |
| Marketstack | Preços end-of-day | Lista tickers | Só ativação |
| Tiingo | Preços real-time e históricos | Lista tickers | Só ativação |
| Nasdaq Data Link | Preços históricos | Lista tickers | Só ativação |
| Stooq | Download CSV público preços históricos | Lista tickers (sem API key) | Só ativação Stooq |
| Cloudflare Worker | Validação subscrição | device_id_hash, JWT | Sempre (gating) |
| GitHub Pages | Hosting | IP HTTP request | Cada visita |

## 5. Transferências fora da UE

Google, Cloudflare, GitHub: empresas USA. Bases:

- Cláusulas Contratuais Tipo UE 2021/914
- EU-US Data Privacy Framework (Google)
- Políticas próprias (EODHD, FMP)

Quem não quer transferências fora UE: não ativar funções opcionais.

## 6. Direitos do titular (arts. 15-22 RGPD)

| Direito | Como exercer |
|---|---|
| Acesso | Definições > Privacidade > Exportar os meus dados (ZIP) |
| Retificação | Edição direta na app |
| Apagamento | Definições > Privacidade > Apagar todos os dados / desinstalar |
| Limitação | Desativar funções opcionais |
| Portabilidade | Definições > Exportar (JSON+CSV) |
| Oposição | Desativar funções opcionais |
| Reclamação | [Garante (Itália)](https://www.garanteprivacy.it/), CNPD (Portugal) ou autoridade nacional |

Pedidos: `plurifin.app+gdpr@gmail.com`. Resposta em 30 dias (art. 12.3
RGPD).

## 7. Conservação

Dados locais até eliminação pelo utilizador. Auditoria consentimentos:
até exportação e eliminação explícitas. Subprocessadores: política
própria.

## 8. Segurança

- Hive AES-256 + HMAC-SHA256
- `flutter_secure_storage`
- HTTPS apenas (TLS 1.2+)
- `FLAG_SECURE` Android nas páginas sensíveis
- `allowBackup=false`
- Deteção root/jailbreak com degradação graceful
- Obfuscation Dart em releases

## 9. Menores (art. 8 RGPD)

App não destinada a menores de 18 anos. Content rating Play "18+".
Pais/tutores podem pedir eliminação em `plurifin.app+gdpr@gmail.com`.

## 10. Cookies

App móvel: nenhum cookie. Webapp: `localStorage` + cookie técnico GitHub
Pages. Site vitrine: GoatCounter self-hosted (sem cookies, sem
fingerprinting).

## 11. Alterações

Notificação via app (re-consent), banner site (30 dias), email
newsletter. Versões anteriores em repo `lunapiena49/portfoliomanager-data`,
histórico Git.

## 12. Contactos

- RGPD: `plurifin.app+gdpr@gmail.com`
- Privacidade: `plurifin.app+privacy@gmail.com`
- Suporte: `plurifin.app+support@gmail.com`
- Legal: `plurifin.app+legal@gmail.com`
- Público Play Store: `plurifin.app@gmail.com`

## 13. Jurisdição e lei aplicável

Lei italiana e RGPD. Para consumidores: foro do consumidor segundo
D.Lgs. 206/2005 (Itália) ou regras nacionais mais protetoras.
