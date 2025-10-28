#!/bin/bash

# GPU-enabled Docker Python Code Runner Setup Script

echo "🚀 Setting up GPU-enabled Python Code Runner with Docker..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is installed and running"

# Check NVIDIA GPU availability
if ! command -v nvidia-smi &> /dev/null; then
    echo "❌ NVIDIA drivers not found. Please install NVIDIA drivers first."
    echo "   Visit: https://www.nvidia.com/download/index.aspx"
    exit 1
fi

echo "✅ NVIDIA drivers detected"
nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv,noheader
echo ""

# Test Docker GPU access
echo "🧪 Testing Docker GPU access..."
if docker run --rm --gpus all nvidia/cuda:12.4.0-base-ubuntu22.04 nvidia-smi &> /dev/null; then
    echo "✅ Docker GPU access confirmed"
else
    echo "❌ Docker cannot access GPU. Please ensure:"
    echo "   1. NVIDIA Container Toolkit is installed"
    echo "   2. Docker daemon is configured for GPU support"
    echo ""
    echo "Install NVIDIA Container Toolkit:"
    echo "   https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html"
    exit 1
fi

echo ""
echo "🔨 Building CPU container image..."
docker build -t python-code-runner -f Dockerfile .

if [ $? -eq 0 ]; then
    echo "✅ CPU Docker image built successfully"
else
    echo "❌ Failed to build CPU Docker image"
    exit 1
fi

echo ""
echo "🔨 Building GPU container image (this may take 5-10 minutes)..."
docker build -t python-code-runner-gpu -f Dockerfile.gpu .

if [ $? -eq 0 ]; then
    echo "✅ GPU Docker image built successfully"
else
    echo "❌ Failed to build GPU Docker image"
    exit 1
fi

# Test CPU container
echo ""
echo "🧪 Testing CPU execution..."
test_code='print("Hello from CPU!")'
echo "$test_code" > temp_test_cpu.py

docker run --rm \
    --network none \
    --memory 128m \
    --cpus="0.5" \
    --user 1000:1000 \
    --read-only \
    --tmpfs /tmp:noexec,nosuid,size=10m \
    -v "$(pwd)/temp_test_cpu.py:/app/code.py:ro" \
    python-code-runner \
    timeout 10s python /app/code.py

if [ $? -eq 0 ]; then
    echo "✅ CPU execution test successful"
else
    echo "❌ CPU execution test failed"
fi

rm -f temp_test_cpu.py

# Test GPU container
echo ""
echo "🧪 Testing GPU execution..."
gpu_test_code='
import torch
print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"CUDA version: {torch.version.cuda}")
    # Test tensor on GPU
    x = torch.rand(3, 3).cuda()
    print(f"Tensor on GPU: {x.device}")
    print("✅ GPU tensor operation successful")
else:
    print("⚠️ CUDA not available in container")
'
echo "$gpu_test_code" > temp_test_gpu.py

docker run --rm \
    --gpus all \
    --network none \
    --memory 2g \
    --cpus="1.0" \
    --user 1000:1000 \
    --read-only \
    --tmpfs /tmp:size=50m \
    -v "$(pwd)/temp_test_gpu.py:/app/code.py:ro" \
    python-code-runner-gpu \
    timeout 30s python /app/code.py

if [ $? -eq 0 ]; then
    echo "✅ GPU execution test successful"
else
    echo "❌ GPU execution test failed"
fi

rm -f temp_test_gpu.py

echo ""
echo "🎉 Setup complete! Your Code Runner now supports:"
echo "   ✅ CPU execution (numpy, pandas, matplotlib, scikit-learn)"
echo "   ✅ GPU execution (PyTorch, TensorFlow, CuPy)"
echo "   ✅ Automatic GPU detection and routing"
echo "   ✅ Secure Docker sandboxing"
echo "   ✅ Resource limits and timeout protection"
echo ""
echo "📊 GPU Stats:"
nvidia-smi --query-gpu=name,memory.total,memory.free --format=csv,noheader
echo ""
echo "🚀 Start your application with: npm run dev"
