const Boom = require("@hapi/boom");
const UserModel = require("../models/Users");
const Logger = require("../utils/logger");

module.exports = class UserBusiness {
  constructor(tid) {
    this.tid = tid;
    UserModel.sync();
  }

  async getUsers(params) {
    try {
      const query = {};
      Object.keys(params).forEach((item) => {
        if (params[item]) query[item] = params[item];
      });
      return UserModel.findAll({ where: query });
    } catch (error) {
      Logger.error(error, this.tid);
      throw error;
    }
  }

  async createUser(body) {
    try {
      const searchUser = await UserModel.findOne({
        where: { email: body.email },
      });
      if (searchUser) {
        throw Boom.badRequest("Email já cadastrado").output.payload;
      }
      const result = await UserModel.create(body);
      return [result];
    } catch (error) {
      Logger.error(error, this.tid);
      throw error;
    }
  }
};
