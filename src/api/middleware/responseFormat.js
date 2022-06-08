/**
 * Final API response format
 */
const mung = require("express-mung");
const { API_SUCCESS } = require("../constant/successMessages");

const response = function (body, req, res) {
  let [code, message] = API_SUCCESS.split("::");

  if (body.message) {
    [code, message] = body.message.split("::");
  }

  const apiResponse = {
    error: body.error ? true : false,
    message: message || "",
    data: body.data || {},
  };

  return res.status(code).send(apiResponse);
};

module.exports = mung.json(response);
