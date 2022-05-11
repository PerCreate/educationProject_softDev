const Router = require('express');
const router = new Router();
const EmployeeController = require('../controller/employee.controller');
const authorization = require('../middlewares/authorization');

router.post('/createEmployee', authorization, EmployeeController.createEmployee);
router.post('/deleteEmployee', authorization, EmployeeController.deleteEmployee);
router.get('/getEmployees', authorization, EmployeeController.getEmployees);
router.get('/getFreeEmployees', authorization, EmployeeController.getFreeEmployees);

module.exports = router;