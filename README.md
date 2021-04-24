<h1 align="center">Lar-Reach</h1>
<p align="center"><i>Easy to use tool for product management</i></p>
<hr>

![Lar-React search page](/docs/assets/search_page.png)

## Overview

Lar-React introduces a simple way to maintain product database. Lar-React makes
product managing routine more enjoyable with a simple and delightful UI.

### Structure

Lar-React, as might have guessed, was written using Laravel, for backend, and
React, for frontend. And here's what Lar-React looks like:
| File/folder name | Description |
| ---------------- | ----------- |
| `/docker` | Contains misc. configurations for php/nginx |
| `/Makefile` | Contains a bunch of `make` commands. Full description is given [here](docs/Makefile.md) |
| `/server` | Laravel project itself. You may wanna see [Laravel docs](https://laravel.com/docs/8.x/structure) to read about its structure. |

### Containers

## Getting started

Below is a short walkthrough on how to setup and launch this project.

### Installation

Follow these steps to install and run project:

- Clone the project with `git clone https://github.com/dbelik/__laravel_react.git .`;
- Go to server folder with `cd server`;
- There you should install dependencies with `npm install` and `composer install`.

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

- user data using `php artisan db:seed --class UserSeeder`;
- product types using `php artisan db:seed --class ProductTypesSeeder`.

Generate application key with `php artisan key:generate`.
