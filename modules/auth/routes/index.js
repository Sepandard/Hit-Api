const { login } = require("../controller/login/login");
const { signup } = require("../controller/signup/signup");

const AuthRoute = {
    init:(app)=> {
        login(app),
        signup(app)
    }
} 

module.exports = AuthRoute

