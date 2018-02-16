const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

// concatenate and uglify
gulp.task('js', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.slim.min.js',
                  'node_modules/tether/dist/js/tether.js',
                  'node_modules/bootstrap/dist/js/bootstrap.min.js'],
    { base:'node_modules'} )
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./assets/js'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['js','sass'], () => {
  browserSync.init({
    server: './'
  });
  gulp.watch('assets/js/**/*.js', ['js']);
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