/* eslint valid-jsdoc: 0 */
"use strict";

var fs = require("fs");

/**
 * Recursive function, takes a mocha test suite and returns a flattened list of
 * tagged suites found within
 */
function getSuites(suite, wantedTag) {
  var matchFoundIndex = -1;
  var suites = [];

  if (suite.title.indexOf("@" + wantedTag) > matchFoundIndex) {
    suites.push({
      file: suite.file,
      title: suite.title,
      fullTitle: suite.fullTitle(),
      pending: suite.pending
    });
  }

  suite.suites.forEach(function (s) {
    suites = suites.concat(getSuites(s, wantedTag));
  });

  return suites;
}

/**
 * Used as a mocha repoter for the test capturing phase
 */
module.exports = function (runner, options) {
  var outputPath = process.env.MOCHA_CAPTURE_PATH;
  if (!outputPath) {
    throw new Error("Environment variable MOCHA_CAPTURE_PATH must be defined");
  }

  // capture but do not run tests
  runner.run = function (done) {
    done();
  };

  // traverse suite structure and flattened list of tagged suites
  var suites = getSuites(runner.suite, options.reporterOptions.tag);

  // process .only greps
  if (options.grep) {
    suites = suites.filter(function (t) {
      return t.fullTitle.match(options.grep);
    });
  }

  fs.writeFileSync(process.env.MOCHA_CAPTURE_PATH, JSON.stringify(suites));
};
