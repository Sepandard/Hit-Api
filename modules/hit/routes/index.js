
const { insertHit } = require('../controller/insertHit')
const { getAllHit, getHitByType } = require('../controller/getHit')
const HitRoute = {
    init:(app)=> {
        insertHit(app);
        getAllHit(app);
        getHitByType(app);
    }
} 

module.exports = HitRoute

