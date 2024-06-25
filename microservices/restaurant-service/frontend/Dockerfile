#  Stage 1: Build the React app
# FROM node:14 AS build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . ./
# RUN npm run build

# # Stage 2: Serve the React app with Nginx
# FROM nginx:latest
# COPY --from=build /app/build /usr/share/nginx/html
# COPY ./gateway/nginx/nginx.conf /etc/nginx/nginx.conf
# # Use the official Nginx image as the base image
FROM nginx:latest

# Copy the built files into the NGINX container
COPY ./microservices/restaurant-service/frontend/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container has started
CMD ["nginx", "-g", "daemon off;"]


