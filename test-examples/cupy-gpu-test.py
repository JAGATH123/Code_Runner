# CuPy GPU Test
# CuPy is a GPU-accelerated NumPy alternative

import cupy as cp
import numpy as np
import time

print("=" * 50)
print("CuPy GPU Test")
print("=" * 50)

# Check CUDA availability
print(f"\nCuPy version: {cp.__version__}")
print(f"CUDA available: {cp.cuda.is_available()}")

if cp.cuda.is_available():
    print(f"Device: {cp.cuda.Device()}")

    # Array operations benchmark
    print("\n" + "=" * 50)
    print("Array Operations Benchmark (5000x5000)")
    print("=" * 50)

    # GPU computation with CuPy
    start = time.time()
    a_gpu = cp.random.rand(5000, 5000)
    b_gpu = cp.random.rand(5000, 5000)
    c_gpu = cp.dot(a_gpu, b_gpu)
    cp.cuda.Stream.null.synchronize()
    gpu_time = time.time() - start

    print(f"\n✅ GPU (CuPy) Time: {gpu_time:.4f} seconds")
    print(f"Result shape: {c_gpu.shape}")
    print(f"Result device: {c_gpu.device}")

    # CPU computation with NumPy for comparison
    print("\nComparing with CPU (NumPy)...")
    start = time.time()
    a_cpu = np.random.rand(5000, 5000)
    b_cpu = np.random.rand(5000, 5000)
    c_cpu = np.dot(a_cpu, b_cpu)
    cpu_time = time.time() - start

    print(f"CPU (NumPy) Time: {cpu_time:.4f} seconds")
    print(f"\n🚀 Speedup: {cpu_time / gpu_time:.2f}x faster on GPU!")

    # Memory info
    mempool = cp.get_default_memory_pool()
    print(f"\nGPU Memory Used: {mempool.used_bytes() / 1024**2:.2f} MB")

else:
    print("\n⚠️ CUDA not available")

print("\n" + "=" * 50)
print("Test Complete!")
print("=" * 50)
