const gulp         = require('gulp');
const gulpsync     = require('gulp-sync')(gulp);

const sass         = require('gulp-sass');
const csso         = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const mmq          = require('gulp-merge-media-queries');
const babel        = require('gulp-babel');
const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');
const inlinesource = require('gulp-inline-source');
const minifyMarkup = require('gulp-htmlmin');
const imagemin     = require('gulp-imagemin');
const cache        = require('gulp-cache');

const browserSync  = require('browser-sync').create();
const pngquant     = require('imagemin-pngquant');

const del          = require('del');


const SOURCE_FOLDER = './src';
const OUTPUT_FOLDER = './dist';

const FOLDERS = {
  source: {
    folder:    `${SOURCE_FOLDER}`,
    html:      `${SOURCE_FOLDER}/*.html`,
    favicon:   `${SOURCE_FOLDER}/favicon.ico`,
    styles:    `${SOURCE_FOLDER}/sass/**/*.scss`,
    scripts:   `${SOURCE_FOLDER}/js/**/*.js`,
    images:    `${SOURCE_FOLDER}/img/**/*`,
    fonts:     `${SOURCE_FOLDER}/fonts/**/*`,
  },
  output: {
    folder:     `${OUTPUT_FOLDER}`,
    html:       `${OUTPUT_FOLDER}`,
    styles:     `${OUTPUT_FOLDER}/css`,
    scripts:    `${OUTPUT_FOLDER}/js`,
    images:     `${OUTPUT_FOLDER}/img`,
    fonts:      `${OUTPUT_FOLDER}/fonts`,
  },
};


gulp.task('styles', () => {
  return gulp
    .src(FOLDERS.source.styles)
    .pipe(sass({
      // outputStyle: 'expanded', // nested | expanded | compact | compressed
      // indentedSyntax: true,
      // includePaths: [],
    }).on('error', sass.logError))
    .pipe(mmq({ log: true }))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest(FOLDERS.output.styles))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp
    .src([
      'node_modules/moveto/dist/moveTo.js',
      FOLDERS.source.scripts,
    ])
    .pipe(babel({
      presets: [
        ['env', {
          targets: { browsers: 'last 15 versions' },
        }],
      ],
    }))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(FOLDERS.output.scripts));
});

gulp.task('markup', () => {
  return gulp
    .src(FOLDERS.source.html)
    .pipe(inlinesource({
      compress: false,
      rootpath: FOLDERS.output.folder,
    }))
    .pipe(minifyMarkup({
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeComments: true,
      removeRedundantAttributes: true,
    }))
    .pipe(gulp.dest(FOLDERS.output.folder));
});

gulp.task('images', ['images:favicon'], () => {
  return gulp
    .src(FOLDERS.source.images)
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
    })))
    .pipe(gulp.dest(FOLDERS.output.images));
});

gulp.task('images:favicon', () => {
  return gulp
    .src(FOLDERS.source.favicon)
    .pipe(gulp.dest(FOLDERS.output.folder));
});

gulp.task('fonts', () => {
  return gulp
    .src(FOLDERS.source.fonts)
    .pipe(gulp.dest(FOLDERS.output.fonts));
});

gulp.task('clean', () => del.sync('dist'));

gulp.task('build', gulpsync.sync(['clean', 'scripts', ['styles', 'images', 'fonts', 'markup']]));

gulp.task('default', ['build']);

gulp.task('serve', () => {
  browserSync.init({
    server: OUTPUT_FOLDER,
    notify: false,
  });
});

gulp.task('watch', ['serve', 'markup', 'styles', 'scripts'], () => {
  gulp.watch(FOLDERS.source.styles,  ['styles']);
  gulp.watch(FOLDERS.source.html,    ['markup',  browserSync.reload]);
  gulp.watch(FOLDERS.source.scripts, ['scripts', browserSync.reload]);
});
