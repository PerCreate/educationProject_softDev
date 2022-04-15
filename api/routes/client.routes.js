const Router = require('express');
const router = new Router();
const ClientController = require('../controller/client.controller');

router.post('/user', ClientController.createClient);

module.exports = router;