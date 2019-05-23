var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var package = require('./../package.json');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

/** JavaScript compilation */
gulp
  .task('js', function() {
    // return gulp
    //   .src(package.paths.app)
    //   .pipe(browserify({ transform: ['babelify'] }))
    //   .bundle()
    //   .on('error', err => {
    //     console.error('error is', err);
    //   })
    //   .pipe(source(package.dest.app))
    //   .pipe(gulp.dest(package.dest.dist));
    var b = browserify('./js/app.js');

    return b
      .transform(babelify.configure({ presets: ['es2015'] }))
      .bundle()
      .pipe(source('app.js')) // destination file for browserify, relative to gulp.dest
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(package.dest.dist));
  })
  .task('js:min', function() {
    return gulp
      .src(package.paths.app)
      .pipe(browserify({ transform: ['babelify'] }))
      .bundle()
      .pipe(source(package.dest.app))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(package.dest.dist));
  });
