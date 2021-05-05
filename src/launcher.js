require("custom-env").env(true);

const express = require("express");

const app = express();

const helmet = require("helmet");
const Logger = require("./utils/logger");
const Router = require("./routes/routes");

const Database = require("./database/database");

module.exports = class Launcher {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.database = new Database();
    app.use(express.json());
    app.use(helmet());
    app.use(Router.initialize());
  }

  start() {
    this.database.authenticateConnection();
    app
      .listen(this.port, () =>
        Logger.info(`Listening at http://localhost:${this.port}`)
      )
      .on("error", (err) => Logger.error(`Err: Error listen server: ${err}`));
  }
};
