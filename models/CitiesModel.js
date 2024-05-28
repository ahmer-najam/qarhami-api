const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    createdAt: { type: Date },
    createdBy: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: String },
    cityName: { type: String },
  },
  {
    timestamp: true,
    collection: "cities",
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Cities = mongoose.model("cities", citySchema);
module.exports = { Cities };
