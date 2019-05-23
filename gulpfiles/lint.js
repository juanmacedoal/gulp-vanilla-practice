var gulp = require('gulp');
var package = require('./../package.json');
var jshint = require('gulp-jshint');
/**
 * JSLint/JSHint validation
 */
gulp.task('lint', function() {
  return gulp
    .src(package.paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
