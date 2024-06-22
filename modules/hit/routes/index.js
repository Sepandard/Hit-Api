
const { insertHit } = require('../controller/insertHit')
const { getAllHit, getHitByType, getHitRangeNumber } = require('../controller/getHit')
const HitRoute = {
    init:(app)=> {
        insertHit(app);
        getAllHit(app);
        getHitByType(app);
        getHitRangeNumber(app);
    }
} 

module.exports = HitRoute

