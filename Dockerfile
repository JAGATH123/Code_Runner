# Use Python 3.11 slim image for better performance
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install minimal system dependencies in one layer
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install Python packages with fixed versions for caching
RUN pip install --no-cache-dir \
    numpy==1.24.3 \
    pandas==2.0.3 \
    matplotlib==3.7.2 \
    requests==2.31.0 \
    beautifulsoup4==4.12.2 \
    seaborn==0.12.2 \
    pygame==2.5.0 \
    pillow==10.0.0 \
    scipy==1.11.1 \
    scikit-learn==1.3.0

# Create execution directories with proper permissions
RUN mkdir -p /app/code /tmp/plots /tmp/matplotlib && \
    chmod 777 /tmp/plots /tmp/matplotlib

# Create a non-root user for security
RUN useradd -m -u 1000 coderunner && \
    chown -R coderunner:coderunner /app

USER coderunner

# Set environment variables for Python, Matplotlib, and Pygame
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    MPLBACKEND=Agg \
    MPLCONFIGDIR=/tmp/matplotlib \
    SDL_VIDEODRIVER=dummy \
    DISPLAY=:99

# Keep container alive for pool usage
CMD ["tail", "-f", "/dev/null"]