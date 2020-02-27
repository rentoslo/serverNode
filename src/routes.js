const { Router } = require('express');
const controlleUser = require('./controllers/user');

// 2ª versão
const routes = Router();
// listar tudo do BD
routes.get('/find', controlleUser.findUser);
// inserir no BD
routes.post('/include', controlleUser.includeUser);
// alterar no BD
routes.put('/edit', controlleUser.editUser);
// deletar no BD
routes.delete('/delete', controlleUser.deleteUser2);

// 1ª versão
routes.get('/listUser', controlleUser.listUser);
routes.post('/addUser', controlleUser.addUser);
routes.put('/updateUser', controlleUser.updateUser);
routes.delete('/deleteUser', controlleUser.deleteUser);

module.exports = routes;
