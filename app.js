const express = require("express");
const cors = require("cors");
const employeeRoute = require("./routes/EmployeeRoute.js");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/employee", employeeRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
