# Disclaimer Financeiro -- Portfolio Manager by PluriFin

**Versão**: 1.0.0
**Última atualização**: 2026-05-02
**Idioma original**: Italiano (versão vinculante)

---

> **AVISO IMPORTANTE -- LEIA ANTES DE USAR A APP**
>
> Portfolio Manager é uma ferramenta informativa. As informações, dados,
> gráficos, sugestões de rebalanceamento e análises IA mostradas **NÃO
> constituem em caso algum consultoria financeira, recomendação de
> investimento, captação pública de poupança ou serviço de investimento**
> nos termos do TUF italiano (D.Lgs. 58/1998), MiFID II (Diretiva
> 2014/65/UE) e regras nacionais equivalentes. O Utilizador assume a
> exclusiva responsabilidade das suas decisões de investimento.

---

## 1. Natureza informativa

Tudo o que a App mostra tem **fim exclusivamente informativo, descritivo
e educativo**. A App **não**:

- Dá conselhos personalizados de investimento
- Sugere instrumentos ou operações específicas
- Opina sobre adequação à situação patrimonial / objetivos / tolerância
  ao risco
- Executa ordens nem se relaciona com brokers
- Custódia fundos ou instrumentos

## 2. Referências normativas

- **Art. 1.5-septies TUF**: definição "consulenza in materia di
  investimenti". App **não se enquadra**.
- **Art. 18-bis e 18-ter TUF**: reserva a inscritos no OCF.
  PluriFin/Filippo Salemi **não inscrito**.
- **Art. 1.5.d TUF**: gestão de carteiras. App **não gere**.
- **MiFID II e MiFIR**: app não presta serviços reservados.
- **Reg. UE 2017/565**: app não sujeita a avaliação de
  adequação/conveniência.

## 3. Análises IA -- avisos específicos

### 3.1 Modelo probabilístico

LLMs geram texto **probabilisticamente**. Mesma pergunta -> respostas
diferentes.

### 3.2 Alucinações

Podem produzir **afirmações falsas mas plausíveis** sobre nomes
instrumentos, ISINs, performance histórica, dividendos, regras fiscais,
composição índices, datas ex-dividendo. **Verificar sempre** com fontes
oficiais.

### 3.3 Cutoff temporal

Modelo não conhece eventos posteriores ao seu cutoff.

### 3.4 Sem recomendações personalizadas

Mesmo com prompt incluindo a carteira, respostas IA **não são consultoria
personalizada**: modelo não conhece situação patrimonial, rendimentos,
liquidez, horizonte, risco, fiscalidade, objetivos pensões.

### 3.5 Sem "Know Your Customer"

App não recolhe perfil de risco. Não sujeita a avaliação MiFID II de
adequação/conveniência.

## 4. Sugestões de rebalanceamento

Cálculos aritméticos sobre parâmetros user-defined. **Não são**
recomendações de compra/venda. App não avalia: timing mercado, impacto
fiscal, custos transação, liquidez, concentração. Consultar **consultor
financeiro autorizado**.

## 5. Dados de mercado

Dados de fontes públicas ou EODHD/FMP (chaves do utilizador). Possíveis
atrasos 15-20 min, erros em splits/dividendos/mudanças ticker. PluriFin
sem responsabilidade.

## 6. Cálculos fiscais

App **não calcula** fiscalidade. Mais-valias/menos-valias mostradas são
cálculos brutos sem considerar: tributação, bollo titoli (IT), IVAFE,
deduções, holding period, tratamento UCITS/não-UCITS, sucessão.
Consultar **TOC ou consultor fiscal**.

## 7. Mercados estrangeiros e divisas

Considerar: risco cambial, custos conversão, dupla tributação (W-8BEN
EUA), reporting ativos no estrangeiro, residência fiscal. App **não
modela** nenhum.

## 8. Segurança pessoal

- Chaves API no keystore SO -> acessíveis se dispositivo desbloqueado
- Dispositivo perdido bloqueado: protegido; desbloqueado: expõe dados
- Backups Google Drive desativados por defeito

PluriFin não responde por: roubo/perda com desbloqueio, má config lock,
comprometimento, partilha de chaves API, exportação manual e distribuição
descontrolada.

## 9. Atualizações normativas

Regras fiscais e regulatórias **mudam frequentemente**. App não garante
cálculos, exemplos ou respostas IA atualizados. Verificar regulação em
vigor.

## 10. Decisões do Utilizador -- exoneração

O Utilizador declara e aceita que:

1. Uso de App, dados e análises é a sua exclusiva iniciativa e risco
2. Decisões de investimento são **exclusivamente suas**
3. PluriFin não responde, nos limites legais, por perdas ou consequências
   fiscais
4. Para decisões relevantes consultará **consultor financeiro autorizado**
   (OCF: <https://www.organismocf.it> ou equivalente nacional)

## 11. Menores

App **não destinada a menores de 18**. Content rating Play "Everyone /
18+". Pais/tutores responsáveis.

## 12. Geolocalização

App pensada para mercado italiano e zona Euro. Utilizadores fora devem
verificar conformidade local. PluriFin não responde por interpretações
divergentes.

## 13. Aceitação explícita

Aceitando este Disclaimer no primeiro arranque (ou após bump versão), o
Utilizador declara ter lido, compreendido a natureza informativa, as
limitações IA, e libera PluriFin/Filippo Salemi nos limites legais.

Aceitação registada em `consent_box` cifrado (timestamp UTC, versão,
hash SHA-256 texto).

Sem aceitação: rebalanceamento, IA e import bloqueados; só leitura
legais e definições.

## 14. Jurisdição

Lei italiana. Disputas: ver ToS.

## 15. Contactos

`plurifin.app+legal@gmail.com`. PluriFin **não presta consultoria
financeira por email**. Para isso, consultor autorizado (OCF ou
equivalente).
