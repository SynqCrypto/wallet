'use strict';

var gulp = require('gulp');

gulp.task('watch', ['styles'], function () {
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/images/**/*', ['images']);
});
