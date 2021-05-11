const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require("gulp-autoprefixer")
const plumber = require('gulp-plumber') // gulpでエラー時に実行を止めない
const ejs = require("gulp-ejs")
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const imagemin = require("gulp-imagemin")
const pngquant = require("imagemin-pngquant")
const browserSync = require('browser-sync')

const del = require('del')
/**
 * EJS
 */
gulp.task( "ejs", function () {
  return gulp.src(["src/ejs/**/*.ejs", '!' + "src/ejs/**/_*.ejs"])
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest( "./dist/" ) )
});

/**
 * SASS
 */
gulp.task( "sass", function () {
  return gulp.src( 'src/assets/stylesheets/style.scss' )
    .pipe(plumber())
    .pipe(sass().on( 'error', sass.logError ) )
    .pipe(autoprefixer())
    .pipe(gulp.dest( './dist/css' ))
});

/**
 * JS
 */
gulp.task('js', () => {
  return gulp.src('src/assets/javascripts/*.js')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/js/'))
});

/**
 * IMAGE
 */
gulp.task("imagemin", () => {
  return gulp.src("src/assets/images/**/*.+(jpg|jpeg|png|gif|svg)")
    .pipe(imagemin({
      progressive: true,
      use: [pngquant({quality: '65-80',speed: 1})]
    }))
    .pipe(gulp.dest("./dist/img/"))
});

/**
 * Server
 */
gulp.task('browserSync', () => {
  return browserSync({
    server: {
      baseDir: 'dist',
      reloadOnRestart: true
    }
  });
});


gulp.task('liveReload', (done) => {
  browserSync.reload();
  done();
});

/**
 * Utility
 */
gulp.task('clean', (cb) => {
  return  del([
    'dist/**'
  ], cb);
});

gulp.task( "build", gulp.series(
  'ejs',
  'js',
  'sass',
  'imagemin',
));

gulp.task( "rebuild", gulp.series(
  'clean',
  'ejs',
  'js',
  'sass',
  'imagemin',
));

/**
 * Watch & Default
 */
gulp.task( "watch", function () {
    gulp.watch("src/assets/stylesheets/**/*.scss", gulp.series( "sass" ) )
    gulp.watch("src/assets/javascripts/*.js", gulp.series( "js" ) )
    gulp.watch("src/ejs/**/*.ejs", gulp.series( "ejs" ) )
    // gulp.watch("src/assets/images/**/*.+(jpg|jpeg|png|gif|svg)", gulp.series( "imagemin" ) )
    gulp.watch("dist/**/*", gulp.task('liveReload'))
    gulp.watch("dist/*", gulp.task('liveReload'))
});

gulp.task('default', gulp.parallel('build', 'watch', 'browserSync'))
