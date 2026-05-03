# Modelo DMCA / Takedown -- PluriFin

**Versao**: 1.0.0
**Ultima atualizacao**: 2026-05-02

Modelos para gerir:

1. **Notices recebidas**: terceiro alega violacao (raro, app sem
   conteudo user-generated).
2. **Notices enviadas**: PluriFin denuncia clones, forks, violacoes de
   marca ou codigo.
3. **Counter-notices**: contranotificacao por remocao contestada.

Referencias:
- DMCA (17 U.S.C. § 512) para plataformas USA
- Diretiva UE 2019/790 + IT D.Lgs. 177/2021 para plataformas UE
- Codice Civile italiano arts. 2598 (concorrencia desleal), 2569+
  (marca registada) apos deposito EUIPO

---

## 1. Notice recebida

### 1.1 Procedimento

1. **Nao responder de imediato**. Conservar tudo.
2. Issue privada em `portfolio-manager-app` label `legal-incoming`.
3. Verificar origem (commits, assets), licencas, fair use.
4. Se fundamentada: remover e responder com modelo 1.3.
5. Se infundada: responder com modelo 1.4.
6. Se via plataforma host: usar tambem o counter-notice form.

### 1.2 Modelo -- pretensao fundamentada

```
Assunto: Re: <assunto>

Caro/a <requerente>,

Recebi a sua comunicacao de <data> sobre <descricao material>. Apos
verificacao, removi o material em <data remocao>.

Referencia commit / acao: <hash ou link>

Pecas desculpa. Permanece a disposicao.

Cumprimentos,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

### 1.3 Modelo -- pretensao infundada

```
Assunto: Re: <assunto>

Caro/a <requerente>,

Apos verificacao contesto as suas afirmacoes pelos seguintes motivos:

1. <motivo, ex.: material original meu, ver commit <hash> de <data>>
2. <motivo, ex.: coberto por fair use sob...>
3. <motivo, ex.: licenca <X> respeitada com atribuicao>

Peco prova dos seus direitos e dano alegado em 30 dias. Sem
documentacao, considero o assunto encerrado.

Cumprimentos,
Filippo Salemi
PluriFin
plurifin.app+legal@gmail.com
```

---

## 2. Notice enviada -- DMCA plataforma USA

### 2.1 Quando

- Fork GitHub publico que redistribui codigo proprietario
- Clone Play Store com mesmo nome/logo/screenshots
- Site web copia substancial do marketing site
- APKs modificados de Portfolio Manager
- Reproducao nao autorizada de blog ou press kit

### 2.2 Modelo DMCA (ingles, 17 U.S.C. § 512(c)(3))

```
DIGITAL MILLENNIUM COPYRIGHT ACT TAKEDOWN NOTICE

To Whom It May Concern,

I am the copyright owner of "Portfolio Manager" by PluriFin, with
official site https://lunapiena49.github.io/portfoliomanager-data/ and
authoritative Play Store listing
https://play.google.com/store/apps/details?id=app.plurifin.portfoliomanager

INFRINGING MATERIAL:
- <full URL>
- <description>

CONTACT:
Name: Filippo Salemi
Brand: PluriFin
Country: Italy
Email: plurifin.app+legal@gmail.com

I have a good faith belief that the use is not authorized. I swear under
penalty of perjury that this notice is accurate and I am the rights
owner.

/s/ Filippo Salemi
Date: <YYYY-MM-DD>
```

### 2.3 Onde enviar

- GitHub: <https://github.com/contact/dmca>
- Google Play: <https://support.google.com/legal/answer/3463191>
- Cloudflare: <https://abuse.cloudflare.com/>
- AWS: abuse@amazonaws.com

### 2.4 Provas

Screenshots, copia notice, resposta provider. Pasta local
`Plurifin/Legal/Takedowns/<YYYY>/<case-id>/`, fora repo.

---

## 3. Notice enviada -- host UE (italiano)

Ver `legal/dmca_template.md` IT, seccao 3.

## 4. Counter-notice

### 4.1 DMCA counter-notice (ingles)

```
DMCA COUNTER-NOTICE

To Whom It May Concern,

I am responding to a DMCA takedown notice that resulted in removal of
my content. I assert in good faith the material was removed by mistake
or misidentification.

REMOVED MATERIAL:
URL: <URL>
Description: <description>

I swear under penalty of perjury this belief is in good faith.

JURISDICTION: I consent to Federal District Court in my address district
or, if outside US, Northern District of California.

CONTACT:
Name: Filippo Salemi
Address: <complete address>
Phone: <phone>
Email: plurifin.app+legal@gmail.com

/s/ Filippo Salemi
Date: <YYYY-MM-DD>
```

## 5. Notas operacionais

- **Agir**: so violacoes evidentes e materiais
- **Nao agir**: criticas, comparacoes, screenshots imprensa (fair use)
- **Custos**: gratuito para o titular. So se processo civil ~ EUR
  200-500 primeira consulta legal.
- **EUIPO marca**: apos deposito classes 9+36, Reg. UE 2017/1001
  oferece protecao mais incisiva.
- **Documentacao**: registo em `marketing/legal_actions.md` ao primeiro
  caso real.

## 6. Jurisdicao

- Italia: foro consumidor / geral civil
- USA: Northern District of California por defeito
- Outros UE: Reg. UE 1215/2012 (Bruxelas I-bis)

## 7. Atualizacoes

Documento a atualizar para: alteracoes normativas UE/IT, primeiro caso
real, deposito marca EUIPO PluriFin.
