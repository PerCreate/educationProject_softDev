const Router = require('express');
const router = new Router();
const ApplicationController = require('../controller/application.controller');
const authorization = require('../middlewares/authorization');

router.post('/createApplication', ApplicationController.createApplication);
router.post('/deleteApplication', authorization, ApplicationController.deleteApplication);
router.get('/getApplications', authorization, ApplicationController.getApplications);

module.exports = router;