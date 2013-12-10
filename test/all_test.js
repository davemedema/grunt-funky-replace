'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.all_test = {

  setUp: function(done) {
    done();
  },

  should_equal_baz: function(test) {
    var filenames = [
      'string_regexp.json',
      'function_regexp.json',
      'default_regexp.json',
      'static_replacement.json',
      'function_replacement.json',
      'multiple_srcs_one.json',
      'multiple_srcs_two.json',
    ];

    test.expect(filenames.length);

    filenames.forEach(function(filename) {
      var actualFile = grunt.file.read('tmp/' + filename);
      var actual = JSON.parse(actualFile);
      test.equal(actual.foo, 'baz', 'Should be equal (' + filename + ').');
    });

    test.done();
  },

  should_equal_current_package_version: function(test) {
    var actualFile = grunt.file.read('tmp/template_replacement.json');
    var actual = JSON.parse(actualFile);

    var pkgFile = grunt.file.read('package.json');
    var pkg = JSON.parse(pkgFile);

    test.expect(1);
    test.equal(actual.foo, pkg.version, 'Should be equal.');
    test.done();
  },

  should_equal_FOO: function(test) {
    var actualFile = grunt.file.read('test/fixtures/no_dest.json');
    var actual = JSON.parse(actualFile);

    test.expect(1);
    test.equal(actual.foo, 'FOO', 'Should be equal.');
    test.done();
  }

};
