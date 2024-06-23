# Stage 1: Build the React app

# Use an official Node.js runtime as the base image
FROM node:14 AS build
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . ./
# Specify the command to run your application
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
