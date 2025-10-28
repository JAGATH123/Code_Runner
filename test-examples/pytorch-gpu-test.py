# PyTorch GPU Test
# This code will automatically use GPU if available

import torch
import time

print("=" * 50)
print("PyTorch GPU Test")
print("=" * 50)

# Check CUDA availability
print(f"\nPyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")

if torch.cuda.is_available():
    print(f"CUDA version: {torch.version.cuda}")
    print(f"GPU Device: {torch.cuda.get_device_name(0)}")
    print(f"GPU Memory: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.2f} GB")

    # Matrix multiplication benchmark
    print("\n" + "=" * 50)
    print("Matrix Multiplication Benchmark (2000x2000)")
    print("=" * 50)

    # GPU computation
    torch.cuda.synchronize()
    start = time.time()
    a = torch.randn(2000, 2000).cuda()
    b = torch.randn(2000, 2000).cuda()
    c = torch.matmul(a, b)
    torch.cuda.synchronize()
    gpu_time = time.time() - start

    print(f"\n✅ GPU Computation Time: {gpu_time:.4f} seconds")
    print(f"Result shape: {c.shape}")
    print(f"Result device: {c.device}")

    # Memory info
    allocated = torch.cuda.memory_allocated() / 1024**2
    reserved = torch.cuda.memory_reserved() / 1024**2
    print(f"\nGPU Memory Allocated: {allocated:.2f} MB")
    print(f"GPU Memory Reserved: {reserved:.2f} MB")

else:
    print("\n⚠️ CUDA not available, using CPU")

print("\n" + "=" * 50)
print("Test Complete!")
print("=" * 50)
