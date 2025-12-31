# Stage 1: Build the Angular application
FROM node:alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build for static deployment (no SSR)
RUN npm run build -- --configuration=static

# List build output to verify
RUN echo "Build output:" && ls -la dist/sta-web/

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app (static build outputs to dist/sta-web/browser)
COPY --from=build /app/dist/sta-web/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
