const RentRegisterController = require("../controllers/rent-register-controller");
const RentRegisterRequiredFields = require("./middlewares/rent-register-routes-validation");

module.exports = class RentRegisterRoute {
  static routes(route) {
    route
      .route("/videostore/v1/rentRegister")
      .get(RentRegisterController.getRentRegister)
      .post(
        RentRegisterRequiredFields.validatePostRentRegister(),
        RentRegisterRequiredFields.isValidFields,
        RentRegisterController.createRentRegister
      )
      .put(
        RentRegisterRequiredFields.validatePutRentRegister(),
        RentRegisterRequiredFields.isValidFields,
        RentRegisterController.updateRentRegister
      );
  }
};
