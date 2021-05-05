const MoviesModel = require("../models/Movies");
const Logger = require("../utils/logger");

module.exports = class MoviesBusiness {
  constructor(tid) {
    this.tid = tid;
    MoviesModel.sync();
  }

  async getMovies(params) {
    try {
      const query = {};
      Object.keys(params).forEach((item) => {
        if (params[item]) query[item] = params[item];
      });
      return MoviesModel.findAll({ where: query });
    } catch (error) {
      Logger.error(error, this.tid);
      throw error;
    }
  }

  async createMovies(body) {
    try {
      return MoviesModel.bulkCreate(body);
    } catch (error) {
      Logger.error(error, this.tid);
      throw error;
    }
  }
};
