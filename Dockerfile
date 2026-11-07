# Stage 1: Build Vite React App
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx (provides /app/dist for Coolify static packaging)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist /app/dist
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
