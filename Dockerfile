FROM node:20-alpine AS build
RUN apk update && apk upgrade --no-cache openssl busybox-binsh


WORKDIR /usr/src/app

COPY . .
RUN npm cache clean --force

RUN NODE_OPTIONS="--max-old-space-size=4096" npm set progress=false
RUN NODE_OPTIONS="--max-old-space-size=4096" npm ci --legacy-peer-deps
RUN NODE_OPTIONS="--max-old-space-size=4096 --openssl-legacy-provider" npm run build --silent

# FROM nginx:1.23.3-alpine
#FROM nginx:1.25.5
FROM nginx:1.30.4-alpine-slim AS fnl_base_image
RUN apk add --no-cache ca-certificates && update-ca-certificates
RUN apk --no-cache upgrade && apk add --no-cache --upgrade openssl 'zlib>=1.3.2-r0' 'musl>=1.2.5-r3'
RUN mkdir -p /run/nginx


COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/config/inject.template.js /usr/share/nginx/html/inject.template.js
COPY --from=build /usr/src/app/config/nginx.conf /etc/nginx/nginx.conf.template
COPY --from=build /usr/src/app/config/entrypoint.sh /

ENV PORT=8081

ENV HOST=0.0.0.0

RUN sh -c "envsubst '\$PORT'  < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf"

# Grant the built-in nginx user access to runtime paths so it can write pid, cache, logs, and the injected env file
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /run/nginx /etc/nginx/nginx.conf \
    && chmod +x /entrypoint.sh

USER nginx

EXPOSE 8081

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
