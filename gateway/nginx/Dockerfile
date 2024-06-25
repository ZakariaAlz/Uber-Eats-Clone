# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output of each frontend to the Nginx HTML directory
COPY microservices/client-service/frontend/build/ /usr/share/nginx/clients/
COPY microservices/delivery-service/frontend/build/ /usr/share/nginx/deliveries/
COPY microservices/restaurant-service/frontend/build/ /usr/share/nginx/restaurants/
COPY microservices/technical-service/frontend/build/ /usr/share/nginx/technicals/
COPY microservices/sales-service/frontend/build/ /usr/share/nginx/sales/
COPY microservices/component-service/frontend/build/ /usr/share/nginx/components/

# Expose port 8080
EXPOSE 8080

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
