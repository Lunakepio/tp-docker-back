const User = require("../models/userModel");

exports.listAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(users);
  });
}

exports.logAUser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    if (user) {
      if (user.password === req.body.password) {
        res.status(200).json(user);
      } else {
        res.status(401).send("Wrong password");
      }
    } else {
      res.status(404).send("User not found");
    }
  });
}

exports.createAUser = (req, res) => {
  let newUser = new User(req.body);

  newUser.save((error, user) => {
      if (error) {
          res.status(401);
          console.log(error);
          res.json({ message: "Invalid request." });
      }
      else {
          res.status(201);
          res.json(user);
      }
  })
}

exports.readAUser = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
}

exports.updateAUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(user);
    }
  );
}

exports.deleteAUser = (req, res) => {
  User.remove({ _id: req.params.userId }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json({ message: "User successfully deleted" });
  });
}

