
var sass = require('gulp-sass')(require('sass'));
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');


gulp.task('styles', function () {
     var processors = [
         cssnext({})
     ];

    return gulp.src('assets/scss/style.scss')
         .pipe(sass())
         .pipe(postcss(processors))
         .pipe(notify("success"))
         .pipe(gulp.dest('static/'))
         .pipe(livereload());
    });

gulp.task('watch:styles', function () {
    livereload.listen();
    gulp.watch('assets/scss/**/*.scss', gulp.series('styles'));
});
