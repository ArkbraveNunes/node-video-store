const Boom = require("@hapi/boom");
const CustomerBusiness = require("../business/customer-business");

module.exports = class CustomerController {
  static async getCustomer(req, res) {
    const tid = req.get("x-tid");
    const { id, email } = req.query;
    const customerBusiness = new CustomerBusiness(tid);
    return customerBusiness
      .getCustomer({ id, email })
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

  static async createCustomer(req, res) {
    const tid = req.get("x-tid");
    const { body } = req;
    const customerBusiness = new CustomerBusiness(tid);
    return customerBusiness
      .createCustomer(body)
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json(Boom.internal("Internal Server Error").output.payload);
      });
  }

  static async updateCustomer(req, res) {
    const tid = req.get("x-tid");
    const { body } = req;
    const customerBusiness = new CustomerBusiness(tid);
    return customerBusiness
      .updateCustomer(body)
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json(Boom.internal("Internal Server Error").output.payload);
      });
  }

  static async deleteCustomer(req, res) {
    const tid = req.get("x-tid");
    const { id } = req.query;
    const customerBusiness = new CustomerBusiness(tid);
    return customerBusiness
      .deleteCustomer({ id })
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
