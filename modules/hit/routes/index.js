
const { insertHit } = require('../controller/insertHit')
const { getAllHit } = require('../controller/getHit')
const HitRoute = {
    init:(app)=> {
        insertHit(app);
        getAllHit(app);
    }
} 

module.exports = HitRoute

