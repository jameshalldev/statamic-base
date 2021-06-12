const mix = require('laravel-mix');

mix.js('resources/js/site.js', 'public/js')

mix.copyDirectory('resources/fonts', 'public/fonts')
mix.copyDirectory('resources/images', 'public/images')

mix.postCss('resources/css/tailwind.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('postcss-preset-env')({stage: 0})
])

mix.browserSync({
    proxy: 'statamic-base.test',
    files: [
        'resources/**/*',
    ]
 });

if (mix.inProduction()) {
   mix.version();
}

// Research into whether it's possible to run compile Tailwind THEN update browsersync