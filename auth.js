// auth.js
const passport = require('passport');
const passportJWT = require('passport-jwt');
const users = require('../serverNode/src/controllers/user');
const cfg = require('./config.js');

const { ExtractJwt } = passportJWT;
const { Strategy } = passportJWT;
const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function () {
  const strategy = new Strategy(params, ((payload, done) => {
    const user = users[payload.id] || null;
    if (user) {
      return done(null, { id: user.id });
    }
    return done(new Error('User not found'), null);
  }));
  passport.use(strategy);
  return {
    initialize() {
      return passport.initialize();
    },
    authenticate() {
      return passport.authenticate('jwt', cfg.jwtSession);
    },
  };
};
