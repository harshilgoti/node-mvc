/**
 * Passport middleware
 */
const jwt = require("jsonwebtoken");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const { cryptoPassword } = require("../helper/commonFunction");
const {
  PASSWORD_INVALID,
  EMAIL_INVALID,
  EMAIL_VERIFICATION,
  DATABASE_INTERNAL,
  UNAUTHORIZED,
} = require("../api/constant/errorMessage");
const { getOneWhere } = require("../service/userService");
const { create } = require("../service/tokenService");

passport.serializeUser(async (user, done) => {
  // console.log(user);
  done(null, user.user._id);
});

/**
 * JWT option
 */
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

/**
 * Passport jwt strategy
 */
const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
  const user = await getOneWhere({
    _id: jwtPayload.id,
    deleted_at: null,
  });

  if (user) {
    next(null, user);
  } else {
    next({ message: UNAUTHORIZED }, false);
  }
});

/**
 * Passport JWT strategy include in passport
 */
passport.use(jwtStrategy);

/**
 * Passport login local strategy
 */
const loginLocalStrategy = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
  },
  async (email, password, done) => {
    let user = await getOneWhere({
      email,
      deleted_at: null,
    });
    if (user) {
      const { password: saltedPassword } = await cryptoPassword(password);
      // console.log("user---", saltedPassword, user.password, user.salt);

      if (saltedPassword === user.password) {
        const tokenObj = {
          user_id: user._id,
          type: "user_login",
        };

        const token = await create(tokenObj);

        return done(null, { user, token: token.token });
      } else {
        return done({ message: PASSWORD_INVALID }, false);
      }
    } else {
      return done({ message: EMAIL_INVALID }, false);
    }
  }
);

/**
 * Passport login local strategy
 */
passport.use("login", loginLocalStrategy);
