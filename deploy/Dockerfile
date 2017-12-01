FROM node:9.2.0-alpine

RUN apk update && \
    apk add yarn bash
RUN rm -rf /var/cache/apk/*

WORKDIR /home
EXPOSE 3000
