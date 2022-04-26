const Router = require('express');
const router = new Router();
const Team = require('../controller/team.controller');
const authorization = require('../middlewares/authorization');

router.post('/createTeam', Team.createTeam);
router.post('/deleteTeam', Team.deleteTeam);
router.get('/getTeams', authorization, Team.getTeams);

module.exports = router;