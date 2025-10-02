FROM node:18-bullseye AS build
WORKDIR /app

COPY package*.json ./
RUN npm install @rollup/rollup-linux-x64-musl --legacy-peer-deps || true

COPY . .
RUN npm run build -- --configuration production


FROM nginx:1.27-alpine
COPY --from=build /app/dist/sistema-propiedad_intelectual /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
