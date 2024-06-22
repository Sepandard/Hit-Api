const authRoute = require("./routes");

const AuthModule = {
  init: (app) => {
    authRoute.init(app)
    console.log("[module]: auth module loaded");
  },
};

module.exports = AuthModule;