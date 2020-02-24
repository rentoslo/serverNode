const users = require('../models/users');

module.exports = {
  listUser: (req, res) => res.json({
    Mensagem: 'list get OK',
    Users: users,
  }),
  addUser: (req, res) => {
    const { name, email, password } = req.body;

    users.push({
      id: Math.floor(Math.random() * 999), name, email, password,
    });

    return res.json({
      Mensagem: 'AddUser put OK',
      'Users List': users,
    });
  },
  updateUser: (req, res) => {
    const idUser = req.query.id;
    const verificaElemento = users.find((item) => item.id.toString() === idUser);
    if (!verificaElemento) {
      return res.json({
        Mensagem: 'Nenhum dado alterado',
        'Users List': users,
      });
    }
    const posicao = users.indexOf(verificaElemento);
    users[posicao] = {
      ...verificaElemento,
      password: req.body.newPassword,
    };
    return res.json({
      Mensagem: 'Dado alterado com sucesso',
      'Users List': users,
    });
  },
  deleteUser: (req, res) => {
    const idUser = req.query.id;
    const verificaElemento = users.find((item) => item.id.toString() === idUser);
    if (!verificaElemento) {
      return res.json({
        Mensagem: 'Nenhum dado apagado',
        'Users List': users,
      });
    }
    const posicao = users.indexOf(verificaElemento);
    users.splice(posicao, 1);
    return res.json({
      Mensagem: 'Dado apagado com sucesso',
      'Users List': users,
    });
  },
};
