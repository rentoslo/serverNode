const BaseController = require('./BaseController');

const model = require('../models');

class Address extends BaseController {
  constructor() {
    super('/address', model.Enderecos);
  }
}

module.exports = new Address();
