
const HitModule = require('./modules/hit')
const AuthRoute = require('./modules/auth')
const FeedbackModule = require('./modules/feedback')
const initModules = (app) => {
    HitModule.init(app),
    AuthRoute.init(app),
    FeedbackModule.init(app)
};

module.exports = initModules;
