const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const Employee = require("../models/employee");

//add new company
router.post("/", (req, res) => {
  console.log(req.body);
  //check don't have an empty input
  if (
    !req.body.name ||
    !req.body.registerNumber ||
    !req.body.city ||
    !req.body.state ||
    !req.body.phoneNumber ||
    !req.body.registerDate
  ) {
    return res.status(400).json({ errMsg: "Empty field" });
  }
  //find that company isn't exist in our db
  Company.findOne(
    {
      $or: [
        {
          name: req.body.name.toLowerCase(),
        },
        {
          registerNumber: req.body.registerNumber,
        },
      ],
    },
    (err, company) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      if (company) return res.status(400).json({ errMsg: "Company exist" });

      // Making new company object
      let newName = req.body.name;
      newName = newName.toLowerCase();
      const newCompany = new Company({
        name: newName,
        registerNumber: req.body.registerNumber,
        city: req.body.city,
        state: req.body.state,
        phoneNumber: req.body.phoneNumber,
        registerDate: req.body.registerDate,
      });

      //saving new company
      newCompany.save(function (err, company) {
        if (err)
          return res.status(500).json({ errMsg: "Something went wrong..." });
        res.status(200).json({ company, msg: "success" });
      });
    }
  );
});

//get all companies
router.get("/all", (req, res) => {
  //find all companies
  Company.find({}, (err, companies) => {
    if (err) return res.status(500).json({ errMsg: "Something went wrong..." });
    return res.status(200).render("./index", { companies });
  });
});

//get one companies with employees
router.get("/getOne/:id", (req, res) => {
  Company.findOne({ _id: req.params.id }, (err, company) => {
    if (err)
      return res.status(500).json({ errMsg: "Something went wrong2..." });
    Employee.find({ company: company._id }, (err, employees) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong3..." });
      let newName =
        company.name.charAt(0).toUpperCase() + company.name.slice(1);
      company.name = newName;
      return res.render("./info", { company, employees });
    });
  });
});

//get one company
router.get("/:id", (req, res) => {
  //find that company
  Company.findOne({ _id: req.params.id }, (err, company) => {
    if (err) return res.status(500).json({ errMsg: "Something went wrong..." });
    res.status(200).json({ company, msg: "success" });
  });
});

//update company
router.put("/:id", (req, res) => {
  console.log(req.body);
  let uniqueCompany;
  //check don't have an empty input
  if (
    !req.body.name ||
    !req.body.registerNumber ||
    !req.body.city ||
    !req.body.state ||
    !req.body.phoneNumber ||
    !req.body.registerDate
  ) {
    return res.status(400).json({ errMsg: "Empty field" });
  }
  req.body.name = req.body.name.toLowerCase();
  req.body.city = req.body.city.toLowerCase();
  req.body.state = req.body.state.toLowerCase();
  Company.findOne(
    {
      _id: req.params.id,
    },
    (err, company) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });

      if (company.name !== req.body.name) {
        uniqueCompany = [
          {
            name: req.body.name,
          },
        ];
      }
      if (company.registerNumber !== req.body.registerNumber) {
        if (uniqueCompany === undefined) {
          uniqueCompany = [
            {
              registerNumber: req.body.registerNumber,
            },
          ];
        } else {
          uniqueCompany = [
            {
              name: req.body.name,
            },
            {
              registerNumber: req.body.registerNumber,
            },
          ];
        }
      }

      //Check the name and registerNumber of Company aren't exists in our database
      if (uniqueCompany !== undefined) {
        //check
        Company.findOne(
          {
            $or: uniqueCompany,
          },
          (err2, newCompany) => {
            if (err2)
              return res
                .status(500)
                .json({ errMsg: "Something went wrong..." });
            if (newCompany)
              return res.status(400).json({ errMsg: "Company exist" });
            //update company
            Company.findByIdAndUpdate(
              req.params.id,
              req.body,
              {
                new: true,
              },
              (err, company) => {
                if (err)
                  return res
                    .status(500)
                    .json({ errMsg: "Something went wrong..." });
                return res.status(200).json({ company, msg: "successfully" });
              }
            );
          }
        );
      } else {
        //update company
        Company.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          },
          (err, company) => {
            if (err)
              return res
                .status(500)
                .json({ errMsg: "Something went wrong..." });
            return res.status(200).json({ company, msg: "successfully" });
          }
        );
      }
    }
  );
});

//delete a company
router.delete("/:id", (req, res) => {
  //find company with this id
  Company.findOne({ _id: req.params.id }, (err, company) => {
    if (err) return res.status(500).json({ errMsg: "Something went wrong..." });
    if (!company) return res.status(404).json({ errMsg: "Company Not Found!" });
    //delete company
    company.deleteOne((err, company) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      //delete employees of this company
      Employee.deleteMany({ company: company._id }, (err) => {
        if (err)
          return res.status(500).json({ errMsg: "Something went wrong..." });
      });
    });
  });
});

//get companies that registerDate less 1 year
router.get("/get/lessOneYear", (req, res) => {
  //take the now moment and subtract a year from it
  let lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  //get companies that grater 1 year registerDate
  Company.find({ registerDate: { $gt: lastYear } }, (err, companies) => {
    if (err) return res.status(500).json({ errMsg: "Something went wrong..." });
    let nameOfCompanies = [];
    companies.forEach((element) => {
      nameOfCompanies.push(element.name);
    });
    res.status(200).json({ nameOfCompanies, msg: "successfully" });
  });
});

//set city and state of all companies to tehran
router.get("/update/allCity", (req, res) => {
  Company.updateMany(
    {},
    [{ $set: { state: "tehran", city: "tehran" } }],
    (err, comp) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      Company.find({}, (err, companies) => {
        if (err) return res.status(500).json({ errMsg: "successfully" });
        res.status(200).json({ companies });
      });
    }
  );
});

//get all companies that register date between 2 optional date
router.post("/getDate", (req, res) => {
  //find all companies
  Company.find(
    {
      registerDate: {
        $gte: req.body.from,
        $lte: req.body.to,
      },
    },
    (err, newCompanies) => {
      if (err)
        return res.status(500).json({ errMsg: "Something went wrong..." });
      return res.json({ newCompanies });
    }
  );
});

//get names of manager companies
router.get("/get/companiesManagerNames", (req, res) => {
  //find all manager of companies and return first name,last name and company's name
  Company.find({}, { name: 1, _id: 0 }, (err, company) => {
    if (err) return res.status(500).json({ errMsg: "Something went wrong..." });
    Employee.find(
      { isManager: true },
      { _id: 0, __v: 0, isManager: 0, gender: 0, nationalCode: 0, birthDate: 0 }
    )
      .populate("company", { name: 1, _id: 0 })
      .exec((err, ceo) => {
        if (err)
          return res.status(500).json({ errMsg: "Company hasn't a manager" });
        res.json({ ceo });
      });
  });
});

module.exports = router;
