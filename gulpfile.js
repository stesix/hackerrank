const gulp = require('gulp');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');
const exec = require('gulp-exec');

const options = {
    continueOnError: true, // default = false, true means don't emit error event
    pipeStdout: true // default = false, true means stdout is written to file.contents
};

var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
};

gulp.task('run', function() {
    return watch([ "**/run.js", "!node_modules/", "!.git/" ], { ignoreInitial: true })
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(exec('./run.sh "$( basename $( dirname "<%= file.path %>" ) )"', options))
        .pipe(exec.reporter(reportOptions));
});

gulp.task('default', ['run']);
