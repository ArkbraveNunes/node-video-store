const MoviesController = require("../controllers/movies-controller");
const MoviesRequiredFields = require("./middlewares/movies-routes-validation");

module.exports = class MoviesRoute {
  static routes(route) {
    route
      .route("/videostore/v1/movies")
      .get(
        MoviesRequiredFields.validateGetMovies(),
        MoviesRequiredFields.isValidFields,
        MoviesController.getMovies
      )
      .post(
        MoviesRequiredFields.validatePostMovies(),
        MoviesRequiredFields.isValidFields,
        MoviesController.createMovies
      );
  }
};
