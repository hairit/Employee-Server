const express = require("express");
const router = express.Router();
const EmployeeController = require("../controller/EmployeeController.js");

router.get("/", EmployeeController.getEmployees);
router.get(
  "/page/:_page/amount/:_amount",
  EmployeeController.getEmployeesPaging
);
// router.param("_id", (req, res, next, _id) => {
//   console.log("first call");
//   if (_id) {
//     next();
//   } else
//     res.status(400).json({
//       error: "No employee _id",
//     });
// });
router.get("/:_id", EmployeeController.getEmployeeByID);
// router.param('_id',function (){})

router.get("/name/:_name", EmployeeController.getEmployeeByName);
router.post("/", EmployeeController.addEmployee);
router.put("/:_id", EmployeeController.updateEmployee);
router.delete("/:_id", EmployeeController.deleteEmployee);

module.exports = router;
