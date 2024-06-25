# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the built files into the NGINX container
COPY ./build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container has started
CMD ["nginx", "-g", "daemon off;"]
