# Financial Disclaimer -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Last update**: 2026-05-02
**Original language**: Italian (binding version for jurisdiction)

---

> **IMPORTANT NOTICE -- READ BEFORE USING THE APP**
>
> The **Portfolio Manager** App by PluriFin is a personal informational
> tool. The information, data, charts, rebalancing suggestions and AI
> analyses shown **DO NOT in any way constitute financial advice,
> investment recommendation, public solicitation of savings or
> investment service** under the Italian Consolidated Law on Finance
> (TUF, D.Lgs. 58/1998) and the EU MiFID II Directive (2014/65/EU). The
> User assumes sole responsibility for their investment decisions.

---

## 1. Informational nature of the App

Everything the App shows the User -- positions, market prices, historical
performance, allocation, AI analyses, rebalancing suggestions -- has
**purely informational, descriptive and educational** purpose.

The App does **not**:

- Provide personalized investment advice
- Recommend specific financial instruments or specific trades
- Express opinions on the suitability of an investment for the User's
  patrimonial situation, goals or risk tolerance
- Execute orders, nor have relationships with brokers or intermediaries
- Hold User funds or financial instruments

## 2. Regulatory references

In particular:

- **Art. 1 paragraph 5-septies TUF** (D.Lgs. 24 February 1998 no. 58):
  defines "investment advice" as a personalized recommendation regarding a
  specific financial-instrument transaction, given on the provider's
  initiative or at the client's request. **The App does not fall within
  this definition.**
- **Art. 18-bis and 18-ter TUF**: reservation to natural persons enrolled
  in the OCF Register and to authorized financial advisors. **PluriFin /
  Filippo Salemi is not enrolled in the OCF Register and does not act in
  that capacity.**
- **Art. 1 paragraph 5(d) TUF**: portfolio management. **The App does
  not manage portfolios; it only shows User-entered data.**
- **MiFID II (Directive 2014/65/EU)** and **MiFIR (Regulation EU
  600/2014)**: the App provides no reserved investment services.
- **Regulation (EU) 2017/565**: the App is not subject to suitability
  or appropriateness assessment, since it offers no investment services.

## 3. AI analyses -- specific warnings

When the User uses the "AI Analysis" or "AI Chat" feature (powered by
Google Gemini), the User must be aware that:

### 3.1 Probabilistic, not deterministic model

Large language models (LLMs) generate text **probabilistically**. The
same question can produce different answers. Answers are not the result
of rigorous quantitative analysis but of plausible textual generation
based on the training corpus statistics.

### 3.2 Hallucinations

AI models may produce **false but plausible statements**
("hallucinations"), particularly regarding:

- Names of financial instruments, tickers, ISINs
- Historical performance, dividends, maturities
- Tax rules (rates, brackets, deadlines, exemptions)
- Composition of indices, ETFs, funds
- Ex-dividend dates, corporate events

The User must **verify every model statement** against official sources
(KIID, prospectuses, broker sites, Borsa Italiana, EDGAR SEC, ESMA)
before any decision.

### 3.3 Knowledge cutoff

The AI model has a "cutoff" date beyond which it does not know recent
events. It cannot know current prices, recent central bank decisions or
intraday market events.

### 3.4 No personalized recommendations

Even when the prompt includes the User's portfolio, AI responses **are
not personalized advice**: the model does not know the User's overall
patrimonial situation, income, liquidity needs, time horizon, risk
tolerance, specific tax situation, retirement goals. Even when phrasing
sounds advisory, the output remains generic text, not a professional
opinion.

### 3.5 No "Know Your Customer"

The App does not collect the User's risk profile, investment experience,
financial situation or goals: it does not fall under MiFID II
suitability/appropriateness because it provides **no investment service**.
A fortiori, AI analyses cannot be considered suitable or appropriate for
the individual User.

## 4. Rebalancing suggestions

The App automatically computes the difference between current portfolio
allocation and User-defined target allocation, displaying the "deltas"
needed to bring the portfolio back to target.

These calculations **are not buy/sell recommendations**. They are simple
arithmetic operations on User-chosen parameters. The App does not
evaluate:

- Market timing
- Tax impact (capital gains, losses, holding period)
- Broker transaction costs
- Instrument liquidity
- Impact on client / sector / country / currency concentration risk

The User must consult an **authorized financial advisor** before executing
any transaction based on the displayed deltas.

## 5. Market data

Prices, performance and historical data shown come from public sources or
third-party providers (EODHD, FMP) activated by the User with their own
API keys. Such data:

- May be delayed 15-20 minutes vs. live market (delayed quotes), unless
  real-time subscriptions paid directly to the provider
- May contain errors, gaps, mismatches on splits, dividends,
  consolidations, ticker changes
- Are valid only at the time of display and constitute no legal proof of
  any transaction

The App accepts no responsibility for third-party data errors or delays.

## 6. Tax calculations

The App **does not compute** the User's taxes. Any gain/loss shown is a
**raw arithmetic calculation** (current price - average price) * quantity
that does not consider:

- Capital-gain taxation (26%, 12.5% for Italian government bonds and
  similar, etc.)
- Stamp duty on securities (0.2% per year)
- IVAFE on assets held abroad
- Deductions, loss carry-forward (4 years in Italy)
- Holding period for special regimes (PIR, pension funds, etc.)
- UCITS vs non-UCITS ETF treatment, "harmonized" vs "non-harmonized"
- Inheritance, gift tax

For tax declarations, the User must consult an **accountant** or
authorized fiscal assistance center (CAF).

## 7. Foreign markets and currencies

For investments in foreign markets or non-EUR currency, the User must
consider:

- Exchange-rate risk
- Broker conversion fees
- Double taxation (Italy treaties, W-8BEN form for US)
- Reporting of assets abroad (Quadro RW)
- Tax-residence regulations

The App **models none** of these aspects.

## 8. Personal security

The User is warned that:

- **API keys** entered for AI or real-time prices are saved in the OS
  keystore but accessible to whoever has physical access to the unlocked
  device
- A **lost or stolen device** if locked is protected by platform measures;
  unlocked it could expose portfolio data
- **Google Drive backups** are disabled by default but the user might
  accidentally enable them

PluriFin is not responsible for losses or unauthorized access from:

- Theft / loss of unlocked device
- Lock-screen misconfiguration
- Device compromise (root, jailbreak, malware)
- Sharing your API keys with third parties
- Manual data export and subsequent uncontrolled distribution

## 9. Regulatory updates

Italian and EU tax / regulatory rules **change frequently**. The App does
not guarantee that calculations, examples shown or AI responses are
up-to-date with the latest changes.

The User must verify the regulation in force at the time of any
transaction.

## 10. User decisions -- liability waiver

The User **declares and accepts** that:

1. Use of the App, data and analyses shown is at the User's exclusive
   initiative and risk
2. Investment decisions are and remain **exclusively the User's**
3. PluriFin is not liable, within legal limits, for capital losses,
   missed gains, missed opportunities or tax consequences from App use
4. For any significant investment decision the User will consult an
   **authorized financial advisor** registered with the OCF Register
   (<https://www.organismocf.it>) or a supervised intermediary

## 11. Minors

The App is **not intended for users under 18**. Play Store content
rating is "Everyone / 18+" as recommended for financial apps. Parents and
guardians are responsible for any access by minors; PluriFin cannot
verify the actual user's age.

## 12. Geolocation and markets

The App is designed for the Italian and Eurozone markets. Users in other
jurisdictions:

- Must verify that App use complies with local rules on personal financial
  services
- Must verify the applicable tax regime
- Assume full risk of divergent interpretations

PluriFin is not responsible for compliance with non-Italian / non-EU
rules.

## 13. Explicit acceptance

By accepting this Financial Disclaimer at first launch (or first launch
after a version bump), the User declares to:

- Have read and understood this Disclaimer in full
- Accept the App's informational nature
- Understand AI analyses are subject to errors and hallucinations
- Release PluriFin / Filippo Salemi from liability within the limits set
  out, to the maximum extent permitted by applicable law

Acceptance is recorded in the encrypted local `consent_box` (see
ConsentService) with UTC timestamp, document version and SHA-256 hash of
the accepted text.

Without acceptance, the App will not enable rebalancing, AI and import
features: only legal-document viewing and settings remain available.

## 14. Jurisdiction and applicable law

This Disclaimer is governed by **Italian law**. For disputes, the
provisions of the Terms of Service (`legal/terms_of_service.md`) apply.

## 15. Contacts

For clarification on this Disclaimer:

- Email: `plurifin.app+legal@gmail.com`

PluriFin **cannot provide financial advice via email** nor answer
queries about specific financial instruments. For that, an authorized
advisor is required (OCF Register: <https://www.organismocf.it>).
