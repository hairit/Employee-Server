const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/EmployeeController.js');

router.get('/', EmployeeController.getEmployees);
// router.get(
//   '/page/:_page?/perPage/:_perPage?',
//   EmployeeController.getEmployeesPaging
// );
router.get(
  '/page/:_page?/perPage/:_perPage?',
  EmployeeController.getEmployeesPagingMongoose
);
router.get('/name/:_name?', EmployeeController.getEmployeeByName);
router.get('/id/:_id?', EmployeeController.getEmployeeByID);
router.post('/', EmployeeController.addEmployee);
router.put('/:_id', EmployeeController.updateEmployee);
router.delete('/:_id', EmployeeController.deleteEmployee);

module.exports = router;
