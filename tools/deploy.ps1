# Deploy the site to the DigitalOcean server.
#
#   powershell -File tools\deploy.ps1
#
# Copies only the public files (no Assets/, tools/, notes or *.local.md) into
# /var/www/allinfitness/site (nginx root). Files go to a staging folder first and are swapped in with
# two renames, so visitors never see a half-copied site and deleted images go away.
# Run `py -3 tools/prerender.py` before deploying so index.html is current.

param(
    [string]$Server = "deployer@165.22.21.95",
    [string]$Key = "$env:USERPROFILE\.ssh\digitalocean_bixbo",
    [string]$Target = "/var/www/allinfitness/site"
)

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

$files = @("index.html", "styles.css", "app.js", "data.js", "llms.txt", "img")
foreach ($f in $files) {
    if (-not (Test-Path $f)) { throw "Missing $f. Run from the repo and prerender first." }
}

$archive = Join-Path $env:TEMP "allinfitness-deploy.tar"
tar -cf $archive @files
if ($LASTEXITCODE -ne 0) { throw "tar failed" }

$remote = "set -e; rm -rf $Target.new $Target.old; mkdir $Target.new; " +
          "tar -xf - -C $Target.new; chmod -R a+rX $Target.new; " +
          "if [ -d $Target ]; then mv $Target $Target.old; fi; " +
          "mv $Target.new $Target; rm -rf $Target.old; echo DEPLOYED"

cmd /c "ssh -i `"$Key`" -o BatchMode=yes $Server `"$remote`" < `"$archive`""
if ($LASTEXITCODE -ne 0) { throw "ssh failed" }
Remove-Item $archive
