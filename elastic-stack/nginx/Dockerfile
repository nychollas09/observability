FROM nginx

RUN rm -f /var/log/nginx/access.log && rm -f /var/log/nginx/error.log 

COPY nginx.conf /etc/nginx/conf.d/default.conf