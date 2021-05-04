const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

module.exports = class Swagger {
  static host(req, _, next) {
    swaggerDocument.host = req.get("host");
    req.swaggerDoc = swaggerDocument;
    next();
  }

  static ui(router) {
    router.use("/api-videostore-docs", this.host, swaggerUi.serve);
    router.get("/api-videostore-docs", swaggerUi.setup(swaggerDocument));
  }
};
