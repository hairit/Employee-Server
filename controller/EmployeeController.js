const mongoose = require("mongoose");
const Employee = require("../Models/Employee.js");
// const Solver = require("../Solver.js");
mongoose.connect("mongodb://localhost:27017/manager");

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
  try {
    const employee = await Employee.findById({ _id: req.params._id });
    res.status(200).send(employee);
  } catch (errol) {
    console.log("something went wrong");
    res.status(400).end();
  }
};
const getEmployeeByName = async (req, res) => {
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
};
const addEmployee = async (req, res) => {
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
    console.log("Cannot create a employee" + err);
  }
};
const updateEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).end();
  } catch (Errol) {
    console.log("Something went wrong");
    res.status(404).end();
  }
};
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete({ _id: req.params._id });
    res.status(204).end();
  } catch (err) {
    console.log("Something went wrong");
    res.status(404).end();
  }
};
module.exports.getEmployees = getEmployees;
module.exports.getEmployeeByID = getEmployeeByID;
module.exports.addEmployee = addEmployee;
module.exports.updateEmployee = updateEmployee;
module.exports.deleteEmployee = deleteEmployee;
module.exports.getEmployeeByName = getEmployeeByName;
