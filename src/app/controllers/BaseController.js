const { Router } = require('express');
const bcrypt = require('bcrypt');
const mailer = require('nodemailer');
const configMailer = require('../../config/nodemailer');


class BaseController {
  constructor(path, modelDB) {
    this.path = path;
    this.model = modelDB;
  }

  /**
   * Listar todos os registros
   * @param {Object} req
   * @param {Object} res
   * @returns array de objetos
   */
  async list(req, res) {
    const { query } = req;
    try {
      const response = await this.model.findAll({
        ...query,
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: error.toString(),
      });
    }
  }

  async listOne(req, res) {
    const { id } = req.params;
    const { query } = req;
    try {
      const response = await this.model.findByPk(id, {
        ...query,
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: error.toString(),
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const response = await this.model.destroy({
        where: {
          id,
        },
      });
      if (!response) {
        return res.status(500).json({
          message: 'Dado não encontrado',
        });
      }
      return res.json({
        message: 'Elemento apagado',
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }

  // createResource(req, res) {}
  async createItem(req, res) {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const senhaParaSalvar = bcrypt.hashSync(req.body.password, salt);
      req.body.password = senhaParaSalvar;
    }
    try {
      await this.model.create(
        { ...req.body },
      );
      // enviando mensagem nodemail
      const transporter = mailer.createTransport(configMailer);
      const message = {
        from: 'rentoslo@yahoo.com',
        to: 'matheusikatec@ikatec.com',
        subject: 'Bem vindo à Ikatec',
        text: 'Olá! Seja bem vindo!',
      };
      transporter.sendMail(message, (error) => {
        console.log('message'); console.log(message);
        if (error) {
          return res.status(500).json({
            message: error.message,
          });
        }
        return res.json({
          message: 'sucesso',
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  // updateResource(req, res) {}
  async updateItem(req, res) {
    const { id } = req.params;
    try {
      const isRecord = await this.model.findOne({
        where: {
          id,
        },
      });
      if (!isRecord) {
        return res.status(500).json({
          message: 'Dado não encontrado',
        });
      }

      // colocar  o update

      const response = await this.model.findOne({
        where: {
          id,
        },
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: error.toString(),
      });
    }
  }

  routes() {
    const route = Router();

    route.get(this.path, this.list.bind(this));
    route.get(`${this.path}/:id`, this.listOne.bind(this));
    route.delete(`${this.path}/delete/:id`, this.delete.bind(this));
    route.put(`${this.path}/update/:id`, this.updateItem.bind(this));
    route.post(`${this.path}/create/`, this.createItem.bind(this));
    // route.put(`${this.path}/changePass/`, this.createItem.bind(this));

    return route;
  }
}

module.exports = BaseController;
