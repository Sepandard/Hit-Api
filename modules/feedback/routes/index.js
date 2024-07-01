const { getFeedback } = require("../controller/getFeedback");
const { postFeedback } = require("../controller/insertFeedback");

const FeedbackRoute = {
    init:(app)=> {
        getFeedback(app),
        postFeedback(app)
    }
} 

module.exports = FeedbackRoute

