# Disclaimer Financiero -- Portfolio Manager by PluriFin

**Versión**: 1.0.0
**Última actualización**: 2026-05-02
**Idioma original**: Italiano (versión vinculante para la jurisdicción)

---

> **AVISO IMPORTANTE -- LEER ANTES DE USAR LA APP**
>
> Portfolio Manager es una herramienta informativa. La información, datos,
> gráficos, sugerencias de rebalanceo y análisis IA mostrados **NO
> constituyen en absoluto asesoramiento financiero, recomendación de
> inversión, captación pública del ahorro ni servicio de inversión** según
> el TUF italiano (D.Lgs. 58/1998), MiFID II (Directiva 2014/65/UE) y
> normativas equivalentes nacionales. El Usuario asume la responsabilidad
> exclusiva de sus decisiones de inversión.

---

## 1. Naturaleza informativa

Todo lo que muestra la App tiene **fin exclusivamente informativo,
descriptivo y educativo**. La App **no**:

- Da consejos personalizados de inversión
- Sugiere instrumentos u operaciones específicas
- Opina sobre idoneidad para situación patrimonial / objetivos / tolerancia
  al riesgo
- Ejecuta órdenes ni se relaciona con brokers
- Custodia fondos o instrumentos

## 2. Referencias normativas

- **Art. 1.5-septies TUF**: definición de "consulenza in materia di
  investimenti". La App **no** entra en esta definición.
- **Art. 18-bis y 18-ter TUF**: reserva a personas inscritas en el OCF.
  PluriFin/Filippo Salemi **no está inscrito**.
- **Art. 1.5.d TUF**: gestión de carteras. La App **no gestiona**, solo
  muestra datos del Usuario.
- **MiFID II y MiFIR**: la App no presta servicios reservados.
- **Reg. UE 2017/565**: la App no está sujeta a evaluación de
  idoneidad/conveniencia, ya que no presta servicios.

## 3. Análisis IA -- advertencias específicas

### 3.1 Modelo probabilístico

LLMs generan texto **probabilísticamente**. Misma pregunta -> respuestas
distintas.

### 3.2 Alucinaciones

Pueden producir **afirmaciones falsas pero plausibles** sobre nombres de
instrumentos, ISINs, performance histórica, dividendos, normas fiscales,
composición de índices, fechas de stacco cedola. **Verificar siempre**
con fuentes oficiales.

### 3.3 Cutoff temporal

Modelo no conoce eventos posteriores a su fecha de cutoff.

### 3.4 Sin recomendaciones personalizadas

Aunque el prompt incluya la cartera, las respuestas IA **no son
asesoramiento personalizado**: el modelo no conoce situación patrimonial,
ingresos, liquidez, horizonte, riesgo, fiscalidad, objetivos
pensionarios.

### 3.5 Sin "Know Your Customer"

App no recoge perfil de riesgo. No está sujeta a evaluación MiFID II de
idoneidad/conveniencia.

## 4. Sugerencias de rebalanceo

Cálculos aritméticos sobre parámetros user-defined. **No son
recomendaciones** de compra/venta. La App no evalúa: timing de mercado,
impacto fiscal, costes de transacción, liquidez, concentración. Consultar
**asesor financiero autorizado**.

## 5. Datos de mercado

Datos de fuentes públicas o EODHD/FMP (claves del Usuario). Pueden
estar retrasados 15-20 min, contener errores en splits/dividendos/ticker
changes. PluriFin no se responsabiliza.

## 6. Cálculos fiscales

App **no calcula** fiscalidad. Las plusvalías/minusvalías mostradas son
cálculos brutos sin considerar: tributación, bollo titoli (Italia),
IVAFE, deducciones, holding period, tratamiento UCITS/no-UCITS, herencia.
Consultar **asesor fiscal o gestor**.

## 7. Mercados extranjeros y divisas

Considerar: riesgo cambio, costes conversión, doble imposición (W-8BEN
USA), reporting activos en el extranjero, residencia fiscal. App **no
modela** ninguno.

## 8. Seguridad personal

- Claves API en keystore SO -> accesibles si dispositivo desbloqueado
- Dispositivo perdido bloqueado: protegido; desbloqueado: expone datos
- Backups Google Drive desactivados por defecto

PluriFin no responde por: robo/pérdida con desbloqueo, mala configuración
lock, compromiso device, compartición de claves API, exportación manual y
distribución descontrolada.

## 9. Actualizaciones normativas

Normas fiscales y regulatorias **cambian frecuentemente**. App no
garantiza que cálculos, ejemplos o respuestas IA estén actualizados.
Verificar normativa vigente.

## 10. Decisiones del Usuario -- exoneración

El Usuario declara y acepta que:

1. Uso de App, datos y análisis es a su exclusiva iniciativa y riesgo
2. Decisiones de inversión son **exclusivamente suyas**
3. PluriFin no responde, en límites legales, por pérdidas o consecuencias
   fiscales del uso
4. Para decisiones relevantes consultará **asesor financiero autorizado**
   (OCF: <https://www.organismocf.it> o equivalente nacional)

## 11. Menores

App **no destinada a menores de 18**. Content rating Play "Everyone /
18+". Padres/tutores responsables.

## 12. Geolocalización

App diseñada para mercado italiano y eurozona. Usuarios fuera deben
verificar conformidad local. PluriFin no responde por interpretaciones
divergentes.

## 13. Aceptación explícita

Aceptando este Disclaimer en primer arranque (o tras bump versión), el
Usuario declara haber leído, comprendido la naturaleza informativa, las
limitaciones IA, y libera a PluriFin/Filippo Salemi en límites legales.

Aceptación registrada en `consent_box` cifrado (timestamp UTC, versión,
hash SHA-256 texto).

Sin aceptación: rebalanceo, IA e import bloqueados; solo lectura legales
y settings.

## 14. Jurisdicción

Ley italiana. Disputas: véase ToS.

## 15. Contactos

`plurifin.app+legal@gmail.com`. PluriFin **no presta asesoramiento
financiero por email**. Para eso, asesor autorizado (OCF o equivalente).
