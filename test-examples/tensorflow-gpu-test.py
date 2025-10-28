# TensorFlow GPU Test
# This code will automatically use GPU if available

import tensorflow as tf
import time

print("=" * 50)
print("TensorFlow GPU Test")
print("=" * 50)

# Check GPU availability
print(f"\nTensorFlow version: {tf.__version__}")
gpus = tf.config.list_physical_devices('GPU')
print(f"GPUs available: {len(gpus)}")

if gpus:
    for gpu in gpus:
        print(f"  - {gpu.name}")

    # Matrix multiplication benchmark
    print("\n" + "=" * 50)
    print("Matrix Multiplication Benchmark (2000x2000)")
    print("=" * 50)

    with tf.device('/GPU:0'):
        # Create random matrices
        start = time.time()
        a = tf.random.normal([2000, 2000])
        b = tf.random.normal([2000, 2000])
        c = tf.matmul(a, b)
        gpu_time = time.time() - start

        print(f"\n✅ GPU Computation Time: {gpu_time:.4f} seconds")
        print(f"Result shape: {c.shape}")

    print("\n✅ TensorFlow is using GPU!")
else:
    print("\n⚠️ No GPU detected, using CPU")

    # CPU computation for comparison
    with tf.device('/CPU:0'):
        start = time.time()
        a = tf.random.normal([2000, 2000])
        b = tf.random.normal([2000, 2000])
        c = tf.matmul(a, b)
        cpu_time = time.time() - start

        print(f"CPU Computation Time: {cpu_time:.4f} seconds")

print("\n" + "=" * 50)
print("Test Complete!")
print("=" * 50)
