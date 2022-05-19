const Router = require('express');
const router = new Router();
const Recommendation = require('../controller/recommendation.controller');

router.post('/getRecommendation', Recommendation.getRecommendation);

module.exports = router;