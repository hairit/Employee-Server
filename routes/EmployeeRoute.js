const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/EmployeeController.js');

// router.get(
//   '/page/:_page?/perPage/:_perPage?',
//   EmployeeController.getEmployeesPaging
// );
router.get(
  '/page/:_page?/perPage/:_perPage?',
  EmployeeController.getEmployeesPagingMongoose
);
router.get('/name/:_name?', EmployeeController.getEmployeeByName);
router.post('/', EmployeeController.addEmployee);
router.put('/:_id', EmployeeController.updateEmployee);
router.delete('/:_id', EmployeeController.deleteEmployee);

module.exports = router;
