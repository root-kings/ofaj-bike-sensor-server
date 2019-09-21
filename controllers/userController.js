const User = require('../models/user')

exports.user_create_post = (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  user
    .save()
    .then(user => {
      return res.send({ status: true, user })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send(err)
    })
}

exports.users_get = (req, res) => {
  User.find({})
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send(err)
    })
}

exports.user_login_post = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user && user.password == req.body.password) return res.send(true)
      return res.send(false)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send(err)
    })
}
