// #1 Import van toegevoegde packages (via npm of yarn)

// Basic packages
const gulp= require('gulp');
const browsersync = require('browser-sync').create();
const plumber = require('gulp-plumber')

// HTML packages
const htmlmin = require('gulp-htmlmin');

// JS packages
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js')
const webpackstream = require('webpack-stream');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');

// ook nog:
// babel-loader
// @babel/core

// #2 De tasks / watchers zelf die we aanmaken
// a We willen een development server opzetten
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: './dist/'
        },
        port: 300
    });
    done();
}

//BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// b html moet geminified naar de dist-map gezet worden
function minifyHTML() {
    return gulp
        .src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));
}

// c JS willen we samenvoegen, minifien en compatibel maken
function scriptsLint() {
    return gulp
        .src(['./src/script/**/*', './gulpfile.js'])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
// Transpile, concatenate and minify scripts
function scripts() {
    return gulp
        .src(['./src/js/lib/*.js', './src/js/*.js'])
        .pipe(plumber())
        .pipe(concat('app.bundle.js'))
        .pipe(gulp.dest('./dist/script/'))
        .pipe(browsersync.stream());
}

function watchFiles() {
    gulp.watch('./src/js/**/*.js', gulp.series(scripts, browserSyncReload));
    gulp.watch(['./src/**/*.html'], gulp.series(minifyHTML, browserSyncReload));
}

// d Watchen van veranderingen
const serve = gulp.parallel(watchFiles, browserSync); // complexere combinatievan tasks...

// #3 Export van onze eigen tasks (functions)
// Ps: dan kunnen we ze gebruiken via de command line
exports.minifyHTML = minifyHTML;
exports.watchFiles = watchFiles;

exports.serve = serve;
exports.scripts = scripts;