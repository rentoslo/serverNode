// const users = require('../models/users');
const bcrypt = require('bcrypt');
const BaseController = require('./BaseController');
const model = require('../../app/models');

class Users extends BaseController {
  constructor() {
    super('/users', model.Users);
    this.modelUser = model.Users;
  }

  async updatePassword(req, res) {
    const { newPassword, oldPassword } = req.body;
    const { id } = req.params;

    const isUser = await this.modelUser.findByPk(id);
    if (!isUser) {
      return res.status(500).json({
        message: 'Usuário não encontrado',
      });
    }

    const verifyPass = bcrypt.compareSync(oldPassword, isUser.password);

    if (!verifyPass) {
      return res.status(500).json({
        message: 'Senhas não conferem',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const senhaParaSalvar = bcrypt.hashSync(newPassword, salt);

    this.modelUser.update(
      {
        password: senhaParaSalvar,
      },
      {
        where: {
          id,
        },
      },
    );

    return res.status(200).json({
      message: 'Senha alterada',
    });
  }

  routes() {
    const route = super.routes();

    route.put('/updatePassword/:id', this.updatePassword.bind(this));

    return route;
  }
}

module.exports = new Users();

// module.exports = {
//   listUser: (req, res) => res.json({
//     Mensagem: 'list get OK',
//     Users: users,
//   }),

//   addUser: (req, res) => {
// const { name, email, password } = req.body;

// users.push({
//   id: Math.floor(Math.random() * 999), name, email, password,
// });

// return res.json({
//   Mensagem: 'AddUser put OK',
//   'Users List': users,
// });
//   },

//   updateUser: (req, res) => {
//     const idUser = req.query.id;
//     const verificaElemento = users.find((item) => item.id.toString() === idUser);
//     if (!verificaElemento) {
//       return res.json({
//         Mensagem: 'Nenhum dado alterado',
//         'Users List': users,
//       });
//     }
//     const posicao = users.indexOf(verificaElemento);
//     users[posicao] = {
//       ...verificaElemento,
//       password: req.body.newPassword,
//     };
//     return res.json({
//       Mensagem: 'Dado alterado com sucesso',
//       'Users List': users,
//     });
//   },

//   deleteUser: (req, res) => {
//     const idUser = req.query.id;
//     const verificaElemento = users.find((item) => item.id.toString() === idUser);
//     if (!verificaElemento) {
//       return res.json({
//         Mensagem: 'Nenhum dado apagado',
//         'Users List': users,
//       });
//     }
//     const posicao = users.indexOf(verificaElemento);
//     users.splice(posicao, 1);
//     return res.json({
//       Mensagem: 'Dado apagado com sucesso',
//       'Users List': users,
//     });
//   },

//   findUser: async (req, res) => {
//     const listUser = await model.Users.findAll({
//       include: 'enderecos',
//       attributes: { exclude: ['password'] },
//     });
//     return res.json({
//       message: listUser,
//     });
//   },

//   includeUser: async (req, res) => {
//     try {
//       await model.Users.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//       });
//       return res.json({
//         message: 'sucesso',
//       });
//     } catch (err) {
//       return res.status(500).json({
//         message: err.message,
//       });
//     }
//   },

//   editUser: async (req, res) => {
//     const idUser = req.query.id;
//     try {
//       const var1 = await model.Users.findOne({
//         where: {
//           id: idUser,
//         },
//       });
//       if (!var1) {
//         return res.status(500).json({
//           message: 'Usuário não encontrado',
//         });
//       }
//       await model.Users.update(
//         {
//           password: req.body.newPassword,
//         },
//         {
//           where: {
//             id: idUser,
//           },
//         },
//       );
//       return res.json({
//         message: 'Senha alterada',
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error.toString(),
//       });
//     }
//   },

//   deleteUser2: async (req, res) => {
//     const idUser = req.query.id;
//     try {
//       const var1 = await model.Users.destroy({
//         where: {
//           id: idUser,
//         },
//       });
//       if (!var1) {
//         return res.status(500).json({
//           message: 'Usuário não encontrado',
//         });
//       }
//       return res.json({
//         message: 'Elemento apagado',
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error,
//       });
//     }
//   },
// };
