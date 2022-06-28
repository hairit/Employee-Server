const express = require("express");
const router = express.Router();
const EmployeeController = require("../controller/EmployeeController.js");

router.get("/", EmployeeController.getEmployees);
router.get("/:_id", EmployeeController.getEmployeeByID);
router.get("/name/:_name", EmployeeController.getEmployeeByName);
router.post("/", EmployeeController.addEmployee);
router.put("/:_id", EmployeeController.updateEmployee);
router.delete("/:_id", EmployeeController.deleteEmployee);

module.exports = router;
