# Stage 1: Build the Angular application
FROM node:alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build for production
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built Angular app from build stage (browser folder for SSR projects)
COPY --from=build /app/dist/sta-web/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80



CMD ["nginx", "-g", "daemon off;"]
