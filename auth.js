const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('./config');
// const knexFile = require('./knexfile.js');
// const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = ()=>{
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{
        const user = payload;
        if (user) {
            return done(null, {id: user.id});
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}

