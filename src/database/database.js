const { Sequelize } = require("sequelize");
const Logger = require("../utils/logger");

module.exports = class Database {
  constructor() {
    this.host = process.env.DB_HOST || "localhost";
    this.port = process.env.DB_PORT || "27017";
    this.database = process.env.DB_NAME || "video_store";
    this.user = process.env.DB_USER || "root";
    this.pass = process.env.DB_PASSWORD || "root";
    this.connect();
  }

  connect() {
    this.sequelize = new Sequelize(this.database, this.user, this.pass, {
      host: this.host,
      dialect: "mysql",
    });
  }

  authenticateConnection() {
    return this.sequelize
      .authenticate()
      .then(() => {
        Logger.info("Database connection successful");
      })
      .catch((err) => {
        Logger.error(`Database connection error: ${err}`);
      });
  }
};
