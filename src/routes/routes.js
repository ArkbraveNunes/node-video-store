const { Router } = require("express");

const SwaggerRoutes = require("../../docs");
const CustomerRoutes = require("./customer-routes");
const FilmsRoutes = require("./films-routes");

const route = Router();

const defaultObject = () => ({
  core: "API Video Store",
  version: "v1",
  date: new Date(),
});

module.exports = class Routers {
  static initialize() {
    route.all(["/videostore"], (req, res) => {
      res.json(defaultObject);
    });

    SwaggerRoutes.ui(route);
    CustomerRoutes.routes(route);
    FilmsRoutes.routes(route);

    route.use((_, res) => res.status(400).json(defaultObject()));

    return route;
  }
};
