const Router = require('express');
const router = new Router();
const EmployeeController = require('../controller/employee.controller');

router.post('/addEmployee', EmployeeController.createEmployee);
router.post('/deleteEmployee', EmployeeController.deleteEmployee);

module.exports = router;