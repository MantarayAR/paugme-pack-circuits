var gulp        = require('gulp');
var rename      = require('gulp-rename');
var plumber     = require('gulp-plumber');
var runSequence = require('run-sequence');

var browserSync = require('browser-sync').create();

var jasmine   = require('gulp-jasmine');
var cover     = require('gulp-coverage');
var coveralls = require('gulp-coveralls');

var browserify = require('gulp-browserify');
var minify     = require('gulp-minify');

var options = {
  testPaths : [
    'tests/spec/*.js',
    'tests/spec/**/*.js',
  ],
  filePaths : [
    'framework/*.js',
    'framework/**/*.js',
    'src/*.js',
    'src/**/*.js'
  ],
  jasmine : {
    includeStackTrace : true,
    verbose: true
  },
  buildPath : 'build/',
  entryPoint : 'paugme-pack-circuits',
  port : 8080
}

gulp.task('serve', [ 'default' ], function () {
  browserSync.init({
    server: {
      baseDir : './' + options.buildPath
    }
  });

  gulp.watch( options.filePaths, [ 'test', 'build' ] );
});

gulp.task('test', function () {
  return gulp.src( options.testPaths )
          .pipe(plumber())
          .pipe(cover.instrument({
            pattern: options.filePaths,
            debugDirectory: 'debug'
          }))
          .pipe( jasmine( options.jasmine ) )
          .pipe(cover.gather())
          .pipe(cover.format({
            reporter: 'lcov'
          }))
          .pipe(coveralls())
          .pipe(gulp.dest('coverage'));
});

gulp.task('compile', function () {
  return gulp.src(options.entryPoint + '.js')
          .pipe(browserify( {
            insertGlobals: true,
            debug : !gulp.env.production
          } ))
          .pipe(gulp.dest(options.buildPath))
          .pipe(browserSync.stream());
});

gulp.task('minify', function () {
  return gulp.src(options.buildPath + options.entryPoint + '.js')
          .pipe(minify( {} ))
          .pipe(rename(options.entryPoint + '.min.js' ))
          .pipe(gulp.dest(options.buildPath))
          .pipe(browserSync.stream());
});

gulp.task('build', function () {
  runSequence('compile', 'minify');
});

gulp.task('default', function ( cb ) {
  runSequence( 'test', 'build', cb );
});