const { userModel } = require("../model");
const { mongoId } = require("../helper/commonFunction");

class userService {
  async getAllUsersWhere(where = {}, select = "") {
    return userModel.find(where, select).sort("-created_at");
  }

  async create(model) {
    model._id = mongoId("user");
    return userModel.create(model);
  }

  async getOneWhere(where) {
    const user = userModel.findOne(where);
    return user;
  }
}

module.exports = new userService();
