const Router = require('express');
const router = new Router();
const ClientController = require('../controller/client.controller');
const authorization = require('../middlewares/authorization');

router.post('/createClient', ClientController.createClient);
router.post('/loginClient', ClientController.loginClient);
router.get('/logoutClient', ClientController.logoutClient);
router.get('/checkSession', ClientController.checkSession);
router.get('/getClients', authorization, ClientController.getClients);

module.exports = router;