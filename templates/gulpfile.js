'use strict';
var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade');


var paths = {
  templates: './app/**/*.jade',
  other: './app/**/*.ico',
  styles: './app/styles/**/*.scss',
  destStyles: './dist/styles/',
  destHTML: './dist/'
};

gulp.task('styles', function() {
  gulp.src(paths.styles)
    .pipe(sass({
      // includePaths: require('node-bourbon').with('other/path', 'another/path') 
      // - or - 
      includePaths: require('node-bourbon').includePaths.concat(require('node-neat').includePaths)
    }))
    .pipe(gulp.dest(paths.destStyles))
    .pipe(connect.reload());
});
gulp.task('copy-files', function() {
  gulp.src(paths.other)
    .pipe(gulp.dest(paths.destHTML));
});

gulp.task('templates', function() {

  gulp.src(paths.templates)
    .pipe(jade())
    .pipe(gulp.dest(paths.destHTML))
    .pipe(connect.reload());
});

gulp.task('watch', ['styles', 'templates', 'copy-files', 'connect'], function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.templates, ['templates']);
});

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  });
});

gulp.task('default', ['connect', 'watch']);
