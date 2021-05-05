const UserController = require("../controllers/user-controller");
const UserRequiredFields = require("./middlewares/user-routes-validation");

module.exports = class UserRoute {
  static routes(route) {
    route
      .route("/videostore/v1/users")
      .get(UserController.getUsers)
      .post(
        UserRequiredFields.validatePostUser(),
        UserRequiredFields.isValidFields,
        UserController.createUser
      );
  }
};
