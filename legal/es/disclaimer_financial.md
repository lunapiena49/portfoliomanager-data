# Disclaimer Financiero -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Ultima actualizacion**: 2026-05-02
**Idioma original**: Italiano (version vinculante para la jurisdiccion)

---

> **AVISO IMPORTANTE -- LEER ANTES DE USAR LA APP**
>
> Portfolio Manager es una herramienta informativa. La informacion, datos,
> graficos, sugerencias de rebalanceo y analisis IA mostrados **NO
> constituyen en absoluto asesoramiento financiero, recomendacion de
> inversion, captacion publica del ahorro ni servicio de inversion** segun
> el TUF italiano (D.Lgs. 58/1998), MiFID II (Directiva 2014/65/UE) y
> normativas equivalentes nacionales. El Usuario asume la responsabilidad
> exclusiva de sus decisiones de inversion.

---

## 1. Naturaleza informativa

Todo lo que muestra la App tiene **fin exclusivamente informativo,
descriptivo y educativo**. La App **no**:

- Da consejos personalizados de inversion
- Sugiere instrumentos u operaciones especificas
- Opina sobre idoneidad para situacion patrimonial / objetivos / tolerancia
  al riesgo
- Ejecuta ordenes ni se relaciona con brokers
- Custodia fondos o instrumentos

## 2. Referencias normativas

- **Art. 1.5-septies TUF**: definicion de "consulenza in materia di
  investimenti". La App **no** entra en esta definicion.
- **Art. 18-bis y 18-ter TUF**: reserva a personas inscritas en el OCF.
  PluriFin/Filippo Salemi **no esta inscrito**.
- **Art. 1.5.d TUF**: gestion de carteras. La App **no gestiona**, solo
  muestra datos del Usuario.
- **MiFID II y MiFIR**: la App no presta servicios reservados.
- **Reg. UE 2017/565**: la App no esta sujeta a evaluacion de
  idoneidad/conveniencia, ya que no presta servicios.

## 3. Analisis IA -- advertencias especificas

### 3.1 Modelo probabilistico

LLMs generan texto **probabilisticamente**. Misma pregunta -> respuestas
distintas.

### 3.2 Alucinaciones

Pueden producir **afirmaciones falsas pero plausibles** sobre nombres de
instrumentos, ISINs, performance historica, dividendos, normas fiscales,
composicion de indices, fechas de stacco cedola. **Verificar siempre**
con fuentes oficiales.

### 3.3 Cutoff temporal

Modelo no conoce eventos posteriores a su fecha de cutoff.

### 3.4 Sin recomendaciones personalizadas

Aunque el prompt incluya la cartera, las respuestas IA **no son
asesoramiento personalizado**: el modelo no conoce situacion patrimonial,
ingresos, liquidez, horizonte, riesgo, fiscalidad, objetivos
pensionarios.

### 3.5 Sin "Know Your Customer"

App no recoge perfil de riesgo. No esta sujeta a evaluacion MiFID II de
idoneidad/conveniencia.

## 4. Sugerencias de rebalanceo

Calculos aritmeticos sobre parametros user-defined. **No son
recomendaciones** de compra/venta. La App no evalua: timing de mercado,
impacto fiscal, costes de transaccion, liquidez, concentracion. Consultar
**asesor financiero autorizado**.

## 5. Datos de mercado

Datos de fuentes publicas o EODHD/FMP (claves del Usuario). Pueden
estar retrasados 15-20 min, contener errores en splits/dividendos/ticker
changes. PluriFin no se responsabiliza.

## 6. Calculos fiscales

App **no calcula** fiscalidad. Las plusvalias/minusvalias mostradas son
calculos brutos sin considerar: tributacion, bollo titoli (Italia),
IVAFE, deducciones, holding period, tratamiento UCITS/no-UCITS, herencia.
Consultar **asesor fiscal o gestor**.

## 7. Mercados extranjeros y divisas

Considerar: riesgo cambio, costes conversion, doble imposicion (W-8BEN
USA), reporting activos en el extranjero, residencia fiscal. App **no
modela** ninguno.

## 8. Seguridad personal

- Claves API en keystore SO -> accesibles si dispositivo desbloqueado
- Dispositivo perdido bloqueado: protegido; desbloqueado: expone datos
- Backups Google Drive desactivados por defecto

PluriFin no responde por: robo/perdida con desbloqueo, mala configuracion
lock, compromiso device, comparticion de claves API, exportacion manual y
distribucion descontrolada.

## 9. Actualizaciones normativas

Normas fiscales y regulatorias **cambian frecuentemente**. App no
garantiza que calculos, ejemplos o respuestas IA esten actualizados.
Verificar normativa vigente.

## 10. Decisiones del Usuario -- exoneracion

El Usuario declara y acepta que:

1. Uso de App, datos y analisis es a su exclusiva iniciativa y riesgo
2. Decisiones de inversion son **exclusivamente suyas**
3. PluriFin no responde, en limites legales, por perdidas o consecuencias
   fiscales del uso
4. Para decisiones relevantes consultara **asesor financiero autorizado**
   (OCF: <https://www.organismocf.it> o equivalente nacional)

## 11. Menores

App **no destinada a menores de 18**. Content rating Play "Everyone /
18+". Padres/tutores responsables.

## 12. Geolocalizacion

App disenada para mercado italiano y eurozona. Usuarios fuera deben
verificar conformidad local. PluriFin no responde por interpretaciones
divergentes.

## 13. Aceptacion explicita

Aceptando este Disclaimer en primer arranque (o tras bump version), el
Usuario declara haber leido, comprendido la naturaleza informativa, las
limitaciones IA, y libera a PluriFin/Filippo Salemi en limites legales.

Aceptacion registrada en `consent_box` cifrado (timestamp UTC, version,
hash SHA-256 texto).

Sin aceptacion: rebalanceo, IA e import bloqueados; solo lectura legales
y settings.

## 14. Jurisdiccion

Ley italiana. Disputas: vease ToS.

## 15. Contactos

`plurifin.app+legal@gmail.com`. PluriFin **no presta asesoramiento
financiero por email**. Para eso, asesor autorizado (OCF o equivalente).
