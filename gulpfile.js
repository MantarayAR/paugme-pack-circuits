var gulp    = require('gulp');
var jasmine = require('gulp-jasmine');

var options = {
  testPaths : [
    'tests/*.js',
    'tests/**/*.js',
  ],
  jasmine : {
    includeStackTrace : true,
    verbose: true
  }
}

gulp.task('default', function () {
  return gulp.src( options.testPaths )
             .pipe( jasmine( options.jasmine ) );
});