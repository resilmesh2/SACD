FROM node:22-alpine AS builder

WORKDIR /build

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG NG_ENVIRONMENT

RUN node --max-old-space-size=4096 ./node_modules/@angular/cli/bin/ng build --configuration ${NG_ENVIRONMENT:-production}

FROM nginxinc/nginx-unprivileged:1.29-alpine

COPY --from=builder /build/dist/*/browser /app
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf

USER root
RUN chmod -R 755 /app
USER nginx

EXPOSE 4200
