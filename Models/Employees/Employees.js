const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  name: String,
  birthday: Date,
  sex: String,
  phoneNumber: String,
  email: String,
  level: String,
  position: String,
  salary: Number,
});

const employees = mongoose.model('employee', EmployeeSchema);
module.exports = employees;
