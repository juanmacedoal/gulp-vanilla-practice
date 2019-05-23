/**
 *  Server file
 *  Where the server is deploy
 */

'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');

/**
 * Running livereload server
 */
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});
