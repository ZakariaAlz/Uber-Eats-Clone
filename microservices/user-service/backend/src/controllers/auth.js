const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



exports.register = (req, res) => {

  var newUser = new User(req.body.username, bcrypt.hashSync(req.body.password, 10));

  User_DB.push(newUser);

  return res.status(201).json({

    "msg": "New User created !"

  });
};