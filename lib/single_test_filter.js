"use strict";

var path = require("path");
var logger = require("testarmada-logger");
logger.prefix = "Mocha Plugin";

// Filter by one exact relative filename match, eg:
// --test=path/to/exact/test/filename.js
module.exports = function (tests, filename) {
  logger.log("Using mocha test filter: ", filename);

  var searchedForPath = path.resolve(filename);

  return tests.filter(function (t) {
    if (t.filename === searchedForPath) {
      return true;
    }
  });
};
