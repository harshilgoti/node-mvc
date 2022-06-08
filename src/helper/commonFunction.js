/**
 * Common function
 */
const crypto = require("crypto");

exports.mongoId = function (model) {
  let token = crypto.randomBytes(12).toString("hex");

  switch (model) {
    case "area":
      token = `are_${token}`;
      break;
    case "user":
      token = `user_${token}`;
      break;

    default:
      token = token;
      break;
  }

  return token;
};

exports.cryptoPassword = function (password) {
  let salt = `${Math.round(new Date().valueOf() * Math.random())}`;

  const newPassword = crypto
    .createHmac("sha1", salt)
    .update(password)
    .digest("hex");

  return {
    password: newPassword,
  };
};
