const profilePicture = require('../model/profilePictureModel');
const fs = require('fs');
const path = require('path');

exports.create = (req, res) => {
  const profilePicture = new ProfilePicture({
    name: req.body.name,
    path: req.file.path,
    user_id: req.body.user_id,
  });
  profilePicture
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the ProfilePicture.',
      });
    });
}

exports.findAll = (req, res) => {
  ProfilePicture.find()
    .then((profilePictures) => {
      res.send(profilePictures);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving profilePictures.',
      });
    });
}

exports.findOne = (req, res) => {
  ProfilePicture.findById(req.params.profilePictureId)
    .then((profilePicture) => {
      if (!profilePicture) {
        return res.status(404).send({
          message: `ProfilePicture not found with id ${req.params.profilePictureId}`,
        });
      }
      res.send(profilePicture);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `ProfilePicture not found with id ${req.params.profilePictureId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving profilePicture with id ${req.params.profilePictureId}`,
      });
    });
}

exports.update = (req, res) => {
  ProfilePicture.findByIdAndUpdate(
    req.params.profilePictureId,
    {
      name: req.body.name,
      path: req.file.path,
      user_id: req.body.user_id,
    },
    { new: true },
  )
    .then((profilePicture) => {
      if (!profilePicture) {
        return res.status(404).send({
          message: `ProfilePicture not found with id ${req.params.profilePictureId}`,
        });
      }
      res.send(profilePicture);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `ProfilePicture not found with id ${req.params.profilePictureId}`,
        });
      }
      return res.status(500).send({
        message: `Error updating profilePicture with id ${req.params.profilePictureId}`,
      });
    });
}

exports.delete = (req, res) => {
  ProfilePicture.findByIdAndRemove(req.params.profilePictureId)
    .then((profilePicture) => {
      if (!profilePicture) {
        return res.status(404).send({
          message: `ProfilePicture not found with id ${req.params.profilePictureId}`,
        });
      }
      fs.unlink(path.join(__dirname, '../', profilePicture.path), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send({ message: 'ProfilePicture deleted successfully!' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `ProfilePicture not found with id ${req.params.profilePictureId}`,
        });
      }
      return res.status(500).send({
        message: `Could not delete profilePicture with id ${req.params.profilePictureId}`,
      });
    });
}