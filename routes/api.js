const express = require("express");
const router = express.Router();
const companyRouter = require("./company");
const employeeRouter = require("./employee");

router.get("/", (req, res) => {
  res.redirect("/company/all");
});

router.use("/employee", employeeRouter);
router.use("/company", companyRouter);

module.exports = router;
