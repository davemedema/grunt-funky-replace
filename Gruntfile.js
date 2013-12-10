/*
 * grunt-funky-replace
 * https://github.com/davemedema/grunt-funky-replace
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Config
  // ---

  grunt.initConfig({

    // package.json
    pkg: grunt.file.readJSON('package.json'),

    // `clean`
    clean: {
      all: ['tmp']
    },

    // `funky_replace`
    funky_replace: {
      string_regexp: {
        options: {
          regexp: 'FOO',
          replacement: 'baz'
        },
        src: ['test/fixtures/one.json'],
        dest: 'tmp/string_regexp.json'
      },
      function_regexp: {
        options: {
          regexp: function() {
            return (/FOO/);
          },
          replacement: 'baz'
        },
        src: ['test/fixtures/one.json'],
        dest: 'tmp/function_regexp.json'
      },
      default_regexp: {
        options: {
          regexp: /FOO/,
          replacement: 'baz'
        },
        src: ['test/fixtures/one.json'],
        dest: 'tmp/default_regexp.json'
      },
      static_replacement: {
        options: {
          regexp: /FOO/,
          replacement: 'baz'
        },
        src: ['test/fixtures/one.json'],
        dest: 'tmp/static_replacement.json'
      },
      template_replacement: {
        options: {
          regexp: /FOO/,
          replacement: '<%= pkg.version %>'
        },
        src: ['test/fixtures/one.json'],
        dest: 'tmp/template_replacement.json'
      },
      function_replacement: {
        options: {
          regexp: /(FOO)/,
          replacement: function(matches) {
            return (matches[1] === 'FOO') ? 'baz' : '';
          }
        },
        src: ['test/fixtures/one.json'],
        dest: 'tmp/function_replacement.json'
      },
      multiple_srcs: {
        options: {
          regexp: /FOO/,
          replacement: 'baz'
        },
        files: {
          'tmp/multiple_srcs_one.json': ['test/fixtures/one.json'],
          'tmp/multiple_srcs_two.json': ['test/fixtures/two.json']
        }
      },
      no_dest: {
        options: {
          regexp: /FOO/,
          replacement: 'FOO'
        },
        src: ['test/fixtures/no_dest.json']
      }
    },

    // `jshint`
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    // `nodeunit`
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Load tasks
  // ---

  grunt.loadTasks('tasks');

  // npm tasks
  // ---

  require('load-grunt-tasks')(grunt);

  // Task aliases
  // ---

  grunt.registerTask('default', ['test']);

  grunt.registerTask('release', function(type) {
    grunt.task.run('test');
    grunt.task.run('funky_bump:' + (type || 'patch'));
    grunt.task.run('funky_tag');
  });

  grunt.registerTask('test', ['clean', 'jshint', 'funky_replace', 'nodeunit']);
  grunt.registerTask('t', ['test']);

};
