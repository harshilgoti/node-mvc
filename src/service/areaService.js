const { areaModel } = require("../model");
const { mongoId } = require("../helper/commonFunction");

class areaService {
  async getAllareasWhere(where = {}, select = "") {
    return areaModel.find(where, select).sort("-created_at");
  }

  async getOne(id) {
    return areaModel.findOne({ _id: id });
  }

  async getOneWhere(where) {
    return areaModel.findOne(where);
  }

  async create(model) {
    model._id = mongoId("area");
    return areaModel.create(model);
  }

  async remove(model) {
    return areaModel.findOneAndDelete({ _id: model._id });
  }

  async update(id, model) {
    return areaModel.findOneAndUpdate({ _id: id }, model, {
      new: true,
    });
  }
}

module.exports = new areaService();
