const { userService } = require("../../service");
const { USER_ALREADY_EXISTED } = require("../constant/errorMessage");
const {
  USER_CREATE_SUCCESS,
} = require("../constant/successMessages");

class userController {
  /**
   * Get All area
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    try {
      let where = req.query ? req.query : {};
      where.deleted_at = null;
      where = { ...where, ...req.params };
      const areas = await userService.getAllUsersWhere(where);

      return res.json({
        message: "",
        data: areas,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create area
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    let { body } = req;

    try {
      let userExist = await userService.getOneWhere({
        name: req.body.name,
      });

      if (userExist) throw new Error(USER_ALREADY_EXISTED);
      /**
       * Add area
       **/
      let area = await userService.create(body);
      return res.json({
        message: USER_CREATE_SUCCESS,
        data: area,
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new userController();
