const express = require("express");
const cors = require("cors");
const employeeRoute = require("./routes/EmployeeRoute.js");

const app = express();
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
var corsNetlify = {
  origin: "https://frolicking-cat-20598e.netlify.app",
  optionsSuccessStatus: 200,
};
app.use(cors(corsNetlify));
app.use("/api/employee", employeeRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
