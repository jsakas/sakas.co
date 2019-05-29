FROM wordpress:latest

COPY wordpress/ /var/www/html/

RUN chown -R www-data /var/www/html/wp-content/uploads
RUN chown www-data /var/www/html/.htaccess
