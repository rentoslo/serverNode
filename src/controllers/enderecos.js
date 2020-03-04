const BaseController = require('./BaseController');

const model = require('../../app/models');

class Address extends BaseController {
  constructor() {
    super('/address', model.Enderecos);
  }
}

module.exports = new Address();

// const model = require('../../app/models');

// module.exports = {
//   addEnderecos: async (req, res) => {
//     await model.Enderecos.create({
//       userId: 1,
//       cep: req.body.cep,
//       rua: req.body.rua,
//       numero: req.body.numero,
//       bairro: req.body.bairro,
//       estado: req.body.estado,
//     });
//     return res.json({
//       message: 'Endereço incluído',
//     });
//   },

//   listEndereco: async (req, res) => {
//     const enderecos = await model.Enderecos.findAll();
//     return res.json(enderecos);
//   },

//   listEnderecoUser: async (req, res) => {
//     // const var1 = req.query.id;
//     const enderecosUser = await model.Enderecos.findAll({
//       include: [
//         {
//           model: model.Users, as: 'user', attributes: { exclude: ['password'] },
//         },
//       ],
//     });
//     return res.json(enderecosUser);
//   },

// };
