const Boom = require("@hapi/boom");
const RentMovieBusiness = require("../services/rent-movie-business");

module.exports = class FilmsController {
  static async getRentRegister(req, res) {
    const tid = req.get("x-tid");
    const { query } = req;
    const rentMovieBusiness = new RentMovieBusiness(tid);
    return rentMovieBusiness
      .getRentRegister(query)
      .then((result) =>
        result && result.length > 0 ? res.json(result) : res.sendStatus(204)
      )
      .catch((err) =>
        err.statusCode
          ? res.status(res.statusCode).json(err)
          : res
              .status(500)
              .json(Boom.internal("Internal Server Error").output.payload)
      );
  }

  static async createRentRegister(req, res) {
    const tid = req.get("x-tid");
    const { body } = req;
    const rentMovieBusiness = new RentMovieBusiness(tid);
    return rentMovieBusiness
      .createRentRegister(body)
      .then((result) => res.json(result).status(201))
      .catch((err) =>
        err.statusCode
          ? res.status(res.statusCode).json(err)
          : res
              .status(500)
              .json(Boom.internal("Internal Server Error").output.payload)
      );
  }

  static async updateRentRegister(req, res) {
    const tid = req.get("x-tid");
    const { body } = req;
    const rentMovieBusiness = new RentMovieBusiness(tid);
    return rentMovieBusiness
      .updateRentRegister(body)
      .then((result) => (result ? res.json(result) : res.sendStatus(204)))
      .catch((err) =>
        err.statusCode
          ? res.status(res.statusCode).json(err)
          : res
              .status(500)
              .json(Boom.internal("Internal Server Error").output.payload)
      );
  }
};
