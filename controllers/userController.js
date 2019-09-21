const User = require("../models/user");

exports.user_create_post = (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  user
    .save()
    .then(savedUser => {
      return res.send(savedUser);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
};

exports.users_get = (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
};
