FROM python:3.9-slim

# Install required system packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Create judge directory and set permissions
WORKDIR /judge
RUN chmod 755 /judge

# Add non-root user with minimal privileges
RUN useradd -m -r judge && \
    chown -R judge:judge /judge

# Copy runner script
COPY --chown=judge:judge run.py /judge/run.py
RUN chmod 755 /judge/run.py

# Switch to non-root user
USER judge

# Set Python unbuffered output
ENV PYTHONUNBUFFERED=1

# Default command
CMD ["python", "/judge/run.py"]