'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    argv = require('yargs').argv,
    cleanCSS = require('gulp-clean-css'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    liveReload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    sourceMaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

// Set up a boolean variable based on the `--production` flag passed to the
// gulp command in case the tasks are supposed to prepare the codebase to be
// used in production.
var production = typeof argv.production !== 'undefined';

// Define paths in the filesystem for easy access.
var paths = {
  'css': 'css',
  'scss': 'scss/**/*.scss',
  'scssEntrypoint': [
    'scss/style.scss',
    'scss/print.scss'
  ]
};

/**
 * Task: Default —> Build.
 */
gulp.task('default', ['build']);

/**
 * Task: Build.
 */
gulp.task('build', ['sass']);

/**
 * Task: Watch.
 *
 * Continuously watches for changes in Sass and JS files and runs tasks
 * accordingly.
 */
gulp.task('watch', ['build'], function () {
  if (!production) {
    liveReload.listen();
  }
  gulp.watch(paths.scss, ['sass']);
});

/**
 * Task: Compiles Sass files to CSS.
 */
gulp.task('sass', function () {
  return gulp.src(paths.scssEntrypoint)
    .pipe(gulpif(!production, sourceMaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulpif(production, cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(!production, sourceMaps.write()))
    .pipe(gulpif(!production, liveReload()))
    .pipe(gulp.dest(paths.css));
});
