const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');

mix.webpackConfig({
    resolve: {
        alias: {
            "@components": __dirname + "/resources/js/components",
            "@pages": __dirname + "/resources/js/pages",
            "@css": __dirname + "/resources/css",
            "@utils": __dirname + "/resources/js/utils",
            "@context": __dirname + "/resources/context",
            "@provider": __dirname + "/resources/js/provider",
        }
    }
})