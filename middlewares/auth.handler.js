const boom = require('@hapi/boom');
const { config } = require('./../config/config.js');

/**
 * Funcion auxiliar para verificar si el api key es valido
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkApiKey(req, res, next){
  const apiKey = req.headers['api'];
  if(apiKey === config.apiKey){
    next();
  }
  else{
    next(boom.unauthorized('Invalid API Key'));
  }
}

function checkAdminRole(req, res, next){
  const role = req.user.role;
  if(role === 'admin'){
    next();
  }
  else{
    next(boom.unauthorized('Invalid Role'));
  }
}

function checkRoles(...roles){
  return (req, res, next) => {
    const role = req.user.role;
    if(roles.includes(role)){
      next();
    }
    else{
      next(boom.unauthorized('Invalid Role'));
    }
  }
}

module.exports = {
  checkApiKey,
  checkAdminRole,
  checkRoles
};
