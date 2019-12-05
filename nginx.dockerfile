FROM nginx:1.16-alpine
COPY index.html /usr/share/nginx/html/index.html
COPY assets/js/fastpay.js /usr/share/nginx/html/assets/js/fastpay.js
EXPOSE 8080