const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const Company = require("../models/company");

//add new employee
router.post("/", (req, res) => {
  //check input not empty
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.nationalCode ||
    !req.body.gender ||
    !req.body.birthDate ||
    !req.body.company ||
    req.body.isManager === undefined
  ) {
    return res.status(400).send("Empty input!");
  }
  //convert req.body.isManager input to boolean
  req.body.isManager = JSON.parse(req.body.isManager);
  req.body.company = req.body.company.trim();
  //check employee doesn't exist with this national code and this company hasn't a manager
  if (req.body.isManager === true) {
    Employee.find(
      { isManager: true, company: req.body.company },
      (err, employee) => {
        if (err)
          return res.status(500).json({ errMsg: "Something went wrong..." });
        if (employee.length > 0)
          return res.status(400).json({ errMsg: "One Manager" });
        Company.findById(req.body.company, (err, company) => {
          console.log(err, company);
          if (err)
            return res.status(500).json({ errMsg: "Something went wrong..." });
          if (!company)
            return res.status(400).json({ errMsg: "Company not found" });
          const newEmp = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationalCode: req.body.nationalCode,
            gender: req.body.gender,
            isManager: req.body.isManager,
            birthDate: new Date(req.body.birthDate),
            company: req.body.company.trim(),
          });
          //save new employee
          newEmp.save((err, employee) => {
            if (err) return res.status(500).json({ errMsg: "National code" });
            return res.status(200).json({ employee, msg: "success" });
          });
        });
      }
    );
  }

  if (req.body.isManager === false) {
    const newEmp = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationalCode: req.body.nationalCode,
      gender: req.body.gender,
      isManager: req.body.isManager,
      birthDate: new Date(req.body.birthDate),
      company: req.body.company.trim(),
    });
    //save employee
    newEmp.save((err, employee) => {
      //this national code exist in our database
      if (err) return res.status(500).json({ errMsg: "National code" });
      return res.status(200).json({ employee, msg: "success" });
    });
  }
});

//get all employees
router.get("/all", (req, res) => {
  Employee.find({}, { __v: 0 })
    .populate("company", { name: 1 })
    .exec((err, employees) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      res.status(200).json({ employees, msg: "success" });
    });
});

//get the employee
router.get("/:id", (req, res) => {
  Employee.findOne({ _id: req.params.id })
    .populate("company", { name: 1 })
    .exec((err, employee) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      res.status(200).json({ employee, msg: "success" });
    });
});

//update the employee
router.put("/:id", (req, res) => {
  console.log(req.body);
  // req.body.company = req.body.company.trim();
  //check input not empty
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.nationalCode ||
    !req.body.gender ||
    !req.body.birthDate ||
    req.body.isManager === undefined
  ) {
    return res.status(400).json({ errMsg: "Empty input!" });
  }
  req.body.isManager = JSON.parse(req.body.isManager);
  req.body.birthDate = new Date(req.body.birthDate);
  if (req.body.isManager === false) {
    Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, employee) => {
        if (err) return res.status(500).json({ errMsg: "National code" });
        return res.json({ employee, msg: "successfully" });
      }
    );
  }
  if (req.body.isManager === true) {
    Employee.findOne(
      { isManager: true, company: req.body.company },
      (err, emp) => {
        console.log(emp);
        if (err)
          return res.status(500).json({ errMsg: "Something went wrong..." });
        if (!emp) {
          return res.status(400).json({ errMsg: "one manager" });
        }
        Employee.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true },
          (err, emp2) => {
            if (err) return res.status(500).json({ errMsg: "National code" });
            return res.json({ emp2, msg: "successfully" });
          }
        );
      }
    );
  }
});

//delete employee
router.delete("/:id", (req, res) => {
  Employee.findByIdAndDelete(req.params.id, (err) => {
    if (err) return res.status(500).json({ errMsg: "Something went wrong..." });
    return res.status(200).json({ msg: "successfully" });
  });
});

//get age of all employees between 20-30
router.get("/get/age", (req, res) => {
  //convert now moment and subtract 30 years
  let from = new Date();
  from.setFullYear(from.getFullYear() - 30);
  //convert now moment and subtract 20 years
  let to = new Date();
  to.setFullYear(to.getFullYear() - 20);
  //find age of employees between 20-30
  Employee.find(
    {
      birthDate: {
        $gte: from,
        $lte: to,
      },
    },
    { _id: false },
    (err, employees) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      res.status(200).json({ employees, msg: "successfully" });
    }
  );
});

//get all managers
router.get("/get/allManager", (req, res) => {
  //find all employees that isManager == true
  Employee.find({
    isManager: true,
  })
    .populate("company", { name: 1 })
    .exec((err, employees) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      res.json({ employees, msg: "successfully" });
    });
});

//get all of irancell employees
router.get("/get/allIrancellEmployee", (req, res) => {
  //find employee with irancell id company
  Employee.find({ company: "603e12dc513e5c2ff0a6993e" }, { __v: 0 })
    .populate("company", { name: 1 })
    .exec((err, employees) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      res.status(200).json({ employees, msg: "success" });
    });
});

//get irancell manager
router.get("/get/irancellManager", (req, res) => {
  //find manager of irancell and return only first name & last name
  Employee.find(
    { $and: [{ company: "603e12dc513e5c2ff0a6993e" }, { isManager: "true" }] },
    { firstName: 1, lastName: 1, _id: 0 },
    (err, employee) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      res.status(200).json({ employee, msg: "success" });
    }
  );
});

module.exports = router;
