Write-Host "========================================"  -ForegroundColor Cyan
Write-Host " Docker Container Pool Cleanup"  -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$containers = docker ps -aq --filter "name=pool-"

if ($containers) {
    $count = ($containers | Measure-Object).Count
    Write-Host "Found $count pool containers" -ForegroundColor Yellow
    Write-Host ""

    Write-Host "Stopping and removing containers..." -ForegroundColor Yellow
    foreach ($container in $containers) {
        Write-Host "  Processing $($container.Substring(0,12))..." -NoNewline
        docker stop -t 2 $container 2>$null | Out-Null
        docker rm -f $container 2>$null | Out-Null
        Write-Host " Done" -ForegroundColor Green
    }
} else {
    Write-Host "No pool containers found" -ForegroundColor Green
}

Write-Host ""
Write-Host "Verifying cleanup..." -ForegroundColor Yellow
$remaining = docker ps -aq --filter "name=pool-"
if ($remaining) {
    $count = ($remaining | Measure-Object).Count
    Write-Host "WARNING: $count containers still remaining" -ForegroundColor Red
} else {
    Write-Host "All pool containers removed successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Cleanup Complete!"  -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
