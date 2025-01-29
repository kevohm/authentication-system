import passport from "passport";
import {Strategy as BearerStrategy} from "passport-http-bearer";

passport.use(
  new BearerStrategy(function (token, done) {
    console.log(token);
    return done(null, false);
  })
);

export {passport}
