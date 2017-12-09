FROM node:9.2.0-alpine

ARG DB_USER=user
ARG DB_PASS=pass
ARG NODE_ENV=test
ARG DB_URL=127.0.0.1

ENV WORKDIR=/home
ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV NODE_ENV=$NODE_ENV
ENV DB_URL=$DB_URL

RUN apk update && \
    apk add yarn bash
RUN rm -rf /var/cache/apk/*

COPY package.json yarn.lock $WORKDIR/
RUN cd $WORKDIR && \
    yarn --production
COPY deploy/dist ${WORKDIR}/

WORKDIR $WORKDIR
EXPOSE 3000
CMD [ "node", "dist/" ]
