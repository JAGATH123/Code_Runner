@echo off
echo 🚀 Setting up GPU-enabled Python Code Runner with Docker...
echo.

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

REM Check NVIDIA GPU availability
nvidia-smi >nul 2>&1
if errorlevel 1 (
    echo ❌ NVIDIA drivers not found. Please install NVIDIA drivers first.
    echo    Visit: https://www.nvidia.com/download/index.aspx
    pause
    exit /b 1
)

echo ✅ NVIDIA drivers detected
nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv,noheader
echo.

REM Test Docker GPU access
echo 🧪 Testing Docker GPU access...
docker run --rm --gpus all nvidia/cuda:12.4.0-base-ubuntu22.04 nvidia-smi >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker cannot access GPU. Please ensure:
    echo    1. Docker Desktop WSL 2 backend is enabled
    echo    2. NVIDIA Container Toolkit is installed in WSL 2
    echo.
    echo See: https://docs.nvidia.com/cuda/wsl-user-guide/index.html
    pause
    exit /b 1
)

echo ✅ Docker GPU access confirmed
echo.

echo 🔨 Building CPU container image...
docker build -t python-code-runner -f Dockerfile .

if errorlevel 1 (
    echo ❌ Failed to build CPU Docker image
    pause
    exit /b 1
)

echo ✅ CPU Docker image built successfully
echo.

echo 🔨 Building GPU container image (this may take 5-10 minutes)...
docker build -t python-code-runner-gpu -f Dockerfile.gpu .

if errorlevel 1 (
    echo ❌ Failed to build GPU Docker image
    pause
    exit /b 1
)

echo ✅ GPU Docker image built successfully
echo.

REM Test CPU container
echo 🧪 Testing CPU execution...
echo print("Hello from CPU!") > temp_test_cpu.py

docker run --rm --network none --memory 128m --cpus="0.5" --user 1000:1000 --read-only --tmpfs /tmp:noexec,nosuid,size=10m -v "%cd%/temp_test_cpu.py:/app/code.py:ro" python-code-runner timeout 10s python /app/code.py

if errorlevel 1 (
    echo ❌ CPU execution test failed
) else (
    echo ✅ CPU execution test successful
)

del temp_test_cpu.py >nul 2>&1
echo.

REM Test GPU container
echo 🧪 Testing GPU execution...
(
echo import torch
echo print^(f"PyTorch version: {torch.__version__}"^)
echo print^(f"CUDA available: {torch.cuda.is_available^(^)}"^)
echo if torch.cuda.is_available^(^):
echo     print^(f"GPU: {torch.cuda.get_device_name^(0^)}"^)
echo     print^(f"CUDA version: {torch.version.cuda}"^)
echo     x = torch.rand^(3, 3^).cuda^(^)
echo     print^(f"Tensor on GPU: {x.device}"^)
echo     print^("✅ GPU tensor operation successful"^)
) > temp_test_gpu.py

docker run --rm --gpus all --network none --memory 2g --cpus="1.0" --user 1000:1000 --read-only --tmpfs /tmp:size=50m -v "%cd%/temp_test_gpu.py:/app/code.py:ro" python-code-runner-gpu timeout 30s python /app/code.py

if errorlevel 1 (
    echo ❌ GPU execution test failed
) else (
    echo ✅ GPU execution test successful
)

del temp_test_gpu.py >nul 2>&1
echo.

echo 🎉 Setup complete! Your Code Runner now supports:
echo    ✅ CPU execution (numpy, pandas, matplotlib, scikit-learn)
echo    ✅ GPU execution (PyTorch, TensorFlow, CuPy)
echo    ✅ Automatic GPU detection and routing
echo    ✅ Secure Docker sandboxing
echo    ✅ Resource limits and timeout protection
echo.
echo 📊 GPU Stats:
nvidia-smi --query-gpu=name,memory.total,memory.free --format=csv,noheader
echo.
echo 🚀 Start your application with: npm run dev
echo.
pause
