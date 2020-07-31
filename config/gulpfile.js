const {src, dest, parallel} = require('gulp');
const lessLoader = require('gulp-less');
const rename = require('gulp-rename');
const path = require('path');

function less(){
    return src(path.resolve(__dirname, '../package/styles/*.less'))
        .pipe(lessLoader())
        .pipe(rename({extname: '.css'}))
        .pipe(dest(path.resolve(__dirname, '../bundle/styles/')))
}


module.exports.build = parallel(less)