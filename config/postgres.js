const { Client } = require('pg');

const postgresQuery = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5433,
});
postgresQuery
  .connect() 
  .then(() => {
    console.log(`Connected to database Successfully ... !`.cyan.underline.bold);
  })
  .catch((err) => {
    console.log(err);
    console.log(
      `We have some problem to conncet to database ... ! ${err}`.red.underline
        .bold
    );
  });



module.exports = postgresQuery;
