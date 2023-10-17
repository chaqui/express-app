const passport = require('passport');

const localStrategy = require('./strategies/local.strategy');
const jwtStrategy = require('./strategies/jwt.strategy');
//Declaración de la estrategia local para su uso
passport.use(localStrategy);
//Declaración de la estrategia jwt para su uso
passport.use(jwtStrategy);
