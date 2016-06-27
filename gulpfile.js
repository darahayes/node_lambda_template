var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var awsLambda = require("node-aws-lambda");

gulp.task('clean', function() {
    return del(['./build', './build.zip']);
});

gulp.task('js', function() {
    return gulp.src(['index.js', '*/*.js'])
        .pipe(gulp.dest('build/'));
});

gulp.task('node-mods', function() {
    return gulp.src('./package.json')
        .pipe(gulp.dest('build/'))
        .pipe(install({production: true}));
});

gulp.task('zip', function() {
    return gulp.src(['build/**/*', '!build/package.json'])
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('upload', function(callback) {
    awsLambda.deploy('./build.zip', require("./lambda-config.js"), callback);
});

gulp.task('build', function(callback) {
    return runSequence(
        ['clean'],
        ['js', 'node-mods'],
        ['zip'],
        ['upload'],
        callback
    );
});

gulp.task('deploy', ['build', 'upload']);