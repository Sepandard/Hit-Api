
const HitModule = require('./modules/hit')
const AuthRoute = require('./modules/auth')
const initModules = (app) => {
    HitModule.init(app),
    AuthRoute.init(app)
};

module.exports = initModules;
