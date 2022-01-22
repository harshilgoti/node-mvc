const mongoose = require("mongoose");

const schema = {
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
};
const options = {
  versionKey: false,
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {},
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      // delete ret.id;
    },
  },
};
const areaSchema = new mongoose.Schema(schema, options);

module.exports = mongoose.model("areas", areaSchema);
