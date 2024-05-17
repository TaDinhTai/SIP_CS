import mongoose from "mongoose";

// Định nghĩa schema cho dữ liệu cá nhân
const PersonalSchema = new mongoose.Schema({
  Employee_ID: { type: String, required: true },
  First_Name: { type: String, required: true },
  Last_Name: { type: String, required: true },
  Middle_Initial: { type: String },
  Address1: { type: String },
  Address2: { type: String },
  City: { type: String },
  State: { type: String },
  Zip: { type: Number },
  Email: { type: String },
  Phone_Number: { type: String },
  Social_Security_Number: { type: String },
  Drivers_License: { type: String },
  Marital_Status: { type: String },
  Gender: { type: Boolean },
  Shareholder_Status: { type: Boolean },
  Benefit_Plans: { type: Number },
  Ethnicity: { type: String },
});

export default mongoose.model("personal", PersonalSchema, "personal");
