#!/bin/bash

# Docker Python Code Runner Setup Script

echo "🐍 Setting up Python Code Runner with Docker..."

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

# Build the Python code runner image
echo "🔨 Building Python code runner Docker image..."
docker build -t python-code-runner .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully"
else
    echo "❌ Failed to build Docker image"
    exit 1
fi

# Test the container
echo "🧪 Testing Python execution..."
test_code='print("Hello from Docker Python!")'
echo "$test_code" > temp_test.py

docker run --rm \
    --network none \
    --memory 128m \
    --cpus="0.5" \
    --user 1000:1000 \
    --read-only \
    --tmpfs /tmp:noexec,nosuid,size=10m \
    -v "$(pwd)/temp_test.py:/app/code.py:ro" \
    python-code-runner \
    timeout 10s python /app/code.py

if [ $? -eq 0 ]; then
    echo "✅ Python execution test successful"
else
    echo "❌ Python execution test failed"
fi

# Cleanup
rm -f temp_test.py

echo "🎉 Setup complete! The Python code runner is ready to use."
echo "📚 Your educational platform now supports real Python execution with:"
echo "   - Secure Docker sandboxing"
echo "   - Memory and CPU limits"
echo "   - Network isolation"
echo "   - Timeout protection"
echo "   - numpy, pandas, matplotlib support"