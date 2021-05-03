require("custom-env").env(true);
const express = require("express");

const app = express();

module.exports = class Launcher {
  constructor() {
    this.port = process.env.PORT || 3000;
  }

  start() {
    app
      .listen(this.port, () =>
        console.log(`Listening at http://localhost:${this.port}`)
      )
      .on("error", (err) => console.error(`Err: Error listen server: ${err}`));
  }
};
