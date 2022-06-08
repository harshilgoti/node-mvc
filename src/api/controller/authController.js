const { userService, tokenService } = require("../../service");
const User = require("../../model/userModel");
const {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} = require("../constant/successMessages");
const { LOGIN_FAILED } = require("../constant/errorMessage");

class authController {
  /**
   * Login
   * @param req
   * @param res
   * @param {*} next
   * @returns {Promise<*>}
   */
  async login(req, res, next) {
    try {
      const user = await User.findUserByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Logout
   * @param req
   * @param res
   * @param {*} next
   * @returns {Promise<*>}
   */
  async logout(req, res, next) {
    let { user, headers } = req;

    try {
      /**
       * Token get from header
       */
      const tokenString = headers.authorization.slice(
        7,
        req.headers.authorization.length
      );

      let token = await tokenService.remove({
        user_id: user._id,
        token: tokenString,
      });

      return res.json({
        message: LOGOUT_SUCCESS,
        data: "",
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get LoggedIn User Detail
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getMyDetail(req, res, next) {
    try {
      const user = await userService.getOne(req.user._id);
      /**
       * API response
       */
      return res.send({
        message: "",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new authController();
