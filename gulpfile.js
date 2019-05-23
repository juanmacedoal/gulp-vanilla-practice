/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';
var fs = require('fs');
var gulp = require('gulp');
var packages = require('./package.json');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulpfiles')
  .filter(function(file) {
    return /\.(js|coffee)$/i.test(file);
  })
  .map(function(file) {
    require('./gulpfiles/' + file);
  });

/**
 * Compiling resources and serving application
 */
gulp
  .task('serve', ['clean', 'js', 'lint', 'less', 'server'], function() {
    return gulp.watch([packages.paths.js, packages.paths.html, packages.paths.less], ['lint', 'less', 'js', reload]);
  })
  .task('serve:minified', ['clean', 'lint', 'less:min', 'js:min', 'server'], function() {
    return gulp.watch(
      [packages.paths.js, packages.paths.html, packages.paths.less],
      ['lint', 'less:min', 'js:min', reload]
    );
  });
