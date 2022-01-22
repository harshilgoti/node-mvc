const { areaService } = require("../../service");
const {
  DATABASE_INTERNAL,
  AREA_NOT_FOUND,
  AREA_ALREADY_EXISTED,
} = require("../constant/errorMessage");
const {
  AREA_CREATE_SUCCESS,
  AREA_UPDATE_SUCCESS,
  AREA_DELETE_SUCCESS,
} = require("../constant/successMessages");

class areaController {
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
      const areas = await areaService.getAllareasWhere(where);

      return res.json({
        message: "",
        data: areas,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get All area where
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAllWhere(req, res, next) {
    try {
      let where = req.params;
      where.deleted_at = null;
      const areas = await areaService.getAllareasWhere({
        where,
      });

      return res.json({
        message: "",
        data: areas,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get  areas
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOne(req, res, next) {
    let { area_slug } = req.params;
    let { user } = req;

    try {
      const areas = await areaService.getOneWhere({
        slug: area_slug,
      });

      if (!areas) throw new Error(AREA_NOT_FOUND);

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
      let areaExist = await areaService.getOneWhere({
        name: req.body.name,
        slug: req.body.slug,
      });

      if (areaExist) throw new Error(AREA_ALREADY_EXISTED);

      /**
       * Add area
       **/
      let areaSave = await areaService.create(body);
      console.log(areaSave, "areaSave");
      return res.json({
        message: AREA_CREATE_SUCCESS,
        data: areaSave,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update area
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    let { params, body } = req;
    try {
      /**
       * Check valid area
       */
      let areaExist = await areaService.getOneWhere({
        _id: params.area_id,
      });

      if (!areaExist) throw new Error(AREA_NOT_FOUND);

      let areaUpdate = await areaService.update(params.area_id, body);

      /**
       * find area after update
       */

      let area = await areaService.getOneWhere({ _id: params.area_id });

      /**
       * API response
       */
      return res.send({
        message: AREA_UPDATE_SUCCESS,
        data: area,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Delete area
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async delete(req, res, next) {
    let { params } = req;
    try {
      /**
       * Check valid area
       */
      let areaExist = await areaService.getOneWhere({
        _id: params.area_id,
      });

      if (!areaExist) throw new Error(AREA_NOT_FOUND);

      /**
       * Delete area
       */
      let areaRemove = await areaService.remove({ _id: params.area_id });

      /**
       * API response
       */

      return res.send({
        message: AREA_DELETE_SUCCESS,
        data: {},
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new areaController();
