$ErrorActionPreference = "Stop"

Write-Host "=== VALIDACION AGENDA CLARA V1 ===" -ForegroundColor Cyan

# Confirmar la rama
$rama = git branch --show-current

if ($rama -ne "develop") {
    throw "Debes ejecutar las pruebas desde la rama develop integrada. Rama actual: $rama"
}

# Instalar dependencias
npm ci

if ($LASTEXITCODE -ne 0) {
    throw "Fallo la instalacion de dependencias."
}

# Ejecutar pruebas
npm test

if ($LASTEXITCODE -ne 0) {
    throw "Las pruebas automatizadas fallaron."
}

Write-Host "Pruebas automatizadas completadas correctamente." -ForegroundColor Green
