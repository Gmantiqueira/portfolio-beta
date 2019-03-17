/*
 * DEFININDO O NOME DO VIRTUALHOST PARA SER CRIADO AUTOMATICAMENTE
 * nomedoprojeto.rev
 */
const host = "portfolio.local";

/*
 * DEFININDO OS SCRIPTS E OS ARQUIVOS CSS QUE SERÃO UTILIZADOS NO PROJETO
 */

const scripts = [
  "node_modules/jquery.mmenu/dist/jquery.mmenu.all.js",
  "js/main.js"
];

const styles = [
  "node_modules/font-awesome/css/font-awesome.min.css",
  "css/style.css"
];

const watchList = ["*.html"];

/*
 * DEFININDO QUAIS AS VERSÕES PARA USAR O AUTOPREFIX DO CSS
 */
const autoPrefixBrowserList = [
  "last 2 version",
  "safari 5",
  "ie 8",
  "ie 9",
  "opera 12.1",
  "ios 6",
  "android 4"
];

/*
 * CARREGANDO AS DEPENDENCIAS USADAS PELO GULP
 */

const browserSync = require("browser-sync");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const shell = require("gulp-shell");
const uglify = require("gulp-uglify");
const gutil = require("gulp-util");
const gulpSequence = require("gulp-sequence");
const argv = require("yargs").argv;

/*
 * Task: Handler Error
 * Function: Print on console the error
 * @err Error
 */
onError = function(err) {
  gutil.beep();
  gutil.log(gutil.colors.red.italic.bold(err + "\n"));
};

/*
 * TASK - CRIANDO SERVER DE AUTORELOAD COM BROWSERSYNC
 * @PROXY: URL AONDE SEU PROJETO ESTA ALOCADO
 */
/*
 * Task: BrowserSync
 * Function: Open a local server and refresh browser automatic on each change
 */
gulp.task("browserSync", function() {
  var key = argv.vhost;

  browserSync({
    proxy: key !== undefined ? key : host,
    notify: false
  });
});

gulp.task("bs-reload", function() {
  browserSync.reload();
});

/*
 * TASK - COMPILANDO ARQUIVO SASS
 */
gulp.task("sass", function() {
  return gulp
    .src("sass/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("css"));
});

/*
 * TASK - COMPILANDO O ARQUIVO CSS, COLOCANDO AUTOPREFIX PARA NAVEGADORES ANTIGOS
 */

gulp.task("css", function() {
  return gulp
    .src(styles)
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err);
          this.emit("end");
        }
      })
    )
    .pipe(
      autoprefixer({
        browsers: autoPrefixBrowserList,
        cascade: true
      })
    )
    .on("error", gutil.log)
    .pipe(concat("style.css"))
    .pipe(gulp.dest("css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("css"));
});

gulp.task("style", function(cb) {
  gulpSequence("sass", "css")(cb);
});

/*
 * TASK PADRÃO PARA RODAR O GULP
 * 1) RODA AS FUNÇÕES PARA CONCATENAR OS ARQUIVOS
 */
gulp.task("default", ["style"], function() {});

/*
 * TASK WATCH PARA RODAR O GULP
 * 1) INICIA O WEB SERVER E O BROWSERSYNC
 * 2) COMPRIME TODOS OS ARQUIVOS E GERA O ARQUIVO FINAL
 */
gulp.task("watch", ["default", "browserSync"], function() {
  // ALTERAÇÕES NOS ARQUIVOS DO SITE
  gulp.watch("sass/*.scss", ["style", "bs-reload"]);

  // QUALQUER ALTERAÇÃO NO PROJETO, FAZ O RELOAD DA PAGINA
  gulp.watch(watchList, ["bs-reload"]);
});
