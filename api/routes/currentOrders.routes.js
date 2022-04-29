const Router = require('express');
const router = new Router();
const CurrentOrdersController = require('../controller/currentOrders.controller');
const authorization = require('../middlewares/authorization');

router.post('/createOrder', authorization, CurrentOrdersController.createOrder);
router.post('/deleteCurrentOrder', CurrentOrdersController.deleteOrder);
router.get('/getOrders', authorization, CurrentOrdersController.getOrders);

module.exports = router;