const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './'
  });
  gulp.watch('assets/scss/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
  return gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);