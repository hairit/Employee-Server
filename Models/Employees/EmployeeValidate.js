module.exports = isValidate = (employee) => {
  var objectCheck = {
    errs: [],
    validate: true,
  };
  if (!employee.name) {
    objectCheck.validate = false;
    objectCheck.errs.push('Please provide employee name');
  }
  if (!employee.email) {
    objectCheck.validate = false;
    objectCheck.errs.push('Email is empty');
  } else {
    if (!employee.email.toString().includes('@')) {
      objectCheck.validate = false;
      objectCheck.errs.push('Email is invalid. It must include @ character');
    } else {
      if (employee.email.toString().includes(' ')) {
        objectCheck.validate = false;
        objectCheck.errs.push(
          'Email is invalid. Not allowed to include space character'
        );
      }
    }
  }
  if (!employee.phoneNumber) {
    objectCheck.validate = false;
    objectCheck.errs.push('Phone number is empty.');
  } else {
    if (employee.phoneNumber.length !== 10) {
      objectCheck.validate = false;
      objectCheck.errs.push('Phone number is invalid. Length must be 10');
    } else {
      if (employee.phoneNumber[0] !== '0') {
        objectCheck.validate = false;
        objectCheck.errs.push('Phone number must start with 0 character');
      }
    }
  }
  if (!employee.birthday) {
    objectCheck.validate = false;
    objectCheck.errs.push('Birthday is empty');
  }
  if (!employee.sex) {
    objectCheck.validate = false;
    objectCheck.errs.push('Sex is empty');
  }
  if (!employee.level) {
    objectCheck.validate = false;
    objectCheck.errs.push('Level is empty');
  }
  if (!employee.salary) {
    objectCheck.validate = false;
    objectCheck.errs.push('Salary is empty');
  }
  if (!employee.position) {
    objectCheck.validate = false;
    objectCheck.errs.push('Position is empty');
  }
  return objectCheck;
};
