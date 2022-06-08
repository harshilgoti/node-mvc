const bodyParser = require("body-parser");
const cors = require("cors");
const { router } = require("../api/routes");
const config = require("../config");
const responseFormat = require("../api/middleware/responseFormat");
const passport = require("passport");
const passportLoader = require("./passport");
module.exports = (app) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // custom response middlewear
  app.use(responseFormat);

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  // app.use(require("method-override")());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  /**
   * Set middleware initialize passport
   */
  app.use(passport.initialize());

  passportLoader;

  // Load API routes
  // console.log(config.api.prefix)
  app.use(config.api.prefix, router);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    // console.log("89", err);
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      let message = err.message.split("::")[1];
      return res.status(err.status).send({ message: message }).end();
    }
    err["status"] = err.message.split("::")[0];
    err["message"] = err.message.split("::")[1];

    return next(err);
  });
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
