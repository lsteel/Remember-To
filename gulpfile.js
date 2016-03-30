'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var express = require('express');
var livereload = require('gulp-livereload');
var please = require('gulp-pleeease');
var lib = require('bower-files')({
  overrides: {
    bootstrap: {
      main: [
        'dist/js/bootstrap.js',
        'dist/css/bootstrap.css',
        'dist/fonts/*'
      ]
    }
    // skeleton: {
    //   main: [
    //     'css/normalize.css',
    //     'css/skeleton.css'
    //   ]
    // }
  }
});

gulp.task('default', [
  'fonts',
  'scripts',
  'styles',
  'stylus',
  'static',
  'templates'
]);

gulp.task('watch', [
  'fonts',
  'scripts.watch',
  'styles.watch',
  'stylus.watch',
  'static.watch',
  'templates.watch',
  'server'//,
  //'livereload'
], function() {
  console.log('You dun bin gulped!!!1!');
});


gulp.task('scripts', function () {
  return gulp.src(lib.ext('js').files.concat('src/scripts/**/*.js'))
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      //.pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/js'));
});
gulp.task('scripts.watch', ['scripts'], function () {
  gulp.watch('src/scripts/**/*.js', ['scripts']);
});


gulp.task('styles', function () {
  return gulp.src(lib.ext('css').files.concat('src/styles/**/*.css'))
    .pipe(sourcemaps.init())
      .pipe(please())
      .pipe(concat('app.min.css'))
    //.pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/css'));
});
gulp.task('styles.watch', ['styles'], function () {
  gulp.watch('src/styles/**/*.css', ['styles']);
});


gulp.task('stylus', function () {
  return gulp.src('src/styles/**/*.map')
    .pipe(gulp.dest('public/css'));
});
gulp.task('stylus.watch', ['stylus'], function () {
  gulp.watch('src/styles/**/*.map', ['stylus']);
});


gulp.task('static', function () {
  return gulp.src('src/static/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public'));
});
gulp.task('static.watch', ['static'], function () {
  gulp.watch('src/static/**/*', ['static']);
});


gulp.task('fonts', function() {
  return gulp.src(lib.ext(['eot', 'svg', 'ttf', 'woff', 'woff2']).files)
    .pipe(gulp.dest('public/fonts'));
});


gulp.task('templates', function () {
  return gulp.src('src/templates/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('public'));
});
gulp.task('templates.watch', ['templates'], function () {
  gulp.watch('src/templates/**/*.html', ['templates']);
});


gulp.task('server', function () {
  var app = express();
  app.use(express.static('public'));
  app.listen(8000);
});


gulp.task('livereload', function () {
  livereload.listen();
  gulp.watch('public/**/*', function (event) {
    livereload.changed(event);
  });
});
