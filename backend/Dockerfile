# backend/Dockerfile

# Base Python image
FROM python:3.11-slim

# Set workdir
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Run server
CMD ["gunicorn", "your_project.wsgi:application", "--bind", "0.0.0.0:8000"]
