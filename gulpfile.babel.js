/**
 * @file Integration and automation of flow, babel, eslint and jest
 * @author Archit
 */

import gulp from "gulp";
import shell from "gulp-shell";
import rimraf from "rimraf";
import run from "run-sequence";
import watch from "gulp-watch";
import server from "gulp-live-server";

const paths = {
  src: ["./src/**/*.js"],
  destination: "./dist",
};

gulp.task("default", (cb) => {
  run("server", "build", "restart", "watch", cb);
});

gulp.task("build", (cb) => {
  run("clean", "lint", "babel", cb);
});

gulp.task("clean", (cb) => {
  rimraf(paths.destination, cb);
});

gulp.task("flow", shell.task(["flow"], { ignoreErrors: true }));

gulp.task("babel", shell.task(["babel --copy-files --out-dir dist --ignore *.test.js src"]));

gulp.task("test", shell.task(["npm t"], { ignoreErrors: true }));

gulp.task("coverage", shell.task(["nyc npm t"]));

gulp.task("reporter", shell.task(["nyc report --reporter=lcov"]));

gulp.task("lint", shell.task(["eslint src/**"], { ignoreErrors: true }));

let express;

gulp.task("server", () => {
  express = server.new(paths.destination);
});

gulp.task("restart", () => {
  express.start.bind(express)();
});

gulp.task("watch", () => watch(paths.src, () => {
  gulp.start("build");
}));
