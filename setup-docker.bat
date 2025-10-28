@echo off
echo 🐍 Setting up Python Code Runner with Docker...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo ✅ Docker is installed and running

REM Build the Python code runner image
echo 🔨 Building Python code runner Docker image...
docker build -t python-code-runner .

if errorlevel 1 (
    echo ❌ Failed to build Docker image
    pause
    exit /b 1
)

echo ✅ Docker image built successfully

REM Test the container
echo 🧪 Testing Python execution...
echo print("Hello from Docker Python!") > temp_test.py

docker run --rm --network none --memory 128m --cpus="0.5" --user 1000:1000 --read-only --tmpfs /tmp:noexec,nosuid,size=10m -v "%cd%/temp_test.py:/app/code.py:ro" python-code-runner timeout 10s python /app/code.py

if errorlevel 1 (
    echo ❌ Python execution test failed
) else (
    echo ✅ Python execution test successful
)

REM Cleanup
del temp_test.py >nul 2>&1

echo 🎉 Setup complete! The Python code runner is ready to use.
echo 📚 Your educational platform now supports real Python execution with:
echo    - Secure Docker sandboxing
echo    - Memory and CPU limits  
echo    - Network isolation
echo    - Timeout protection
echo    - numpy, pandas, matplotlib support

pause