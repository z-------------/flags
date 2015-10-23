#!/usr/bin/env node

/**
 *  normalize file names
 *  example: Flag_of_Kukurbitasia.svg -> Kukurbitasia.svg
 */

var fs = require("fs");
var path = require("path");

var svgDirPath = path.join(__dirname, "svg");

var pattern = /[^A-Z0-9\-.\ ]/gi;

fs.readdir(svgDirPath, function(err, files) {
    if (err) throw err;

    for (filename of files) {
        if (!filename.match(pattern) || filename.toLowerCase() === ".ds_store") continue;
        
        var newFilename = filename.replace(/Flag_of_/gi, "").replace(/_/g, " ").replace(pattern, "-");

        console.log("renaming '%s' to '%s'", filename, newFilename);

        fs.rename(path.join(svgDirPath, filename), path.join(svgDirPath, newFilename), function(err) {
            if (err) throw err;
        });
    }
});
