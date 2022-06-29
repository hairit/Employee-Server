const Employee = require("../Models/Employee.js");
const isValidate = require("../Models/EmployeeValidate.js");
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (err) {
    console.log("Something went wrong");
    res.status(400).end();
  }
};

const getEmployeeByID = async (req, res) => {
  if (req.params._id) {
    try {
      const employee = await Employee.findById({ _id: req.params._id });
      res.status(200).send(employee);
    } catch (err) {
      console.log("something went wrong" + err);
      res.status(404).end();
    }
  } else {
    res.status(404).send("No employee _id to get");
  }
};

const getEmployeeByName = async (req, res) => {
  if (req.params._name) {
    try {
      const employee = await Employee.find({
        name: {
          $regex: req.params._name,
          $options: "i",
        },
      });
      res.status(200).send(employee);
    } catch (errol) {
      console.log("something went wrong");
      res.status(400).end();
    }
  } else {
    console.log("no name");
  }
};

const addEmployee = async (req, res) => {
  const checkEmployee = isValidate(req.body);
  if (checkEmployee.validate) {
    try {
      const newEmployee = await Employee.create(req.body);
      await newEmployee.save((err) => {
        if (err) {
          res.status(400);
          throw err;
        }
      });
      res.status(201).send(newEmployee);
    } catch (err) {
      res.status(400).end();
    }
  } else {
    res.status(400).send(checkEmployee.errs);
  }
};

const updateEmployee = async (req, res) => {
  if (req.params._id) {
    const checkEmployee = isValidate(req.body);
    if (checkEmployee.validate) {
      try {
        await Employee.findByIdAndUpdate(req.params._id, req.body);
        const employeeNewVersion = await Employee.findById({
          _id: req.params._id,
        });
        res.status(200).send(employeeNewVersion);
      } catch (Errol) {
        res.status(404).end();
      }
    }
  } else {
    res.status(400).send("No _id employee");
  }
};

const deleteEmployee = async (req, res) => {
  if (req.params._id) {
    try {
      const employee = await Employee.findByIdAndDelete({
        _id: req.params._id,
      });
      res.status(204).end();
    } catch (err) {
      res.status(404).end();
    }
  } else {
    res.status(404).send("No employee _id to delete");
  }
};

module.exports.getEmployees = getEmployees;
module.exports.getEmployeeByID = getEmployeeByID;
module.exports.addEmployee = addEmployee;
module.exports.updateEmployee = updateEmployee;
module.exports.deleteEmployee = deleteEmployee;
module.exports.getEmployeeByName = getEmployeeByName;
