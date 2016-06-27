var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var awsLambda = require("node-aws-lambda");

//remove old build
gulp.task('clean', function() {
    return del(['./build', './build.zip']);
});

//copy index.js, */*.js but not tests into build
gulp.task('js', function() {
    return gulp.src(['index.js', '*/*.js', '!test/*'])
        .pipe(gulp.dest('build/'));
});

//install production deps in build
gulp.task('node-mods', function() {
    return gulp.src('./package.json')
        .pipe(gulp.dest('build/'))
        .pipe(install({production: true}));
});

//create build.zip
gulp.task('zip', function() {
    return gulp.src(['build/**/*', '!build/package.json'])
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function(callback) {
    return runSequence(
        ['clean'],
        ['js', 'node-mods'],
        ['zip'],
        callback
    );
});

//upload function to AWS Lambda
gulp.task('deploy', ['build'], function(callback) {
    awsLambda.deploy('./build.zip', require("./lambda-config.js"), callback);
});
