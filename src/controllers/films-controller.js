const Boom = require("@hapi/boom");
const FilmsBusiness = require("../business/films-business");

module.exports = class FilmsController {
  static async getFilms(req, res) {
    const tid = req.get("x-tid");
    const { id, email } = req.query;
    const filmsBusiness = new FilmsBusiness(tid);
    return filmsBusiness
      .getFilms({ id, email })
      .then((result) =>
        result && result.length > 0 ? res.json(result) : res.sendStatus(204)
      )
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json(Boom.internal("Internal Server Error").output.payload);
      });
  }

  static async createFilms(req, res) {
    const tid = req.get("x-tid");
    const { body } = req;
    const filmsBusiness = new FilmsBusiness(tid);
    return filmsBusiness
      .createFilms(body)
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json(Boom.internal("Internal Server Error").output.payload);
      });
  }

  static async updateFilms(req, res) {
    const tid = req.get("x-tid");
    const { body } = req;
    const filmsBusiness = new FilmsBusiness(tid);
    return filmsBusiness
      .updateFilms(body)
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json(Boom.internal("Internal Server Error").output.payload);
      });
  }

  static async deleteFilms(req, res) {
    const tid = req.get("x-tid");
    const { id } = req.query;
    const filmsBusiness = new FilmsBusiness(tid);
    return filmsBusiness
      .deleteFilms({ id })
      .then((result) => {
        if (result) {
          res.json(result);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json(Boom.internal("Internal Server Error").output.payload);
      });
  }
};
