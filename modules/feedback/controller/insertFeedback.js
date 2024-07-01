const client = require('../../../config/postgres.js');

exports.postFeedback = (app) => {

  app.post('/api/feedback', async (req, res, next) => {
    let userId = null
    if(req.headers.authorization){
    const token = req.headers.authorization?.split(' ')[1];
    userId = jwt.decode(token).id;
}
    const { feeling, message } = req.body;

    await client.query(
        `
        INSERT INTO public.feedback(
            "userId", "message", "feeling", "creationTime")
            VALUES ($1, $2, $3, NOW())
            RETURNING *; `,
        [
            userId,
            message,
            feeling
        ],
        (err, result) => {
          if (!err) {
            if (result) {
              res.status(200).json(result.rows);
            } else {
              res.status(500).json(ResponseMessages.UNKNOWN_ERROR);
            }
          } else {
            console.log(err);
            res.status(500).json(ResponseMessages.UNKNOWN_ERROR);
          }
        }
      );
  

  try {
    
  } catch (error) {
      next(error); 
  }
}); 
  
  }