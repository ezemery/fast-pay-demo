FROM node:12.13.1-alpine3.10 AS base
WORKDIR /var/www
COPY . .
RUN apk update
RUN apk add yarn
RUN yarn install 
RUN yarn build-prod
ENTRYPOINT [ "node", "server.js" ] 


