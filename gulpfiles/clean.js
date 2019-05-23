var gulp = require('gulp');
var del = require('del');

/**
 * Cleaning dist/ folder
 */
gulp.task('clean', function(cb) {
  del(['../dist/'], cb);
});
