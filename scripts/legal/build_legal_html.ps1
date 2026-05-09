<#
.SYNOPSIS
    Builds the static HTML legal pages from legal/<lang>/*.md sources.

.DESCRIPTION
    Reads:
      legal/<doc>.md                         IT (root)
      legal/<lang>/<doc>.md                  EN/ES/FR/DE/PT
      where <doc> in { privacy_policy, terms_of_service,
                       disclaimer_financial, dmca_template }

    Writes:
      dist/legal/<lang>/<short>.html         per language + per doc
      dist/legal/<lang>/index.html           per language landing
      dist/legal/_styles.css                 shared minimal CSS
      dist/legal/index.html                  global root index

    Output naming map (URL CORTE, decisione utente 2026-05-04):
      privacy_policy        -> privacy.html
      terms_of_service      -> terms.html
      disclaimer_financial  -> disclaimer.html
      dmca_template         -> dmca.html

    Languages produced (6): it, en, es, fr, de, pt.
    Total HTML files written: 6 * 4 (docs) + 6 * 1 (index per lang) + 1 (root index) = 31.
    Of those, the 24 doc files are deployed under
    https://plurifin.app/legal/<lang>/<short>.html and linked in-app via
    LegalDocumentsPage (`legalUrl(langCode, file)` constant).

    Audit trail: also writes dist/legal/audit.json with sha256 of each .md
    so consent_service can verify the user accepted the exact text version.

.NOTES
    PowerShell 5.1, ASCII-only source (italic accents and special chars only
    inside the .md content, never in the script). Run from repo root:

        powershell -NoProfile -ExecutionPolicy Bypass -File scripts/legal/build_legal_html.ps1

    Idempotent. Overwrites previous outputs.
#>
[CmdletBinding()]
param(
    [string] $SourceDir = "legal",
    [string] $OutputDir = "dist/legal",
    [switch] $Clean
)

$ErrorActionPreference = "Stop"

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

$Languages = @(
    @{ code = "it"; name = "Italiano";   isRoot = $true  },
    @{ code = "en"; name = "English";    isRoot = $false },
    @{ code = "es"; name = "Espanol";    isRoot = $false },
    @{ code = "fr"; name = "Francais";   isRoot = $false },
    @{ code = "de"; name = "Deutsch";    isRoot = $false },
    @{ code = "pt"; name = "Portugues";  isRoot = $false }
)

# Map source basename -> (output basename, page title per lang)
$DocMap = @(
    @{
        source = "privacy_policy"
        output = "privacy"
        titles = @{
            it = "Privacy Policy"
            en = "Privacy Policy"
            es = "Politica de privacidad"
            fr = "Politique de confidentialite"
            de = "Datenschutzerklaerung"
            pt = "Politica de privacidade"
        }
    },
    @{
        source = "terms_of_service"
        output = "terms"
        titles = @{
            it = "Termini di Servizio"
            en = "Terms of Service"
            es = "Terminos del servicio"
            fr = "Conditions d'utilisation"
            de = "Nutzungsbedingungen"
            pt = "Termos de servico"
        }
    },
    @{
        source = "disclaimer_financial"
        output = "disclaimer"
        titles = @{
            it = "Disclaimer Finanziario"
            en = "Financial Disclaimer"
            es = "Aviso financiero"
            fr = "Avertissement financier"
            de = "Finanzhinweis"
            pt = "Aviso financeiro"
        }
    },
    @{
        source = "dmca_template"
        output = "dmca"
        titles = @{
            it = "DMCA / Takedown"
            en = "DMCA / Takedown"
            es = "DMCA / Retirada"
            fr = "DMCA / Retrait"
            de = "DMCA / Loeschung"
            pt = "DMCA / Remocao"
        }
    }
)

# CSS shared across all pages
$Css = @'
:root {
  --color-bg: #ffffff;
  --color-fg: #1a1a1a;
  --color-muted: #555;
  --color-link: #1E88E5;
  --color-link-hover: #00BFA5;
  --color-rule: #e6e6e6;
  --color-block-bg: #f6f7f9;
  --color-block-border: #d0d4da;
  --max-width: 760px;
  --radius: 6px;
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #111417;
    --color-fg: #e7eaee;
    --color-muted: #a8b0b8;
    --color-link: #4FC3F7;
    --color-link-hover: #80E8C4;
    --color-rule: #2a2f35;
    --color-block-bg: #1a1f25;
    --color-block-border: #2a2f35;
  }
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }

body {
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-text-size-adjust: 100%;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 32px 20px 96px;
}

header.site-header {
  border-bottom: 1px solid var(--color-rule);
  padding: 16px 20px;
  font-weight: 600;
}

header.site-header a {
  color: inherit;
  text-decoration: none;
}
header.site-header a.brand-link:hover {
  color: var(--color-link);
}
header.site-header a.back-home-btn {
  font-size: 0.9em;
  font-weight: 500;
  padding: 6px 12px;
  border: 1px solid var(--color-rule);
  border-radius: var(--radius);
  color: var(--color-link);
}
header.site-header a.back-home-btn:hover {
  background: var(--color-link);
  color: var(--color-bg);
}

nav.lang-switcher {
  margin: 12px 0 24px;
  font-size: 0.9em;
}
nav.lang-switcher a {
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid var(--color-rule);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--color-muted);
}
nav.lang-switcher a.active {
  border-color: var(--color-link);
  color: var(--color-link);
}

a { color: var(--color-link); text-decoration: underline; text-underline-offset: 2px; }
a:hover { color: var(--color-link-hover); }

h1 { font-size: 1.85em; line-height: 1.25; margin: 24px 0 16px; }
h2 { font-size: 1.4em;  line-height: 1.3;  margin: 28px 0 12px; border-bottom: 1px solid var(--color-rule); padding-bottom: 4px; }
h3 { font-size: 1.15em; line-height: 1.35; margin: 22px 0 10px; }
h4, h5, h6 { font-size: 1.0em; margin: 16px 0 8px; }

p { margin: 12px 0; }

ul, ol { margin: 12px 0 12px 24px; padding: 0; }
li { margin: 4px 0; }

blockquote {
  margin: 16px 0;
  padding: 8px 16px;
  border-left: 4px solid var(--color-link);
  background: var(--color-block-bg);
  border-radius: 0 var(--radius) var(--radius) 0;
  color: var(--color-muted);
}

code {
  font-family: var(--font-mono);
  font-size: 0.92em;
  background: var(--color-block-bg);
  padding: 1px 5px;
  border-radius: 4px;
}

pre {
  background: var(--color-block-bg);
  border: 1px solid var(--color-block-border);
  border-radius: var(--radius);
  padding: 12px 14px;
  overflow-x: auto;
  font-size: 0.9em;
}
pre code { background: transparent; padding: 0; }

table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
  font-size: 0.95em;
}
th, td {
  border: 1px solid var(--color-rule);
  padding: 6px 10px;
  vertical-align: top;
  text-align: left;
}
th { background: var(--color-block-bg); }

hr {
  border: 0;
  border-top: 1px solid var(--color-rule);
  margin: 32px 0;
}

footer.doc-footer {
  margin-top: 48px;
  padding-top: 16px;
  border-top: 1px solid var(--color-rule);
  font-size: 0.85em;
  color: var(--color-muted);
}
'@

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

function Resolve-SourcePath {
    param([string] $Lang, [string] $Slug)
    if ($Lang -eq "it") {
        return Join-Path $SourceDir "$Slug.md"
    } else {
        return Join-Path (Join-Path $SourceDir $Lang) "$Slug.md"
    }
}

function ConvertTo-Html {
    param([string] $Markdown)
    # Minimal markdown -> HTML converter sufficient for our legal docs.
    # NOT a general-purpose CommonMark parser. Supports:
    #   - headings (#, ##, ###, ####, #####, ######)
    #   - paragraphs
    #   - bold (**...**), italic (*...*)
    #   - inline code (`...`)
    #   - fenced code blocks (```...```)
    #   - bullet lists (- ...)
    #   - numbered lists (1. ...)
    #   - horizontal rule (---)
    #   - links [text](url)
    #   - blockquote (> ...)

    $lines = $Markdown -split "`r?`n"
    $html = New-Object System.Text.StringBuilder
    $i = 0
    $inUl = $false
    $inOl = $false
    $inPre = $false
    $inBq = $false

    function Close-Lists {
        param([System.Text.StringBuilder] $sb, [ref]$ulRef, [ref]$olRef)
        if ($ulRef.Value) { $sb.AppendLine("</ul>") | Out-Null; $ulRef.Value = $false }
        if ($olRef.Value) { $sb.AppendLine("</ol>") | Out-Null; $olRef.Value = $false }
    }

    function Format-Inline {
        param([string] $s)
        # Escape HTML first
        $s = $s -replace '&', '&amp;'
        $s = $s -replace '<', '&lt;'
        $s = $s -replace '>', '&gt;'
        # links [text](url)
        $s = [regex]::Replace($s, '\[([^\]]+)\]\(([^\)]+)\)', '<a href="$2">$1</a>')
        # bold then italic
        $s = [regex]::Replace($s, '\*\*([^\*]+)\*\*', '<strong>$1</strong>')
        $s = [regex]::Replace($s, '(?<!\*)\*([^\*]+)\*(?!\*)', '<em>$1</em>')
        # inline code
        $s = [regex]::Replace($s, '`([^`]+)`', '<code>$1</code>')
        return $s
    }

    while ($i -lt $lines.Length) {
        $line = $lines[$i]

        # fenced code blocks
        if ($line -match '^```') {
            if ($inPre) {
                $html.AppendLine("</code></pre>") | Out-Null
                $inPre = $false
            } else {
                Close-Lists $html ([ref]$inUl) ([ref]$inOl)
                $html.AppendLine('<pre><code>') | Out-Null
                $inPre = $true
            }
            $i++; continue
        }
        if ($inPre) {
            $escaped = $line -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;'
            $html.AppendLine($escaped) | Out-Null
            $i++; continue
        }

        # blank line
        if ($line -match '^\s*$') {
            Close-Lists $html ([ref]$inUl) ([ref]$inOl)
            if ($inBq) { $html.AppendLine("</blockquote>") | Out-Null; $inBq = $false }
            $i++; continue
        }

        # horizontal rule
        if ($line -match '^---+\s*$') {
            Close-Lists $html ([ref]$inUl) ([ref]$inOl)
            $html.AppendLine('<hr/>') | Out-Null
            $i++; continue
        }

        # blockquote
        if ($line -match '^>\s?(.*)$') {
            if (-not $inBq) { $html.AppendLine('<blockquote>') | Out-Null; $inBq = $true }
            $html.AppendLine("<p>" + (Format-Inline $Matches[1]) + "</p>") | Out-Null
            $i++; continue
        } elseif ($inBq) {
            $html.AppendLine("</blockquote>") | Out-Null; $inBq = $false
        }

        # headings
        if ($line -match '^(#{1,6})\s+(.+)$') {
            Close-Lists $html ([ref]$inUl) ([ref]$inOl)
            $level = $Matches[1].Length
            $text = Format-Inline $Matches[2]
            $html.AppendLine("<h$level>$text</h$level>") | Out-Null
            $i++; continue
        }

        # bullet list
        if ($line -match '^\s*-\s+(.+)$') {
            if ($inOl) { $html.AppendLine("</ol>") | Out-Null; $inOl = $false }
            if (-not $inUl) { $html.AppendLine('<ul>') | Out-Null; $inUl = $true }
            $html.AppendLine("<li>" + (Format-Inline $Matches[1]) + "</li>") | Out-Null
            $i++; continue
        }

        # numbered list
        if ($line -match '^\s*\d+\.\s+(.+)$') {
            if ($inUl) { $html.AppendLine("</ul>") | Out-Null; $inUl = $false }
            if (-not $inOl) { $html.AppendLine('<ol>') | Out-Null; $inOl = $true }
            $html.AppendLine("<li>" + (Format-Inline $Matches[1]) + "</li>") | Out-Null
            $i++; continue
        }

        # close any open list before paragraph
        Close-Lists $html ([ref]$inUl) ([ref]$inOl)

        # paragraph: accumulate consecutive non-blank lines
        $para = New-Object System.Collections.Generic.List[string]
        while ($i -lt $lines.Length -and $lines[$i] -notmatch '^\s*$' -and $lines[$i] -notmatch '^(#|>|---|\s*-\s|\s*\d+\.\s|```)') {
            $para.Add($lines[$i])
            $i++
        }
        if ($para.Count -gt 0) {
            $joined = ($para -join " ").Trim()
            $html.AppendLine("<p>" + (Format-Inline $joined) + "</p>") | Out-Null
        }
    }

    # cleanup trailing open blocks
    Close-Lists $html ([ref]$inUl) ([ref]$inOl)
    if ($inBq)  { $html.AppendLine("</blockquote>") | Out-Null }
    if ($inPre) { $html.AppendLine("</code></pre>") | Out-Null }

    return $html.ToString()
}

function Build-LangSwitcher {
    param(
        [string] $CurrentLang,
        [string] $OutputBasename
    )
    $sb = New-Object System.Text.StringBuilder
    foreach ($lang in $Languages) {
        $code = $lang.code
        $name = $lang.name
        $href = "../$code/$OutputBasename.html"
        if ($code -eq $CurrentLang) {
            $sb.AppendLine("<a class='active' href='$href' lang='$code'>$name</a>") | Out-Null
        } else {
            $sb.AppendLine("<a href='$href' lang='$code'>$name</a>") | Out-Null
        }
    }
    return $sb.ToString()
}

function Compute-Sha256 {
    param([string] $FilePath)
    $bytes = [System.IO.File]::ReadAllBytes($FilePath)
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        $hash = $sha.ComputeHash($bytes)
        return ($hash | ForEach-Object { $_.ToString("x2") }) -join ""
    } finally {
        $sha.Dispose()
    }
}

function Write-Page {
    param(
        [string] $Path,
        [string] $LangCode,
        [string] $Title,
        [string] $LangSwitcher,
        [string] $BodyHtml
    )
    $tpl = @"
<!DOCTYPE html>
<html lang="$LangCode">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>$Title -- PluriFin</title>
  <meta name="robots" content="index,follow" />
  <meta name="description" content="$Title -- Portfolio Manager by PluriFin." />
  <link rel="stylesheet" href="../_styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container" style="padding-top:0;padding-bottom:0; display:flex; align-items:center; gap:16px;">
      <a href="/" class="brand-link">PluriFin</a>
      <span style="color:var(--color-muted); margin:0 4px;">/</span>
      <a href="/legal/" class="brand-link">Legal</a>
      <span style="flex:1"></span>
      <a href="/" class="back-home-btn">&larr; Back to home</a>
    </div>
  </header>
  <main class="container">
    <nav class="lang-switcher" aria-label="Language switcher">
$LangSwitcher
    </nav>
$BodyHtml
    <footer class="doc-footer">
      <p><a href="./index.html">Index</a> | <a href="/legal/">All languages</a> | <a href="/">Back to PluriFin home</a></p>
    </footer>
  </main>
</body>
</html>
"@
    [System.IO.File]::WriteAllText($Path, $tpl, (New-Object System.Text.UTF8Encoding $false))
}

function Write-LangIndex {
    param(
        [string] $Path,
        [string] $LangCode,
        [string] $LangName
    )
    $items = New-Object System.Text.StringBuilder
    foreach ($doc in ($DocMap | Sort-Object { $_.output })) {
        $title = $doc.titles[$LangCode]
        $items.AppendLine("<li><a href='$($doc.output).html'>$title</a></li>") | Out-Null
    }
    $tpl = @"
<!DOCTYPE html>
<html lang="$LangCode">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PluriFin Legal -- $LangName</title>
  <link rel="stylesheet" href="../_styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container" style="padding-top:0;padding-bottom:0; display:flex; align-items:center; gap:16px;">
      <a href="/" class="brand-link">PluriFin</a>
      <span style="color:var(--color-muted); margin:0 4px;">/</span>
      <a href="/legal/" class="brand-link">Legal</a>
      <span style="flex:1"></span>
      <a href="/" class="back-home-btn">&larr; Back to home</a>
    </div>
  </header>
  <main class="container">
    <h1>$LangName</h1>
    <p>Legal documents for Portfolio Manager by PluriFin.</p>
    <ul>$($items.ToString())</ul>
    <footer class="doc-footer">
      <p><a href="/legal/">Back to all languages</a> | <a href="/">Back to PluriFin home</a></p>
    </footer>
  </main>
</body>
</html>
"@
    [System.IO.File]::WriteAllText($Path, $tpl, (New-Object System.Text.UTF8Encoding $false))
}

function Write-RootIndex {
    param([string] $Path)
    $items = New-Object System.Text.StringBuilder
    foreach ($lang in $Languages) {
        $items.AppendLine("<li><a href='$($lang.code)/index.html' lang='$($lang.code)'>$($lang.name)</a></li>") | Out-Null
    }
    $tpl = @"
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PluriFin Legal Documents</title>
  <link rel="stylesheet" href="_styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container" style="padding-top:0;padding-bottom:0; display:flex; align-items:center; gap:16px;">
      <a href="/" class="brand-link">PluriFin</a>
      <span style="color:var(--color-muted); margin:0 4px;">/</span>
      <span>Legal</span>
      <span style="flex:1"></span>
      <a href="/" class="back-home-btn">&larr; Back to home</a>
    </div>
  </header>
  <main class="container">
    <h1>Legal documents</h1>
    <p>Choose your language:</p>
    <ul>$($items.ToString())</ul>
    <footer class="doc-footer">
      <p><a href="/">Back to PluriFin home</a></p>
    </footer>
  </main>
</body>
</html>
"@
    [System.IO.File]::WriteAllText($Path, $tpl, (New-Object System.Text.UTF8Encoding $false))
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if (-not (Test-Path $SourceDir)) { throw "Source dir not found: $SourceDir" }

if ($Clean -and (Test-Path $OutputDir)) {
    Write-Host "[clean] removing $OutputDir"
    Remove-Item -Recurse -Force $OutputDir
}

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

# CSS
$cssPath = Join-Path $OutputDir "_styles.css"
[System.IO.File]::WriteAllText($cssPath, $Css, (New-Object System.Text.UTF8Encoding $false))
Write-Host "[css ] $cssPath"

# Audit trail accumulator
$audit = @{
    generated_at = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    docs = @{}
}

$total = 0
foreach ($lang in $Languages) {
    $code = $lang.code
    $name = $lang.name

    $langDir = Join-Path $OutputDir $code
    if (-not (Test-Path $langDir)) {
        New-Item -ItemType Directory -Path $langDir -Force | Out-Null
    }

    foreach ($doc in $DocMap) {
        $srcPath = Resolve-SourcePath $code $doc.source
        if (-not (Test-Path $srcPath)) {
            Write-Warning "[skip] $srcPath missing for lang=$code doc=$($doc.source)"
            continue
        }

        $md = [System.IO.File]::ReadAllText($srcPath)
        $body = ConvertTo-Html $md
        $title = $doc.titles[$code]
        $langSwitcher = Build-LangSwitcher $code $doc.output

        $outPath = Join-Path $langDir "$($doc.output).html"
        Write-Page $outPath $code $title $langSwitcher $body
        Write-Host "[doc ] $outPath"

        # audit
        $sha = Compute-Sha256 $srcPath
        if (-not $audit.docs.ContainsKey($doc.output)) {
            $audit.docs[$doc.output] = @{}
        }
        $audit.docs[$doc.output][$code] = @{
            source_path = $srcPath
            sha256 = $sha
            output_path = $outPath
        }

        $total++
    }

    # Per-language index
    $langIndexPath = Join-Path $langDir "index.html"
    Write-LangIndex $langIndexPath $code $name
    Write-Host "[idx ] $langIndexPath"
}

# Root index
$rootIndexPath = Join-Path $OutputDir "index.html"
Write-RootIndex $rootIndexPath
Write-Host "[idx ] $rootIndexPath"

# Audit JSON
$auditPath = Join-Path $OutputDir "audit.json"
$auditJson = $audit | ConvertTo-Json -Depth 6
[System.IO.File]::WriteAllText($auditPath, $auditJson, (New-Object System.Text.UTF8Encoding $false))
Write-Host "[audit] $auditPath"

Write-Host ""
Write-Host "[done] $total doc HTML files written under $OutputDir"
Write-Host "       Naming map applied: privacy_policy->privacy, terms_of_service->terms,"
Write-Host "                            disclaimer_financial->disclaimer, dmca_template->dmca."
Write-Host "       Deploy via portfoliomanager-data: copy $OutputDir/* into repo root dist/legal/"
