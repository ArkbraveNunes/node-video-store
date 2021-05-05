const moment = require("moment");
const RentRegisterModel = require("../models/RentRegister");
const UserModel = require("../models/Users");
const MovieModel = require("../models/Movies");
const Logger = require("../utils/logger");
const ActionsEnum = require("../enums/actions");

module.exports = class RentRegisterBusiness {
  constructor(tid) {
    this.tid = tid;
    RentRegisterModel.sync();
    this.actualDate = `${moment()
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`;
  }

  async getRentRegister(params) {
    try {
      const query = {};
      Object.keys(params).forEach((item) => {
        if (params[item]) query[item] = params[item];
      });
      return RentRegisterModel.findAll({ where: query });
    } catch (error) {
      Logger.error(error, this.tid);
      throw error;
    }
  }

  async createRentRegister(body) {
    try {
      let result = null;
      const { idMovie, idUser, endDate: date, quantity, value } = body;

      const dateEnd = `${moment(date, "YYMMDD").format(
        "YYYY-MM-DDTHH:mm:ss.SSS"
      )}Z`;
      const dateBegin = this.actualDate;

      const [film, user] = await Promise.all([
        MovieModel.findOne({ id: idMovie }),
        UserModel.findOne({ id: idUser }),
      ]);

      if (film && user) {
        result = await RentRegisterModel.create({
          idMovie: film.id,
          idUser: user.id,
          action: ActionsEnum.RENT,
          initDate: dateBegin,
          endDate: dateEnd,
          quantity,
          value,
        });
      }
      return result;
    } catch (error) {
      Logger.error(error, this.tid);
      throw error;
    }
  }

  async updateRentRegister(body) {
    try {
      const query = {};
      Object.keys(body).forEach((item) => {
        if (body[item]) query[item] = body[item];
      });
      return RentRegisterModel.update(query, {
        where: { id: query.id },
      }).then(() => RentRegisterModel.findOne({ id: query.id }));
    } catch (error) {
      Logger.error(error, this.tid);
      throw error;
    }
  }
};
