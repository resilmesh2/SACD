# ETAPA 1: Construcción
FROM node:22-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /build

# Instalamos la CLI de Angular globalmente
RUN npm install -g @angular/cli

# Copiamos solo los archivos de paquetes para aprovechar la caché de Docker
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Ahora copiamos el resto del código fuente
COPY . .

# Argumento para la configuración (production/development)
ARG NG_ENVIRONMENT

# Ejecutamos el build aumentando la memoria de Node.js para evitar el crash
# Usamos la ruta directa al binario local para evitar errores de "command not found"
RUN node --max-old-space-size=4096 ./node_modules/@angular/cli/bin/ng build --configuration ${NG_ENVIRONMENT:-production}

# ETAPA 2: Servidor Web
FROM nginxinc/nginx-unprivileged:1.29-alpine

# Ajusta la ruta de origen según lo que genere tu versión de Angular
# Normalmente es /build/dist/[nombre-proyecto]/browser
COPY --from=builder /build/dist/*/browser /app
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf

USER root
RUN chmod -R 755 /app
USER nginx

EXPOSE 4200
