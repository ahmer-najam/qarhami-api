const mongoose = require("mongoose");

const userAccountsSchema = new mongoose.Schema(
  {
    createdAt: { type: Date },
    createdBy: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: String },
    name: { type: String },
    companyName: { type: String },
    phoneNumber: { type: String },
    password: { type: String },
    email: { type: String },
    fullName: { type: String },
    role: { type: String },
    status: { type: String },
    additionalInfo: { type: String },
    vehicles: [
      {
        id: { type: String },
        year: { type: String },
        make: { type: String },
        model: { type: String },
        color: { type: String },
        plateNumber: { type: String },
        deviceSerial: { type: String },
        vin: { type: String },
        status: { type: String },
        imageUrl: { type: String },
      },
    ],
  },
  {
    timestamp: true,
    collection: "UserAccounts",
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const UserAccounts = mongoose.model("UserAccounts", userAccountsSchema);
module.exports = { UserAccounts };
