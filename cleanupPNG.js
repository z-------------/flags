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

var paths = ["svg", "png"];

var cwd = process.cwd();

var files = [ [], [] ];

for (var i = 0; i < 2; i++) {
    var fileNames = fs.readdirSync(path.join(cwd, paths[i]));
    fileNames.forEach(function(fileName) {
        files[i].push(fileName.substring(0, fileName.indexOf(".")));
    });
}

var redundantPNGFileNames = [];
for (fileName of files[1]) {
    if (files[0].indexOf(fileName) === -1) {
        redundantPNGFileNames.push(fileName);
    }
}

for (fileName of redundantPNGFileNames) {
    var fn = fileName;
    fs.unlink(path.join(cwd, paths[1], fn + ".png"), function(err) {
        if (err) throw err;
        console.log("deleted '" + fn + ".png'");
    });
}
