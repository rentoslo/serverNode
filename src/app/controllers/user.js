// const users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BaseController = require('./BaseController');
const model = require('../models/');

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

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = this.modelUser.findOne({
        where: {
          email,
          password,
        },
      });
      if (!user) {
        return res.status(500).json({
          message: 'Usuário inválido',
        });
      }

      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.SECRET);

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }

  routes() {
    const route = super.routes();

    route.put('/updatePassword/:id', this.updatePassword.bind(this));
    route.post('/loginUser/', this.loginUser.bind(this));

    return route;
  }
}

module.exports = new Users();
