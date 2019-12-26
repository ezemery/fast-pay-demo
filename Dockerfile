FROM node:12.13.1-alpine3.10 AS base
WORKDIR /var/www
COPY package.json /var/www
COPY yarn.lock /var/www

FROM base AS dependencies
WORKDIR /var/www
RUN apk update
RUN apk add yarn
RUN yarn install 

FROM base AS release
WORKDIR /var/www
COPY --from=dependencies /var/www/node_modules ./node_modules
COPY . .
RUN yarn build-prod
ENTRYPOINT [ "node", "server.js" ] 


