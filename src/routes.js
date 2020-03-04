const controllerUser = require('./controllers/user');
const controllerEndereco = require('./controllers/enderecos');

const routes = [
  controllerUser.routes(),
  controllerEndereco.routes(),
];

module.exports = routes;

// routes.get('/users', controllerUser.index);

// // 2ª versão: dados do BD
// routes.get('/find', controlleUser.findUser);
// routes.post('/include', controlleUser.includeUser);
// routes.put('/edit', controlleUser.editUser);
// routes.delete('/delete', controlleUser.deleteUser2);

// // endereços
// routes.post('/addEnderecos', controlleEndereco.addEnderecos);
// routes.get('/listEndereco', controlleEndereco.listEndereco);
// routes.get('/listEnderecoUser', controlleEndereco.listEnderecoUser);

// // 1ª versão: dados estáticos
// routes.get('/listUser', controlleUser.listUser);
// routes.post('/addUser', controlleUser.addUser);
// routes.put('/updateUser', controlleUser.updateUser);
// routes.delete('/deleteUser', controlleUser.deleteUser);
