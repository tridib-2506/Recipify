# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    chromium-driver \
    chromium \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Chrome
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROME_DRIVER=/usr/lib/chromium/chromedriver

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define the command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "scraper:app"]
