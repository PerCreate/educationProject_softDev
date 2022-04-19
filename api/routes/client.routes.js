const Router = require('express');
const router = new Router();
const ClientController = require('../controller/client.controller');

router.post('/createClient', ClientController.createClient);
router.get('/loginClient', ClientController.loginClient);

module.exports = router;