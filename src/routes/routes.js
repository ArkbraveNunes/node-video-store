const { Router } = require("express");

const SwaggerRoutes = require("../../docs");
const UserRoutes = require("./user-routes");
const MoviesRoutes = require("./movies-routes");
const RentRegisterRoutes = require("./rent-register-routes");

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
    UserRoutes.routes(route);
    MoviesRoutes.routes(route);
    RentRegisterRoutes.routes(route);

    route.use((_, res) => res.status(400).json(defaultObject()));

    return route;
  }
};
