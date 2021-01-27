var babel        = require('gulp-babel');
var concat      = require('gulp-concat');
var del            = require('del');
var gulp         = require('gulp');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');
var sass                 = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var proxy               = require('proxy-middleware');

const server = browserSync.create();

function serve(done) {
  server.init({
    port: "8001",
    server: {
      baseDir: './',
      middleware: 'http://localhost:8001/'
    }
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

const paths = {
  scripts: {
    src: 'src/js/*.js',
    dest: 'js/'
  },
  styles: {
    src: 'src/scss/*.scss',
    dest: 'css',
    destProd: 'css/'
  }
};

const clean = (done) => {
  del(['css','js']);
  done();
}


function stylesDev () {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

function stylesProd () {
  return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 5 versions', '> 1%', 'ie 10'], {cascade: true }))
    .pipe(gulp.dest(paths.styles.destProd));
}

function scriptsDev(done) {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(gulp.dest(paths.scripts.dest));
  done();
}
function scriptsProd(done) {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    // .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.scripts.dest));
  done();
}

const watch = () => {
  gulp.watch(paths.scripts.src, gulp.series(scriptsDev, reload));
  gulp.watch(paths.styles.src, gulp.series(stylesDev, reload));
}

gulp.task('build', gulp.series(scriptsProd, stylesProd));
gulp.task('default', gulp.series(scriptsProd, stylesProd, serve, watch));
