# Disclaimer Financeiro -- Portfolio Manager by PluriFin

**Versao**: 1.0.0
**Ultima atualizacao**: 2026-05-02
**Idioma original**: Italiano (versao vinculante)

---

> **AVISO IMPORTANTE -- LEIA ANTES DE USAR A APP**
>
> Portfolio Manager e uma ferramenta informativa. As informacoes, dados,
> graficos, sugestoes de rebalanceamento e analises IA mostradas **NAO
> constituem em caso algum consultoria financeira, recomendacao de
> investimento, captacao publica de poupanca ou servico de investimento**
> nos termos do TUF italiano (D.Lgs. 58/1998), MiFID II (Diretiva
> 2014/65/UE) e regras nacionais equivalentes. O Utilizador assume a
> exclusiva responsabilidade das suas decisoes de investimento.

---

## 1. Natureza informativa

Tudo o que a App mostra tem **fim exclusivamente informativo, descritivo
e educativo**. A App **nao**:

- Da conselhos personalizados de investimento
- Sugere instrumentos ou operacoes especificas
- Opina sobre adequacao a situacao patrimonial / objetivos / tolerancia
  ao risco
- Executa ordens nem se relaciona com brokers
- Custodia fundos ou instrumentos

## 2. Referencias normativas

- **Art. 1.5-septies TUF**: definicao "consulenza in materia di
  investimenti". App **nao se enquadra**.
- **Art. 18-bis e 18-ter TUF**: reserva a inscritos no OCF.
  PluriFin/Filippo Salemi **nao inscrito**.
- **Art. 1.5.d TUF**: gestao de carteiras. App **nao gere**.
- **MiFID II e MiFIR**: app nao presta servicos reservados.
- **Reg. UE 2017/565**: app nao sujeita a avaliacao de
  adequacao/conveniencia.

## 3. Analises IA -- avisos especificos

### 3.1 Modelo probabilistico

LLMs geram texto **probabilisticamente**. Mesma pergunta -> respostas
diferentes.

### 3.2 Alucinacoes

Podem produzir **afirmacoes falsas mas plausiveis** sobre nomes
instrumentos, ISINs, performance historica, dividendos, regras fiscais,
composicao indices, datas ex-dividendo. **Verificar sempre** com fontes
oficiais.

### 3.3 Cutoff temporal

Modelo nao conhece eventos posteriores ao seu cutoff.

### 3.4 Sem recomendacoes personalizadas

Mesmo com prompt incluindo a carteira, respostas IA **nao sao consultoria
personalizada**: modelo nao conhece situacao patrimonial, rendimentos,
liquidez, horizonte, risco, fiscalidade, objetivos pensoes.

### 3.5 Sem "Know Your Customer"

App nao recolhe perfil de risco. Nao sujeita a avaliacao MiFID II de
adequacao/conveniencia.

## 4. Sugestoes de rebalanceamento

Calculos aritmeticos sobre parametros user-defined. **Nao sao**
recomendacoes de compra/venda. App nao avalia: timing mercado, impacto
fiscal, custos transacao, liquidez, concentracao. Consultar **consultor
financeiro autorizado**.

## 5. Dados de mercado

Dados de fontes publicas ou EODHD/FMP (chaves do utilizador). Possiveis
atrasos 15-20 min, erros em splits/dividendos/mudancas ticker. PluriFin
sem responsabilidade.

## 6. Calculos fiscais

App **nao calcula** fiscalidade. Mais-valias/menos-valias mostradas sao
calculos brutos sem considerar: tributacao, bollo titoli (IT), IVAFE,
deducoes, holding period, tratamento UCITS/nao-UCITS, sucessao.
Consultar **TOC ou consultor fiscal**.

## 7. Mercados estrangeiros e divisas

Considerar: risco cambial, custos conversao, dupla tributacao (W-8BEN
EUA), reporting ativos no estrangeiro, residencia fiscal. App **nao
modela** nenhum.

## 8. Seguranca pessoal

- Chaves API no keystore SO -> acessiveis se dispositivo desbloqueado
- Dispositivo perdido bloqueado: protegido; desbloqueado: expoe dados
- Backups Google Drive desativados por defeito

PluriFin nao responde por: roubo/perda com desbloqueio, ma config lock,
comprometimento, partilha de chaves API, exportacao manual e distribuicao
descontrolada.

## 9. Atualizacoes normativas

Regras fiscais e regulatorias **mudam frequentemente**. App nao garante
calculos, exemplos ou respostas IA atualizados. Verificar regulacao em
vigor.

## 10. Decisoes do Utilizador -- exoneracao

O Utilizador declara e aceita que:

1. Uso de App, dados e analises e a sua exclusiva iniciativa e risco
2. Decisoes de investimento sao **exclusivamente suas**
3. PluriFin nao responde, nos limites legais, por perdas ou consequencias
   fiscais
4. Para decisoes relevantes consultara **consultor financeiro autorizado**
   (OCF: <https://www.organismocf.it> ou equivalente nacional)

## 11. Menores

App **nao destinada a menores de 18**. Content rating Play "Everyone /
18+". Pais/tutores responsaveis.

## 12. Geolocalizacao

App pensada para mercado italiano e zona Euro. Utilizadores fora devem
verificar conformidade local. PluriFin nao responde por interpretacoes
divergentes.

## 13. Aceitacao explicita

Aceitando este Disclaimer no primeiro arranque (ou apos bump versao), o
Utilizador declara ter lido, compreendido a natureza informativa, as
limitacoes IA, e libera PluriFin/Filippo Salemi nos limites legais.

Aceitacao registada em `consent_box` cifrado (timestamp UTC, versao,
hash SHA-256 texto).

Sem aceitacao: rebalanceamento, IA e import bloqueados; so leitura
legais e definicoes.

## 14. Jurisdicao

Lei italiana. Disputas: ver ToS.

## 15. Contactos

`plurifin.app+legal@gmail.com`. PluriFin **nao presta consultoria
financeira por email**. Para isso, consultor autorizado (OCF ou
equivalente).
