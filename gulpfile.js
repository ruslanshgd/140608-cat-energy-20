const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

// Html
const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"))
}
exports.html = html;

// Images
const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
  ]))
}
exports.images = images;

// Webp
const makewebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"))
}
exports.makewebp = makewebp;

// Sprite
const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

// fonts
const fonts = () => {
  return gulp.src("source/fonts/**")
  .pipe(gulp.dest("build/fonts"))
}
exports.sprite = sprite;


// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

// Np Minification Styles
const nominstyles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.nominstyles = nominstyles;

// js
const js = () => {
  return gulp.src("source/js/**/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("build/js"))
}
exports.js = js;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

// Watcher
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/**/*.js").on("change", sync.reload);
  gulp.watch("source/*.html").on("change", sync.reload);
}

// copy
const copy = () => {
  return gulp.src([
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}
exports.copy = copy;

// clean
const clean = () => {
  return del("build");
}
exports.clean = clean;

// build
const build = gulp.series(clean, copy, styles, nominstyles, fonts, js, images, makewebp, sprite, html);
exports.build = build;

// start task
exports.default = gulp.series(
  build, server, watcher
);

// dev task

const dev = gulp.series(
  styles, server, watcher
);
exports.dev = dev;
