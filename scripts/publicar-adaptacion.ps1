$ErrorActionPreference = 'Stop'

function Invoke-Git([string[]]$GitArgs) {
    & git @GitArgs
    if ($LASTEXITCODE -ne 0) { throw "Falló: git $($GitArgs -join ' ')" }
}

$branch = (& git branch --show-current).Trim()
if ($LASTEXITCODE -ne 0) { throw 'No estás dentro de un repositorio Git.' }
if ($branch -ne 'feature/backend-api') {
    throw "Rama actual: '$branch'. Para evitar publicar sobre otra rama, cambia a feature/backend-api y vuelve a ejecutar el script."
}
if (-not ((& git remote) -contains 'origin')) { throw 'No se encontró el remoto origin.' }

Write-Host '1/7 Revisando pruebas antes de crear commits...' -ForegroundColor Cyan
& npm.cmd test
if ($LASTEXITCODE -ne 0) { throw 'Las pruebas fallaron. No se crearán commits.' }

Write-Host '2/7 Creando rama de adaptación...' -ForegroundColor Cyan
Invoke-Git @('switch', '-c', 'feature/adaptacion-servicios-reservas')
Remove-Item -Force -ErrorAction SilentlyContinue 'server/routes/productos.js', 'server/routes/pedidos.js'

Write-Host '3/7 Preparando solo archivos de código y pruebas...' -ForegroundColor Cyan
Invoke-Git @('add', 'server/app.js', 'server/database/schema.sql', 'server/database/connection.js', 'server/routes/clientes.js', 'server/routes/servicios.js', 'server/routes/reservas.js', 'src/index.html', 'src/css/estilos.css', 'tests/api.test.js', 'tests/servicios-reservas.test.js', 'package.json', 'package-lock.json', '.gitattributes')
Invoke-Git @('add', '-A', '--', 'server/routes/productos.js', 'server/routes/pedidos.js')
Invoke-Git @('diff', '--cached', '--check')
Invoke-Git @('status', '--short')
$confirm = Read-Host '¿Los archivos preparados son los esperados? Escribe SI para crear el commit de código'
if ($confirm -cne 'SI') { throw 'Cancelado por el usuario. No se creó el commit de código.' }
Invoke-Git @('commit', '-m', 'feat: adaptar sistema a clientes servicios y reservas')

Write-Host '4/7 Creando rama de documentación...' -ForegroundColor Cyan
Invoke-Git @('switch', '-c', 'docs/entrega-academica')
Invoke-Git @('add', 'README.md', 'docs/estrategia-ramas.md', 'docs/requerimientos-trazabilidad.md', 'docs/conflicto-git-plantilla.md', 'docs/versionado-v1.md', 'docs/tablero-actividades.csv', 'docs/matriz-trazabilidad.md', 'docs/informe-avance-02.md', 'docs/informe-avance-02.pdf', 'docs/api-rest.md', 'docs/incidencias.md', 'docs/resolucion-conflictos.md', 'docs/evidencias-carlos.md', 'RECUPERACION.md')
Invoke-Git @('add', 'scripts/publicar-adaptacion.ps1')
Invoke-Git @('diff', '--cached', '--check')
Invoke-Git @('status', '--short')
$confirmDocs = Read-Host '¿Los documentos preparados son los esperados? Escribe SI para crear el commit de documentación'
if ($confirmDocs -cne 'SI') { throw 'Código guardado en feature/adaptacion-servicios-reservas; documentación quedó sin commit.' }
Invoke-Git @('commit', '-m', 'docs: alinear entrega con sistema de reservas y trazabilidad')

Write-Host '5/7 Publicando rama de código...' -ForegroundColor Cyan
Invoke-Git @('push', '-u', 'origin', 'feature/adaptacion-servicios-reservas')
Write-Host '6/7 Publicando rama de documentación...' -ForegroundColor Cyan
Invoke-Git @('push', '-u', 'origin', 'docs/entrega-academica')
Write-Host '7/7 Finalizado. Crear primero PR de feature/adaptacion-servicios-reservas hacia develop; tras integrarla, crear PR de docs/entrega-academica hacia develop.' -ForegroundColor Green
