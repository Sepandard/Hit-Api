const hitRoute = require("./routes");

const HitModule = {
  init: (app) => {
    hitRoute.init(app)
    console.log("[module]: hit module loaded");
  },
};

module.exports = HitModule;