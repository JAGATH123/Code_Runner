@echo off
echo ========================================
echo  Docker Container Pool Cleanup
echo ========================================
echo.

echo Stopping all pool containers...
for /f %%i in ('docker ps -q --filter "name=pool-"') do (
    echo Stopping container %%i...
    docker stop -t 2 %%i 2>nul || docker kill %%i 2>nul
)

echo.
echo Removing all pool containers...
for /f %%i in ('docker ps -aq --filter "name=pool-"') do (
    echo Removing container %%i...
    docker rm -f %%i 2>nul
)

echo.
echo Checking remaining containers...
docker ps --filter "name=pool-" --format "table {{.Names}}\t{{.Status}}"

echo.
echo ========================================
echo  Cleanup Complete!
echo ========================================
echo.
echo Press any key to exit...
pause >nul
