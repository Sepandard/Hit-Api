const client = require('../../../config/postgres');
const ResponseMessages = require('../../../contract/responseMessages.js');


exports.getFeedback = (app) => {

  app.get('/api/feedback', async (req, res, next) => {
  
    await client.query(
      `select id , message ,feeling
      from public.feedback 
      `,
      [],
      (err, result) => {
        if (result) {
          if (!err) {
              const data = result.rows;
              res.status(200).json(data);
          }
        } else {
          res
            .status(200)
            .json({
              err
            });
        }
      }
    );
    

    try {
      
    } catch (error) {
        next(error); 
    }
}); 


  
  }