var gulp = require('gulp'),
  cache = require('gulp-cache'),
  del = require('del'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  mozjpeg = require('imagemin-mozjpeg'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync'),
  cssnano = require('gulp-cssnano');

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('css-libs', ['sass'], function () {
  return gulp.src([
    'src/libs/slick-carousel/slick/slick.scss',
    'src/css/fonts/iconssba.css',
    'src/css/fonts/iconssba-codes.css',
    'src/libs/bxslider-4/src/css/jquery.bxslider.min.css',
  ])/*стили из билиотек*/
  .pipe(cssnano())
  .pipe(concat('libs.min.css'))
  .pipe(gulp.dest('src/css'));
});

gulp.task('scripts', function () {
  return gulp.src([
    'src/libs/jquery/dist/jquery.min.js',
    'src/libs/bxslider-4/src/js/jquery.bxslider.js',
    'src/libs/slick-carousel/slick/slick.js',
    'src/libs/markerwithlabel/src/markerwithlabel.min.js',
  ])/*скрипты библиотек*/
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('src/js'));
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*')
  .pipe(imagemin([
    pngquant(),
    mozjpeg({
      progressive: true
    })
  ], {
    verbose: true
  }))
  .pipe(gulp.dest('public/img'));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync', 'css-libs', 'sass', 'scripts' ], function () {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function () {
  return del.sync('public');
});

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('build', ['clean', 'css-libs', 'sass', 'scripts', 'img'], function () {
  var buildCss = gulp.src([
    'src/css/main.css',
    'src/css/libs.min.css'
  ])
  .pipe(gulp.dest('public/css'));

  var buildFonts = gulp.src('src/css/fonts/**/*') // Переносим шрифты в продакшен
  .pipe(gulp.dest('public/css/fonts'));

  var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
  .pipe(gulp.dest('public/js'));

  var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
  .pipe(gulp.dest('public'));
});

gulp.task('default', ['watch']);