const jwt = require('jsonwebtoken');
const model = require('../app/models/');

module.exports = (req, res, next) => {
  console.log('entrei login');
  //   const { email } = req.body;
  //   const { password } = req.body;
  //   console.log(email, password);
  //   const user = model.Users.findOne({
  //     where: {
  //       email,
  //       password,
  //     },
  //   });
  //   if (user) {
  //     const payload = { id: user.id };
  //     const token = jwt.sign(payload, process.env.SECRET);
  //     res.json({ token });
  //     console.log('token: '); console.log(token);
  //     next();
  //   } else {
  //     res.sendStatus(401);
  //   }
  // } else {
  //   res.sendStatus(401);
  // }
};
