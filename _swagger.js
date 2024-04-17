const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './modules/hit/endpoint/hit.endpoint'
];

swaggerAutogen(outputFile, endpointsFiles);
