FROM python:3.9-slim

WORKDIR /judge
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Add non-root user
RUN useradd -m -r judge
USER judge

COPY run.py /judge/