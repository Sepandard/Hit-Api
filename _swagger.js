const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './modules/hit/controller/getHit.js',
    './modules/hit/controller/insertHit.js',
];

swaggerAutogen(outputFile, endpointsFiles);
