/*
 * grunt-funky-replace
 * https://github.com/davemedema/grunt-funky-replace
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Exports.
 *
 * @param {Object} grunt
 */
module.exports = function(grunt) {

  // register task
  grunt.registerMultiTask('replace', function() {
    var opts = this.options({
      regexp: null,
      replacement: ''
    });

    // validate regexp
    var regexp = null;

    switch (typeof opts.regexp) {
      case 'string':
        regexp = new RegExp(opts.regexp);
        break;
      case 'function':
        regexp = opts.regexp();
        break;
      default:
        regexp = opts.regexp;
        break;
    }

    if (!regexp instanceof RegExp) {
      grunt.warn('Invalid regexp "' + regexp + '".');
    }

    // update
    this.files.forEach(function(fm) {
      fm.src.forEach(function(filepath) {
        var dest    = fm.dest || filepath;
        var fileStr = grunt.file.read(filepath);
        var matches = fileStr.match(regexp);

        if (!matches) {
          grunt.log.warn('No matches found in "' + filepath + '".');
          return;
        }

        var replacement = '';

        switch (typeof opts.replacement) {
          case 'function':
            replacement = opts.replacement(matches);
            break;
          default:
            replacement = opts.replacement;
            break;
        }

        fileStr = fileStr.replace(regexp, replacement);
        grunt.file.write(dest, fileStr);

        grunt.log.ok('Updated: ' + dest);
      });
    });
  });

};
