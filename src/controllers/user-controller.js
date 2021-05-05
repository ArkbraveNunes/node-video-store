const Boom = require("@hapi/boom");
const UserBusiness = require("../services/user-business");

module.exports = class UserController {
  static async getUsers(req, res) {
    const tid = req.get("x-tid");
    const { id, email } = req.query;
    const userBusiness = new UserBusiness(tid);
    return userBusiness
      .getUsers({ id, email })
      .then((result) =>
        result && result.length ? res.json(result) : res.sendStatus(204)
      )
      .catch((err) =>
        err.statusCode
          ? res.status(res.statusCode).json(err)
          : res
              .status(500)
              .json(Boom.internal("Internal Server Error").output.payload)
      );
  }

  static async createUser(req, res) {
    const tid = req.get("x-tid");
    const { body } = req;
    const userBusiness = new UserBusiness(tid);
    return userBusiness
      .createUser(body)
      .then((result) => res.json(result))
      .catch((err) =>
        err.statusCode
          ? res.status(res.statusCode).json(err)
          : res
              .status(500)
              .json(Boom.internal("Internal Server Error").output.payload)
      );
  }
};
