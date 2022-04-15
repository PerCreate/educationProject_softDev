const Router = require('express');
const router = new Router();
const CurrentOrdersController = require('../controller/currentOrders.controller');

router.post('/addCurrentOrder', CurrentOrdersController.createOrder);
router.post('/deleteCurrentOrder', CurrentOrdersController.deleteOrder);

module.exports = router;