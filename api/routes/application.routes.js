const Router = require('express');
const router = new Router();
const ApplicationController = require('../controller/application.controller');

router.post('/createApplication', ApplicationController.createApplication);
router.post('/deleteApplication', ApplicationController.deleteApplication);

module.exports = router;