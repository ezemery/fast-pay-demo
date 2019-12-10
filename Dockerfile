FROM node:10.17.0-alpine3.10
COPY ./ /var/www
WORKDIR /var/www
EXPOSE 3000
RUN npm install
ENTRYPOINT ["npm","start"]

FROM nginx:1.16-alpine
COPY index.html /usr/share/nginx/html/index.html
COPY assets/js/fastpay.js /usr/share/nginx/html/assets/js/fastpay.js
EXPOSE 8080 3001