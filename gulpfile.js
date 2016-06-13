'use strict';

var gulp = require('gulp'),
    server = require( 'gulp-develop-server'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    fs = require('fs');



var paths = {
    server: './server.js',
    app: './public/js/app.js',
    dest: './public/js/'
};

//babel
gulp.task('build', function () {
    return browserify(paths.app)
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        //.pipe(fs.createWriteStream("bundle.js"));
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.dest));
});


//server start
gulp.task( 'server:start', function() {
    server.listen( { path: paths.server } );
});

// restart server if app.js changed
gulp.task( 'server:restart', function() {
    gulp.watch( [ paths.server ], server.restart );
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.app, ['build']);
});

//default
gulp.task('default', ['server:start', 'server:restart', 'watch']);