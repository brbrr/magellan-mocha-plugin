module.exports = {
  getProfiles: function (browsers) {
    if (browsers.length > 0) {
      return [{ id: "mocha" }];
    } else {
      return [];
    }
  },

  getCapabilities: function (profile) {
    return { id: "mocha" };
  },

  listBrowsers: function () {

    return ["mocha"];
  }
};
