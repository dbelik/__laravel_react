<h1 align="center">Lar-Reach</h1>
<p align="center"><i>Easy to use tool for product management</i></p>
<hr>

![Lar-React search page](/docs/assets/search_page.png)

## Overview

### Project

### Structure

### Containers

## Getting started

### Installation

Follow these steps to install and run project:

- Clone the project with `git clone https://github.com/dbelik/__laravel_react.git .`
- Go to server folder with `cd server`
- There you should install dependencies with `npm install` and `composer install`

### Configuration

Copy two `.env.example` files and rename them to `.env`.
Root level `/.env` file contains containers configurations. Second `/server/.env` file
contains Laravel configurations. Notice that this project can start without changing those two files.

### Launching

When you are with all above, you can finally run the project with:

- `make up` in project root directory to run all containers (see Overview.Containers);
- `npm run watch` in `/server` folder to make React watch for changes in front-end code.

### Database

__Notice__: you should perform all steps in this section in php container. To enter this container,
you can use ```make shell-php``` in root folder.

In `/server` directory, You should apply all database migrations with `php artisan migrate`. Then you can
seed database with:

- user data using `php artisan db:seed --class UserSeeder`
- product types using `php artisan db:seed --class ProductTypesSeeder`

Generate application key with `php artisan key:generate`.
