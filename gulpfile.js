const gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;


const path = {
    dev: {
        jade: 'assets/jade/index.jade',
        jade_watch: 'assets/jade/**/*.jade',
        js: 'assets/js/**/*.js',
        sass: 'assets/scss/front-end.scss',
        sass_watch: 'assets/scss/**/*.scss',
        img: 'images/**/*.{jpg,jpeg,png}'
    },

    public: {
        html: './',
        js: './',
        style: './',
        img: '/images/'
    }
};

  

gulp.task('jade', function() {   
    gulp.src(path.dev.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(path.public.html))
});



gulp.task('images-min', function () {
    gulp.src(dev.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(public.img))
});



gulp.task('sass', function () {
    return gulp.src(path.dev.sass)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 10 version'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(reload({stream: true}))
        .pipe(gulp.dest(path.public.style));
});



gulp.task('sass-dev', function () {
    return gulp.src('./assets/scss/frontend.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(reload({stream: true}))
        .pipe(gulp.dest(path.public.style));
});



gulp.task('js-dev', function() {
    return gulp.src(path.dev.js)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(reload({stream: true}))
        .pipe(gulp.dest(path.public.js));
});



gulp.task('js-min', function() {
    return gulp.src(path.dev.js)
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({compress: true}))
        .pipe(reload({stream: true}))
        .pipe(gulp.dest(path.public.js));
});



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('watch', function() {
    gulp.watch(path.dev.jade_watch, ['jade']);
    gulp.watch(path.dev.sass_watch, ['sass']);
    gulp.watch(path.dev.js, ['js-dev']);
    gulp.watch(path.dev.tpl).on('change', browserSync.reload)
});



gulp.task('uncss', function () {
    return gulp.src('./')
        .pipe(uncss({
            html: ['./index.html']
        }))
        .pipe(gulp.dest('uncss'));
});

gulp.task('dev', ['browser-sync', 'watch']);
gulp.task('default', ['sass', 'js-min', 'jade']);