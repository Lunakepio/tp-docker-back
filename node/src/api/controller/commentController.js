const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.listAllComments = (req, res) => {
  Comment.find({ postId : req.params.postId }, (err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(posts);
  });
}

exports.createAComment = (req, res) => {
  let newComment = new Comment(req.body);

  newComment.save((error, comment) => {
      if (error) {
          res.status(401);
          console.log(error);
          res.json({ message: "Reqûete invalide." });
      }
      else {
          res.status(201);
          res.json(comment);
      }
  })
}

exports.readAComment = (req, res) => {
  Comment.findById(req.params.commentId, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(comment);
  });
}

exports.updateAComment = (req, res) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId },
    req.body,
    { new: true },
    (err, comment) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(comment);
    }
  );
}

exports.deleteAComment = (req, res) => {
  Comment.remove({ _id: req.params.commentId }, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json({ message: "Comment successfully deleted" });
  });
}

