var gulp = require('gulp');
var insert = require('gulp-insert');
var path = require('path');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var jade = require('gulp-jade');
var sprite = require('css-sprite').stream;
var gulpif = require('gulp-if');

var wait = require('gulp-wait');
var through = require('through2');
var nodemon = require('gulp-nodemon');
var nodeDebug = require('gulp-node-debug');
var shell = require('gulp-shell');
var livereload = require('gulp-livereload');
// development tasks
gulp.task('sass', function() {
    return gulp.src('app/frontend/scss/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('static/css'))
        .pipe(livereload());
});
gulp.task('sprites', function () {
    return gulp.src('app/docs/sprite/*.png')
        .pipe(sprite({
            name: 'sprite',
            style: '_sprite.scss',
            cssPath: '../img/',
            processor: 'scss'
        }))
        .pipe(gulpif('*.png', gulp.dest('static/img/'), gulp.dest('app/frontend/scss/kit')))
});
gulp.task('libs', function() {
    return gulp.src('app/frontend/js/libs/*.js')
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('static/js'))
});
gulp.task('scripts', function() {
    return gulp.src('app/frontend/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('static/js'))
        .pipe(livereload());
});
gulp.task('jade_client_compilation', function() {
    gulp.src('app/backend/templates/client/**/*.jade')
        .pipe(jade({
            client: true
        }))
        .pipe(modify())
        .pipe(concat('1_templates.js'))
        .pipe(insert.prepend('window.templates = {};\n'))
        .pipe(gulp.dest('app/frontend/js/'))
});
gulp.task('jade_livereload', function() {
    gulp.src('app/backend/templates/**/*.jade')
        .pipe(livereload());
});

gulp.task('jade_client_includes', ['jade_client_compilation'], function() {
    gulp.src('app/backend/templates/cl_*.jade')
        .pipe(livereload());
});

gulp.task('app_livereload', function() {
    gulp.src('app/backend/**/*.js')
        .pipe(wait(1000))
        .pipe(livereload());
});

// email template rendering for browser tests
gulp.task('email_dev', function () {
    var templateOptions = {
        headerText: 'Welcome to <a href="http://uniorg.nl">Uniorg</a> project!',
        bodyText: 'TEST !! '
    };
    gulp.src('app/backend/templates/emails/**/*.jade')
        .pipe(jade({
            locals: templateOptions
        }))
        .pipe(gulp.dest('app/docs/emailTest'))
});

//production compilation
gulp.task('libs_prod', function() {
    return gulp.src('app/frontend/js/libs/*.js')
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'))
});
gulp.task('sass_prod', function() {
    return gulp.src('app/frontend/scss/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('static/css'))
});
gulp.task('scripts_prod', ['jade_client_compilation'], function() {
    return gulp.src('app/frontend/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'))
});
//prod compiler task
gulp.task('compile', ['libs_prod', 'sass_prod', 'scripts_prod']);

//dev watcher
gulp.task('run', function () {
    nodemon({ script: 'app/backend/main.js', ext: 'js', ignore: ['static/*', 'frontend/*', 'gulpfile.js'] })
        .on('restart', function () {
            console.log('App restarted by nodemon!')
        });
});
//dev watcher
gulp.task('debug', function () {
    gulp.src(['app/backend/main.js'])
        .pipe(nodeDebug({
            webPort: 8081
        }));
});

gulp.task('mongoDev', shell.task([
    'echo "Starting MongoDB daemon..."',
    'mongod --auth --quiet --dbpath ./app/backend/db'
]));

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('app/frontend/js/*.js', ['scripts']);
    gulp.watch('app/frontend/js/libs/*.js', ['libs']);
    gulp.watch('app/frontend/scss/**/*.scss', ['sass']);
    gulp.watch('app/backend/templates/client/**/*.jade', ['jade_client_compilation']);
    gulp.watch('app/backend/templates/emails/**/*.jade', ['email_dev']);
    gulp.watch('app/backend/templates/cl_*.jade', ['jade_client_includes']);
    gulp.watch('app/backend/templates/**/*.jade', ['jade_livereload']);
    gulp.watch('app/backend/**/*.js', ['app_livereload']);
});

// Dev start
gulp.task('default', ['mongoDev', 'sass', 'libs', 'jade_client_compilation', 'scripts', 'watch']);

//Jade client templates binding
function modify() {
    function transform(file, enc, callback) {
        if (!file.isBuffer()) {
            this.push(file);
            callback();
            return;
        }
        var funcName = path.basename(file.path, '.js');
        var from = 'function template(locals) {';
        var to = 'window.templates.' + funcName + ' = function(locals) {';
        var contents = file.contents.toString().replace(from, to);
        file.contents = new Buffer(contents);
        this.push(file);
        callback();
    }
    return through.obj(transform);
}
