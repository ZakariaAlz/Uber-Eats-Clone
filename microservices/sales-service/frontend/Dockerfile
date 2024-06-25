# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the custom Nginx configuration file for Sales Service
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the build output for Sales Service to the Nginx HTML directory
COPY microservices/sales-service/frontend/build/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
