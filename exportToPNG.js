#!/usr/bin/env node

/**
 *  a little script for converting svgs to png via inkscape.
 *  configure settings in the config object.
 */

var fs = require("fs");
var exec = require("child_process").exec;
var path = require("path");

var puts = function(error, stdout, stderr) {
    console.log(stdout);
};

var execute = function(command) {
    // exec(command, puts);
    exec(command);
};

var escapeSpaces = function(string) {
    return string.replace(/\s/g, "\\ ");
};

var config = {
    EXPORT_HEIGHT: 1000,
    SRC_DIR: "svg",
    DEST_DIR: "png"
};

var cwd = process.cwd();

var srcDir = path.join(cwd, config.SRC_DIR);
var destDir = path.join(cwd, config.DEST_DIR);

fs.mkdir(destDir, function(err) {
    if (!err) {
        console.log("destination dir ('" + destDir + "') didn't exist, created it.\n");
    }

    fs.readdir(path.join(cwd, config.SRC_DIR), function(err, files) {
        if (err) throw err;
        files.forEach(function(fileName) {
            var fileExtension = path.extname(fileName);
            if (fileExtension.toLowerCase() === ".svg") {
                var srcPath = path.join(srcDir, fileName);
                var destPath = path.join(destDir, fileName.substring(0, fileName.lastIndexOf("."))) + ".png";

                fs.exists(destPath, function(exists) {
                    if (!exists) {
                        console.log("will convert '%s'", path.basename(srcPath));
                        execute("inkscape --export-png=" + escapeSpaces(destPath) + " --export-height=" + config.EXPORT_HEIGHT + " " + escapeSpaces(srcPath));
                    }
                });
            }
        });
    });
});
