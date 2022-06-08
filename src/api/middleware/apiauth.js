/**
 * API authentication middleware
 */
const { UNAUTHORIZED } = require("../constant/errorMessage");
const { getOneWhere } = require("../../service/tokenService");

const apiAuth = async (req, res, next) => {
  const [code, message] = UNAUTHORIZED.split("::");
  const apiErrorResponse = {
    error: true,
    message: message || "",
    data: {},
  };
  let { authorization: token } = req.headers;

  if (token && token.startsWith("bearer ")) {
    token = token.slice(7, token.length);

    const tokenData = await getOneWhere({ token, type: "user_login" });

    if (tokenData) {
      return next();
    } else {
      res.status(code).send(apiErrorResponse);
    }
  } else {
    res.status(code).send(apiErrorResponse);
  }
};

module.exports = apiAuth;
