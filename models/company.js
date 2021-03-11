const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  registerNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
  registerDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
