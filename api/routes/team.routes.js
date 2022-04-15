const Router = require('express');
const router = new Router();
const Team = require('../controller/team.controller');

router.post('/addEmployee', Team.createTeam);
router.post('/deleteEmployee', Team.deleteTeam);

module.exports = router;