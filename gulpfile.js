"use strict";

const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");
const path = require("path");

build.addSuppression(/Warning - \[sass\] The local CSS class .* is not camelCase and will not be type-safe./gi);

// force use of projects specified typescript version
const typeScriptConfig = require("@microsoft/gulp-core-build-typescript/lib/TypeScriptConfiguration");
typeScriptConfig.TypeScriptConfiguration.setTypescriptCompiler(require("typescript"));

// force use of projects specified react version
build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        generatedConfiguration.externals = generatedConfiguration.externals.filter(
            (name) => !["react", "react-dom"].includes(name),
        );

        generatedConfiguration.module.rules.push({
            test: /\.js$/,
            include: [path.resolve(__dirname, "node_modules/recoil/es")],
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["babel-plugin-transform-object-rest-spread"],
                    cacheDirectory: false,
                },
            },
        });

        return generatedConfiguration;
    },
});

build.initialize(require("gulp"));

gulp.task("version-sync", (done) => {
    // import gulp utilits to write error messages
    const gutil = require("gulp-util");

    // import file system utilities form nodeJS
    const fs = require("fs");

    // read package.json
    var pkgConfig = require("./package.json");

    // read configuration of web part solution file
    var pkgSolution = require("./config/package-solution.json");

    // log old version
    gutil.log("Old Version:\t" + pkgSolution.solution.version);

    // Generate new MS compliant version number
    var newVersionNumber = pkgConfig.version.split("-")[0] + ".0";

    // assign newly generated version number to web part version
    pkgSolution.solution.version = newVersionNumber;

    // log new version
    gutil.log("New Version:\t" + pkgSolution.solution.version);

    // write changed package-solution file
    fs.writeFile("./config/package-solution.json", JSON.stringify(pkgSolution, null, 4), () => {
        gutil.log("Successfully written new version!");
        done();
    });
});
