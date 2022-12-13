const livereload = require("gulp-livereload");
const gulp = require("gulp");
// gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin");
const { parallel } = require('gulp');
// gulp plugin to minify CSS, using clean-css
const cleanCSS = require('gulp-clean-css');
//  to cancat files
var concat = require('gulp-concat');
// Enabling you to compile your Pug templates into HTML
const pug = require('gulp-pug');








function pugtoHTML() {
  return gulp
    .src(["src/**/*.pug", "!src/0-mywork/comp/*.pug"])
    .pipe( pug({ pretty: true}))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
}



function movecss() {
  return gulp
    .src(["src/0-mywork/cssFiles/*.css"])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('all.css'))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
}
   

    



exports.default = function () {
  require("./server.js");
  livereload.listen();
  // livereload({ start: true })

  gulp.watch( ["src/**/*.pug", "src/**/*.css"]  ,  parallel(pugtoHTML, movecss) );
};
