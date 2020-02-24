const { Router } = require('express');
const controlleUser = require('./controllers/user');

const routes = Router();

routes.get('/listUser', controlleUser.listUser);
routes.post('/addUser', controlleUser.addUser);
routes.put('/updateUser', controlleUser.updateUser);
routes.delete('/deleteUser', controlleUser.deleteUser);

module.exports = routes;

// routes.get("/home", controlleUser.home);
// routes.post("/login", controlleUser.login);
