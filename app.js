const express = require('express');
const cors = require('cors');
const employeeRoute = require('./routes/EmployeeRoute.js');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(
  'mongodb+srv://marcus:marcus@manager.oyxqgah.mongodb.net/manager?retryWrites=true&w=majority'
);

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use('/api/employee', employeeRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
