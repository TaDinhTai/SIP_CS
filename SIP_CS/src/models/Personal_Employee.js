import mongoose from "mongoose";

// const PersonalEmployeeSchema = new mongoose.Schema({
//   employeeId: {
//     type: String,
//     // unique: true,
//   },
//   firstName: {
//     type: String,
//     // required: true,
//   },
//   lastName: {
//     type: String,
//   },
//   vacationDays: {
//     type: Number,
//     // required: true,
//   },
//   paidToDate: {
//     type: Number,
//     // required: true,
//   },
//   paidLastYear: {
//     type: Number,
//     // required: true,
//   },
//   payRate: {
//     type: Number,
//     // required: true,
//   },
//   payRateId: {
//     type: Number,
//     // required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   Employee_ID: String,
//   First_Name: String,
//   Last_Name: String,
//   Middle_Initial: String,
//   Address1: String,
//   Address2: String,
//   City: String,
//   State: String,
//   Zip: Number,
//   Email: String,
//   Phone_Number: String,
//   Social_Security_Number: String,
//   Drivers_License: String,
//   Marital_Status: String,
//   Gender: Boolean,
//   Shareholder_Status: Boolean,
//   Benefit_Plans: Number,
//   Ethnicity: String,
// });

const PersonalEmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  vacationDays: {
    type: Number,
    required: true,
  },
  paidToDate: {
    type: Number,
    required: true,
  },
  paidLastYear: {
    type: Number,
    required: true,
  },
  payRate: {
    type: Number,
    // required: true,
  },
  payRateId: {
    type: Number,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  Employee_ID: {
    type: String,
  },
  First_Name: {
    type: String,
  },
  Last_Name: {
    type: String,
  },
  Middle_Initial: {
    type: String,
  },
  Address1: {
    type: String,
  },
  Address2: {
    type: String,
  },
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  Zip: {
    type: Number,
  },
  Email: {
    type: String,
  },
  Phone_Number: {
    type: String,
  },
  Social_Security_Number: {
    type: String,
  },
  Drivers_License: {
    type: String,
  },
  Marital_Status: {
    type: String,
  },
  Gender: {
    type: Boolean,
  },
  Shareholder_Status: {
    type: Boolean,
  },
  Benefit_Plans: {
    type: Number,
  },
  Ethnicity: {
    type: String,
  },
});

export default mongoose.model(
  "personal_employee",
  PersonalEmployeeSchema,
  "personal_employee"
);
