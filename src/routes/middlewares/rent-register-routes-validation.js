const Boom = require("@hapi/boom");
const { buildCheckFunction, validationResult } = require("express-validator");
const Logger = require("../../utils/logger");
const ActionEnum = require("../../enums/actions");

const body = buildCheckFunction(["body"]);

module.exports = class ValidationRequiredFields {
  static validatePutRentRegister() {
    return [
      body("id")
        .trim()
        .isLength({ min: 1 })
        .withMessage("O Campo id é obrigatório."),
      body("action")
        .trim()
        .isLength({ min: 1 })
        .withMessage("O Campo action é obrigatório.")
        .custom((value) => Object.values(ActionEnum).includes(value))
        .withMessage(
          `Campo Action inválido. Os valores possíveis são ${Object.values(
            ActionEnum
          ).join()}.`
        ),
      body("quantity")
        .if(body("quantity").exists({ checkFalsy: true }))
        .trim()
        .isNumeric()
        .withMessage("Campo quantity inválido."),
      body("value")
        .if(body("value").exists({ checkFalsy: true }))
        .trim()
        .isNumeric()
        .withMessage("Campo value inválido."),
    ];
  }

  static validatePostRentRegister() {
    return [
      body("idMovie")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Campo idMovie obrigatório."),
      body("idUser")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Campo idUser obrigatório."),
      body("endDate")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Campo endDate obrigatório."),
      body("quantity")
        .trim()
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage("Campo quantity inválido."),
      body("value")
        .trim()
        .isLength({ min: 1 })
        .isNumeric()
        .withMessage("Campo value inválido."),
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
