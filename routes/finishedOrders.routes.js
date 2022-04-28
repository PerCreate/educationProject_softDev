const Router = require('express');
const router = new Router();
const FinishedOrdersController = require('../controller/currentOrders.controller');

router.post('/addFinishedOrder', FinishedOrdersController.createOrder);
router.post('/deleteFinishedOrder', FinishedOrdersController.deleteOrder);

module.exports = router;