#!/usr/bin/env pwsh
<#!
.SYNOPSIS
Downloads the latest market snapshot JSONs from the deployed site (GitHub
Pages behind plurifin.app) into dist/market-data.

.DESCRIPTION
S53 (2026-07-30) rewrite. The previous version could never work since the
public repo split/rename: it defaulted to -Repo "portfoliomanager" (the repo
is "portfoliomanager-data", so the base URL 404ed on the FIRST file) and it
listed daily_market.db.zip + market_history.db.zip, which are no longer on
Pages at all (404 measured): since W3.CF-BOT-V3/V4 (2026-05-07/08) the DB
travels through GitHub Actions ARTIFACTS (workflow market-data-snapshot.yml
in the PUBLIC repo restores it from the previous run), and the site-deploy
recomposition that wins the last-writer-race on Pages only carries the site
plus the two JSONs. With $ErrorActionPreference = "Stop" the old script died
before downloading anything: the local mirror stayed frozen at 2026-04-30
while CI published fresh data every night.

The app reads the JSONs; the DB is pipeline-internal. If you ever need the
DB locally: gh run download <run-id> --repo lunapiena49/portfoliomanager-data
--name github-pages, then extract market_history.db.zip from the artifact.

.EXAMPLE
./scripts/eodhd/sync_market_snapshot_from_pages.ps1
./scripts/eodhd/sync_market_snapshot_from_pages.ps1 -BaseUrl https://plurifin.app
#>
param(
    # Canonical served origin (Cloudflare -> GitHub Pages of the PUBLIC repo
    # lunapiena49/portfoliomanager-data). The truth is the page served to
    # users, so we sync from exactly what they receive.
    [string]$BaseUrl = "https://plurifin.app",
    [string]$OutputDir = "dist/market-data"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step([string]$message) {
    Write-Host "`n==> $message" -ForegroundColor Cyan
}

function Write-Ok([string]$message) {
    Write-Host "    OK: $message" -ForegroundColor Green
}

# Only what the deployment actually serves (probed 2026-07-30: the .db.zip
# pair returns 404 by design, see .DESCRIPTION).
$files = @(
    "top_movers.json",
    "prices_index.json"
)

Write-Step "Preparing output directory"
try {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
} catch {
    throw "Cannot create $OutputDir : $($_.Exception.Message)"
}
Write-Ok "Output: $OutputDir"

Write-Step "Downloading snapshot JSONs from $BaseUrl"
foreach ($file in $files) {
    $uri = "$BaseUrl/$file"
    $target = Join-Path $OutputDir $file
    # Download to a temp file first: a failed download must not truncate the
    # previous good copy in place.
    $tmp = "$target.download"
    Write-Host "  -> $uri"
    try {
        Invoke-WebRequest -Uri $uri -OutFile $tmp
    } catch {
        if (Test-Path $tmp) { Remove-Item $tmp -Force }
        throw "Download failed for $uri : $($_.Exception.Message)"
    }
    Move-Item -Path $tmp -Destination $target -Force
    $sizeMb = [Math]::Round(((Get-Item $target).Length / 1MB), 2)
    Write-Ok "$file ($sizeMb MB)"
}

# Honest closing line: report the freshness we just synced, so a stale feed
# is visible right here instead of being discovered sessions later.
$topMovers = Join-Path $OutputDir "top_movers.json"
try {
    $asOf = (Get-Content $topMovers -Raw | ConvertFrom-Json).as_of_date
    Write-Host "`n[done] Local snapshot synced. as_of_date: $asOf" -ForegroundColor Green
} catch {
    Write-Host "`n[done] Files downloaded, but as_of_date unreadable in top_movers.json" -ForegroundColor Yellow
}
