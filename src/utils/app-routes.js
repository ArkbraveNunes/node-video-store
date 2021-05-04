module.exports = class RouterUtils {
  static xTid(req, res, next) {
    if (req && req.header("x-tid")) {
      res.append("x-tid", req.header("x-tid"));
    } else {
      const tid = Date.now();
      req.headers["x-tid"] = tid;
      res.append("x-tid", tid);
    }
    next();
  }
};
