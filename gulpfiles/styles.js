var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var package = require('./../package.json');

/**
 * Less compilation
 */
gulp
  .task('less', function() {
    return gulp
      .src(package.paths.less)
      .pipe(less())
      .pipe(concat(package.dest.style))
      .pipe(gulp.dest(package.dest.dist));
  })
  .task('less:min', function() {
    return gulp
      .src(package.paths.less)
      .pipe(less())
      .pipe(concat(package.dest.style))
      .pipe(cssmin())
      .pipe(gulp.dest(package.dest.dist));
  });
