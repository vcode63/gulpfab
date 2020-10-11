const { src, dest, watch, parallel, series } = require('gulp')
const sass = require('gulp-sass')
const bs = require('browser-sync').create();
const del = require('del')


const port = '8080'
const paths = {
    css: {
        src: ['src/css/**/*scss'],
        dest: 'dist/css'
    },
    html: {
        src: ['src/*.html'],
        dest: 'dist'
    }

}

function hmtl () {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
}

function style () {
    return src(paths.css.src)
        .pipe(sass())
        .pipe(dest(paths.css.dest))
        .pipe(bs.stream())
}

const clean = () => del(['dist'])

const watchFiles = () => {
    watch(paths.css.src, style)
    watch(paths.html.src, hmtl).on('change', bs.reload)
}

const browserSync = () => {
    bs.init({
        server: { baseDir: './dist/' },
        port: port
    })
}


module.exports = {
    watch: parallel(watchFiles, browserSync),
    default: parallel(hmtl, style)
}