const CustomerController = require("../controllers/customer-controller");

module.exports = class CustomerRoute {
  static routes(route) {
    route
      .route("/videostore/v1/customer")
      .get(CustomerController.getCustomer)
      .post(CustomerController.createCustomer)
      .put(CustomerController.updateCustomer)
      .delete(CustomerController.deleteCustomer);
  }
};
