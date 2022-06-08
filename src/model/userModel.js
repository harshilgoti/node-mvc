const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = {
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
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
    transform: function (doc, ret) { },
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      // delete ret.id;
    },
  },
};

const userSchema = new mongoose.Schema(schema, options);

userSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login!");
  }
  return user;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
