const Router = require('express');
const router = new Router();
const ClientController = require('../controller/client.controller');

router.post('/createClient', ClientController.createClient);
router.post('/loginClient', ClientController.loginClient);
router.get('/checkSession', ClientController.checkSession);

module.exports = router;