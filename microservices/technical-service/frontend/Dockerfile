# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the custom Nginx configuration file for client-service
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the build output for client-service to the Nginx HTML directory
COPY microservices/client-service/frontend/build/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
