var passport = require("passport");
var passportJWT = require("passport-jwt");
var User = require("../models/user");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt")
};

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        var user = User.findById(payload.id, function(err, user) {
            if (err) {
                return done(null, false);
            } else if (payload.expire <= Date.now()) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", process.env.JWT_SESSION);
        }
    };
};