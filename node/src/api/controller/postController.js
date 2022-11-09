const Post = require("../models/postModel");

exports.listAllPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(posts);
  });
}

exports.createAPost = (req, res) => {
  let newPost = new Post(req.body);

  newPost.save((error, post) => {
      if (error) {
          res.status(401);
          console.log(error);
          res.json({ message: "Reqûete invalide." });
      }
      else {
          res.status(201);
          res.json(post);
      }
  })
}

exports.readAPost = (req, res) => {
  Post.findById(req.params.postId, (err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(post);
  });
}

exports.updateAPost = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    req.body,
    { new: true },
    (err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(post);
    }
  );
}

exports.deleteAPost = (req, res) => {
  Post.remove({ _id: req.params.postId }, (err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json({ message: "Post successfully deleted" });
  });
}