require('dotenv-safe').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const routes = require('./src/routes');
const config = require('../serverNode/src/config/nodemailer');

const app = express();

app.use(bodyParser.json());

routes.forEach((route) => app.use(route));

// TODO: adicionar env
app.listen(3333, () => {
  console.log('Servidor online porta 3333');
});
