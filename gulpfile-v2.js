/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */
var gulp = require("gulp"),
  connect = require("gulp-connect"),
  cssmin = require("gulp-minify-css"),
  uglify = require("gulp-uglify"),
  babel = require("gulp-babel"),
  concat = require("gulp-concat"),
  livereload = require("gulp-livereload");

/** Config gulp server */
gulp.task("webserver", done => {
  connect.server({
    livereload: true,
    root: [".", ".tmp"]
  });
  done();
});

/** CSS minify */
gulp.task("css", done => {
  gulp
    .src("global-style.css")
    .pipe(cssmin())
    .pipe(gulp.dest(".tmp/styles"))
    .pipe(livereload());
  done();
});

/** JS minify */
gulp.task("js", done => {
  gulp
    .src(
      "public/scripts/*.js",
      "global-scripts.js",
      "public/lib/jquery-3.3.1.min.js"
    )
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest(".tmp/scripts"));

  gulp.src("public/**/*.js").pipe(gulp.dest(".tmp"));
  gulp
    .src("public/scripts/*.js")
    .pipe(gulp.dest(".tmp/scripts"))
    .pipe(livereload());

  done();
});

/** External libs uglify */
gulp.task("lib", done => {
  gulp
    .src("public/lib/jquery-3.3.1.min.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(concat("jquery-3.3.1.min.js"))
    .pipe(gulp.dest(".tmp/lib"))
    .pipe(livereload());
  done();
});

/** Html location to tmp */
gulp.task("html", done => {
  gulp.src("public/**/*.html").pipe(gulp.dest(".tmp"));
  gulp
    .src("public/componentes/*.html")
    .pipe(gulp.dest(".tmp/componentes"))
    .pipe(livereload());
  done();
});

/** Assets location to tmp */
gulp.task("assets", done => {
  gulp
    .src("public/assets/***/**/*")
    .pipe(gulp.dest(".tmp/assets"))
    .pipe(livereload());
  done();
});

/** Watch files */
gulp.task("watch-js", done => {
  livereload.listen();
  gulp.watch("global-scripts.js", gulp.series("js"));
  gulp.watch("public/**/*.js", gulp.series("js"));
  done();
});
gulp.task("watch-html", done => {
  livereload.listen();
  gulp.watch("public/*.html", gulp.series("html"));
  gulp.watch("public/**/*.html", gulp.series("html"));
  done();
});
gulp.task("watch-css", done => {
  livereload.listen();
  gulp.watch(["public/**/*.css", "global-style.css"], gulp.series("css"));
  done();
});
/** Watch files */

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("css", "js", "lib", "html", "assets"),
    "watch-js",
    "watch-css",
    "watch-html",
    "webserver"
  )
);
