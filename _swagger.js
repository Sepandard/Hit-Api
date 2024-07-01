const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './modules/hit/controller/getHit.js',
    './modules/hit/controller/insertHit.js',
    './modules/auth/controller/login/login.js',
    './modules/auth/controller/signup/signup.js',
    './modules/feedback/controller/getFeedback.js',
    './modules/feedback/controller/insertFeedback.js',
];

swaggerAutogen(outputFile, endpointsFiles);
