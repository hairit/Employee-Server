const Employees = require('../Models/Employees/Employees.js');
const isValidate = require('../Models/Employees/EmployeeValidate.js');

const getEmployeesPaging = async (req, res) => {
  if (!req.params._perPage) {
    res.status(400).send('PerPage is invalid');
  } else {
    try {
      const perPage = req.params._perPage;
      const page = req.params._page ? req.params._page : 1;
      if (perPage > 0 && page > 0) {
        const employees = await Employees.find();
        const totalEmployees = employees.length;
        if (totalEmployees <= perPage) {
          res.status(200).send({
            employees: employees,
            total: employees.length,
          });
        } else {
          const numberOfPage = Math.floor(totalEmployees / perPage) + 1;
          var employeePages = [];
          var i = 0;
          for (var pageNumber = 0; pageNumber < numberOfPage; pageNumber++) {
            var pageIndex = [];
            var dem = 0;
            while (dem < perPage) {
              pageIndex.push(employees[i]);
              if (i === employees.length - 1) break;
              i++;
              dem++;
            }
            employeePages.push(pageIndex);
          }
          res.status(200).send({
            employees: employeePages[page - 1],
            total: totalEmployees,
          });
        }
      } else {
        res.status(400).send('Make sure perPage and page > 0 ');
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

const getEmployeesPagingMongoose = async (req, res) => {
  if (!req.params._perPage) {
    res.status(400).send('PerPage is invalid');
  } else {
    try {
      const perPage = req.params._perPage;
      const page = req.params._page ? req.params._page : 1;
      if (perPage > 0 && page > 0) {
        const employees = await Employees.find({});
        Employees.find({})
          .limit(perPage)
          .skip(perPage * (page - 1))
          .then((results) => {
            return res.status(200).send({
              employees: results,
              total: employees.length,
            });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } else {
        res
          .status(400)
          .send('Make sure perPage and page is number and greater than 0 ');
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

const getEmployeesByName = async (req, res) => {
  if (req.params._name) {
    try {
      const employees = await Employees.find({
        name: {
          $regex: req.params._name,
          $options: 'i',
        },
      });
      res.status(200).send(employees);
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    try {
      const employees = await Employees.find();
      res.status(200).send(employees);
    } catch (err) {
      res.status(404).send(err);
    }
  }
};

const addEmployee = async (req, res) => {
  if (req.body) {
    const checkEmployee = isValidate(req.body);
    if (checkEmployee.validate) {
      try {
        const newEmployee = await Employees.create(req.body);
        await newEmployee.save((err) => {
          if (err) res.status(400).send(err);
        });
        res.status(201).send(newEmployee);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(400).send(checkEmployee.errs);
    }
  } else {
    res.status(400).send('No data');
  }
};

const updateEmployee = async (req, res) => {
  if (req.body) {
    if (req.params._id) {
      const checkEmployee = isValidate(req.body);
      if (checkEmployee.validate) {
        try {
          await Employees.findByIdAndUpdate(req.params._id, req.body);
          const employeeNewVersion = await Employees.findById({
            _id: req.params._id,
          });
          res.status(200).send(employeeNewVersion);
        } catch (err) {
          res.status(404).send(err);
        }
      } else {
        res.status(400).send(checkEmployee.errs);
      }
    } else {
      res.status(400).send('_id is empty');
    }
  } else {
    res.status(400).send('No data to update');
  }
};

const deleteEmployee = async (req, res) => {
  if (req.params._id) {
    try {
      const employee = await Employees.findByIdAndDelete({
        _id: req.params._id,
      });
      res.status(200).send(employee);
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    res.status(400).send('No employee _id to delete');
  }
};

module.exports.addEmployee = addEmployee;
module.exports.updateEmployee = updateEmployee;
module.exports.deleteEmployee = deleteEmployee;
module.exports.getEmployeesByName = getEmployeesByName;
module.exports.getEmployeesPaging = getEmployeesPaging;
module.exports.getEmployeesPagingMongoose = getEmployeesPagingMongoose;
