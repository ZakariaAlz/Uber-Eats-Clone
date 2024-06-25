# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built files into the NGINX container for each frontend service
COPY .microservices/client-service/frontend/build /usr/share/nginx/html/clients
COPY .microservices/delivery-service/frontend/build /usr/share/nginx/html/deliveries
COPY .microservices/restaurant-service/frontend/build /usr/share/nginx/html/restaurants
COPY .microservices/technical-service/frontend/build /usr/share/nginx/html/technicals
COPY .microservices/sales-service/frontend/build /usr/share/nginx/html/sales
COPY .microservices/component-service/frontend/build /usr/share/nginx/html/components

# Expose port 8080
EXPOSE 8080

# Start Nginx when the container has started
CMD ["nginx", "-g", "daemon off;"]
