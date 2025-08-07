FROM node:20-alpine as builder
RUN NG_CLI_ANALYTICS=false npm install -g @angular/cli
ARG NG_ENVIRONMENT

COPY resilmesh-dashboard /build/resilmesh-dashboard
COPY sentinel-layout /build/sentinel-layout
COPY *.json /build/

RUN cd /build && \
    npm install --legacy-peer-deps && \
    ng build resilmesh-dashboard --configuration $NG_ENVIRONMENT


FROM nginxinc/nginx-unprivileged:1.24-alpine
COPY --from=builder --chown=nginx:nginx /build/dist/resilmesh-dashboard/browser /app
COPY etc/nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 777 /app
EXPOSE 4200
