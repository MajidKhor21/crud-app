const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  nationalCode: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
  isManager: {
    type: Boolean,
    required: true,
  },
  birthDate: {
    type: Date,
    trim: true,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
