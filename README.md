<h1 align="center">Lar-Reach</h1>
<p align="center"><i>Easy to use tool for product management</i></p>
<hr>

![Lar-React search page](/docs/assets/search_page.png)

1. [Overview](#overview)
    1. [Containers](#overview.containers)
    2. [Structure](#overview.structure)
2. [Getting started](#start)
    1. [Installation](#start.installation)
    2. [Configuration](#start.config)
    3. [Launching](#start.launch)
    4. [Database](#start.db)
    5. [Stopping](#start.stop)

## <a id="overview">Overview</a>

Lar-React introduces a simple way to maintain product database. Lar-React makes
product managing routine more enjoyable with a simple and delightful UI.
You can read [API documentation](/docs/API.yml), which was written with Swagger editor.

### <a id="overview.containers">Containers</a>

Lar-React uses 5 docker containers. Those are: mysql, phpmyadmin, redis, php-fpm (see [Dockerfile](/server/Dockerfile)) and nginx.
You can open [docker compose](/docker-compose.yml) file to find out how docker actually launches them.

### <a id="overview.structure">Structure</a>

Lar-React, as might have guessed, was written using Laravel, for backend, and
React, for frontend. And here's what Lar-React looks like:
| File/folder name | Description |
| ---------------- | ----------- |
| `/docker` | Contains misc. configurations for php/nginx. |
| `/Makefile` | Contains a bunch of `make` commands. Full description is given [here](docs/Makefile.md). |
| `/server` | Laravel project itself. You may wanna see [Laravel docs](https://laravel.com/docs/8.x/structure) to read about its structure. |
| `/server/resources` | Contains frontend/React side. It was generated with `php artisan ui react`. |

## <a id="start">Getting started</a>

Below is a short walkthrough on how to setup and launch this project.

### <a id="start.installation">Installation</a>

Follow these steps to install and run project:

- Clone the project with `git clone https://github.com/dbelik/__laravel_react.git .`;
- Go to server folder with `cd server`;
- There you should install dependencies with `npm install` and `composer install`.

### <a id="start.config">Configuration</a>

Copy two `.env.example` files and rename them to `.env`.
Root level `/.env` file contains containers configurations. Second `/server/.env` file
contains Laravel configurations. Notice that this project can start without changing those two files.

### <a id="start.launch">Launching</a>

When you are with all above, you can finally run the project with:

- `make up` in project root directory to run all containers (see Overview.Containers);
- `npm run watch` in `/server` folder to make React watch for changes in front-end code.

### <a id="start.db">Database</a>

__Notice__: you should perform all steps in this section in php container. To enter this container,
you can use ```make shell-php``` in root folder.

In `/server` directory, You should apply all database migrations with `php artisan migrate`. Then you can
seed database with:

- user data using `php artisan db:seed --class UserSeeder`;
- product types using `php artisan db:seed --class ProductTypesSeeder`.

Generate application key with `php artisan key:generate`.

### <a id="start.stop">Stopping</a>

In root folder, type `make down` to stop all containers. You should also close window where `npm` runs.
