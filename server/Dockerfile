FROM php:7.4-fpm

COPY composer.lock composer.json /var/www/lar-react/

WORKDIR /var/www/lar-react

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    curl
    
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql zip exif pcntl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN groupadd -g 1000 dev
RUN useradd -u 1000 -ms /bin/bash -g dev dev

COPY . /var/www/lar-react

COPY --chown=dev:dev . /var/www/lar-react

USER dev

EXPOSE 9000
CMD ["php-fpm"]