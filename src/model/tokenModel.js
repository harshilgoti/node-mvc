const mongoose = require("mongoose");

const schema = {
  _id: {
    type: String,
  },
  token: {
    type: String,
  },
  user_id: {
    type: String,
  },
  type: {
    type: String,
  },
  expires_at: {
    type: Date,
    default: null,
  },
  created_at: {
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
      delete ret.id;
    },
  },
};
const tokenSchema = new mongoose.Schema(schema, options);

tokenSchema.virtual("_user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
  autopopulate: true,
  justOne: true,
});

tokenSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("token", tokenSchema);
