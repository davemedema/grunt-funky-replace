/*
 * grunt-funky-replace
 * https://github.com/davemedema/grunt-funky-replace
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  function failed(message, error) {
    if (error) grunt.log.error(error);
    grunt.fail.warn(message || 'Task failed.');
  }

  grunt.registerMultiTask('funky_replace', function() {
    var opts = this.options({
      regexp: null,
      replacement: ''
    });

    // Validate regexp
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
      grunt.log.error('Invalid regexp "' + regexp + '".');
      return;
    }

    // Loop through file mappings
    this.files.forEach(function(fileMapping) {
      // Make sure we have files to update
      var files = fileMapping.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (!files.length) {
        grunt.log.warn('No files to update.');
        return;
      }

      // Update
      files.forEach(function(filepath) {
        var src      = grunt.file.read(filepath);
        var destPath = (fileMapping.dest || filepath);
        var matches  = src.match(regexp);

        if (!matches) {
          grunt.log.warn('No matches not found.');
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

        src = src.replace(regexp, replacement);
        grunt.file.write(destPath, src);

        grunt.log.ok('Updated: ' + destPath);
      });
    });
  });

};
