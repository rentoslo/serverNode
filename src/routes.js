const controllerUser = require('./app/controllers/user');
const controllerEndereco = require('./app/controllers/enderecos');

const routes = [
  controllerUser.routes(),
  controllerEndereco.routes(),
];

module.exports = routes;
