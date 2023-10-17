const passport = require('passport');

const localStrategy = require('./strategies/local.strategy');
//Declaración de la estrategia local para su uso
passport.use(localStrategy);
