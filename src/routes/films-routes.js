const FilmsController = require("../controllers/films-controller");

module.exports = class FilmsRoute {
  static routes(route) {
    route
      .route("/videostore/v1/films")
      .get(FilmsController.getFilms)
      .post(FilmsController.createFilms)
      .put(FilmsController.updateFilms)
      .delete(FilmsController.deleteFilms);
  }
};
