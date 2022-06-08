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
