const Boom = require("@hapi/boom");
const { buildCheckFunction, validationResult } = require("express-validator");
const Logger = require("../../utils/logger");

const query = buildCheckFunction(["query"]);
const body = buildCheckFunction(["body"]);

module.exports = class ValidationRequiredFields {
  static validateGetMovies() {
    return [
      query("quantity")
        .if(query("quantity").exists({ checkFalsy: true }))
        .trim()
        .isNumeric()
        .withMessage("Campo quantity inválido."),
    ];
  }

  static validatePostMovies() {
    return [
      body("*.title")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Campo title obrigatório."),
      body("*.director")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Campo director obrigatório."),
      body("*.quantity")
        .isLength({ min: 1 })
        .trim()
        .isNumeric()
        .withMessage("Campo quantity inválido."),
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
