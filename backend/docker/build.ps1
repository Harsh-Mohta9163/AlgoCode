# Build Python judge
Write-Host "Building Python judge..."
docker build -t judge-python ./python

# Test the build
Write-Host "Testing Python judge..."
docker run --rm judge-python python -c "print('Build test successful')"