const Boom = require("@hapi/boom");
const MoviesBusiness = require("../services/movies-business");

module.exports = class MoviesController {
  static async getMovies(req, res) {
    const tid = req.get("x-tid");
    const { query } = req;
    const moviesBusiness = new MoviesBusiness(tid);
    return moviesBusiness
      .getMovies(query)
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

  static async createMovies(req, res) {
    const tid = req.get("x-tid");
    const { body } = req;
    const moviesBusiness = new MoviesBusiness(tid);
    return moviesBusiness
      .createMovies(body)
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
