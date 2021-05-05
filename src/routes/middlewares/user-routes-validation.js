const Boom = require("@hapi/boom");
const { buildCheckFunction, validationResult } = require("express-validator");
const Logger = require("../../utils/logger");

const body = buildCheckFunction(["body"]);

module.exports = class ValidationRequiredFields {
  static validatePostUser() {
    return [
      body("username")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Campo username obrigatório."),
      body("email")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Campo email obrigatório."),
      body("password")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Campo password obrigatório.")
        .isLength({ min: 6 })
        .withMessage(
          "O número mínimo de caracteres do campo passwaord deve ser 6."
        ),
    ];
  }

  static isValidFields(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.array({ onlyFirstError: true });
      Logger.error(err[0].msg);
      res.status(400).json(Boom.badRequest(err[0].msg).output.payload);
    } else {
      next();
    }
  }
};
