const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each ip to 5 loogin requests per `window` per minute
  message: { message: `too many login attemts, try again after 60 second pause` },
  handler: (req, res, next, options) => {
    logEvents(
      `too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "log-error.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // disable the `x-ratelimit-*` headers
});

module.exports = loginLimiter;
