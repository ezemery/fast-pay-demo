FROM node:10.17.0-alpine3.10
COPY ./ /var/www
WORKDIR /var/www
EXPOSE 3000
RUN npm install
ENTRYPOINT ["npm","start"]


