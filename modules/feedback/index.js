const feedbackRoute = require("./routes");

const FeedbackModule = {
  init: (app) => {
    feedbackRoute.init(app)
    console.log("[module]: feed module loaded");
  },
};

module.exports = FeedbackModule;