# Example for client-service frontend Dockerfile
FROM nginx:latest

# Copy the custom Nginx configuration file
COPY gateway/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the build output of client-service frontend to the Nginx HTML directory
COPY microservices/client-service/frontend/build/ /usr/share/nginx/clients/

# Expose port 8080 (assuming your nginx.conf listens on 8080)
EXPOSE 8080

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
