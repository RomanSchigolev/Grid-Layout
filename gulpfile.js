var gulpversion   = '4'; // 3 or 4

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    minCss        = require('gulp-clean-css'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglifyjs')
    cssnano       = require('gulp-cssnano'),
    rename        = require('gulp-rename')
    del           = require('del'),
    autoprefixer  = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

// gulp.task('scripts', function(){
//     return gulp.src([
//         'app/libs/jquery-3.3.1.min.js',
//       //'app/libs/wow.min.js',
//       //'app/libs/jquery-ui.min.js',
//     ])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.reload({stream:true}))
// });

gulp.task('code', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream:true}))
});

// gulp.task('css-libs', ['sass'], function(){
//     return gulp.src('app/css/libs.css')
//     .pipe(cssnano())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('app/css'));
// });

gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('clean', function(){
    return del.sync('dist');
});

if (gulpversion == 3){
    gulp.task('watch', ['browserSync', 'sass', 'scripts'], function(){
        gulp.watch('app/scss/**/*.scss', ['sass']);
        gulp.watch('app/*.html', ['code']);
        gulp.watch('app/js/**/*.js', ['scripts']);
    });
    gulp.task('default', ['watch']);
}

if (gulpversion == 4){
    gulp.task('watch', function(){
        gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
        gulp.watch('app/*.html', gulp.parallel('code'));
        // gulp.watch('app/js/**/*.js', gulp.parallel('scripts'));
    });
    
    gulp.task('default', gulp.parallel('watch', 'browserSync', 'sass', /*'scripts' */ ))
}

// gulp.task('build', ['clean', 'sass', 'scripts'], function(){
//     var buildCss = gulp.src([
//         'app/css/main.css',
//         'app/css/libs.min.css',
//     ])
//     .pipe(gulp.dest('dist/css'));

//     var buildFonts = gulp.src('app/fonts/**/*')
//     .pipe(gulp.dest('dist/fonts'));

//     var builsJs = gulp.src('app/js/**/*')
//     .pipe(gulp.dest('dist/js'));

//     var buildHtml = gulp.src('app/*.html')
//     .pipe( gulp.dest('dist'));

//     var buildImg = gulp.src('app/img/**/*')
//     .pipe(gulp.dest('dist/img'));
// });

