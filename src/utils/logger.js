const proc = require("process");
const winston = require("winston");

module.exports = class Logger {
  static logMessage(tid = null) {
    return winston.createLogger({
      defaultMeta: {
        name: "api-video-store",
        pid: proc.pid,
        time: new Date(),
        tid,
      },
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      transports: [new winston.transports.Console()],
    });
  }

  static debug(msg, tid) {
    this.logMessage(tid).debug(msg);
  }

  static info(msg, tid) {
    this.logMessage(tid).info(msg);
  }

  static error(msg, tid = null) {
    this.logMessage(tid).log({
      level: "error",
      message: typeof msg === "object" ? JSON.stringify(msg) : msg,
      stack: new Error(msg).stack,
    });
  }

  static warn(msg, tid = null) {
    this.logMessage(tid).warn(msg);
  }
};
