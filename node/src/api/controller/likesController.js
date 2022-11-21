const Likes = require("../models/likesModel");
const Post = require("../models/postModel");

exports.likeAPost = (req, res) => {
  let newLike = new Likes(req.body);

  newLike.save((error, like) => {
      if (error) {
          res.status(401);
          console.log(error);
          res.json({ message: "Reqûete invalide." });
      }
      else {
          res.status(201);
          res.json(like);
          Post.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { likes: 1 } },
            { new: true },
            (err, post) => {
              if (err) {
                res.status(500).send
              }
            }
          );
      }
  })
};

exports.unlikeAPost = (req, res) => {
  Likes.remove({ postId: req.params.postId, userId: req.body.userId}, (err, like) => {
    if (err) {
      res.status
    }
    res.status(200).json({ message: "Like successfully deleted" });
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $inc: { likes: -1 } },
      { new: true },
      (err, post) => {
        if (err) {
          res.status(500).send
        }
      }
    );
  });
};

exports.listAllLikes = (req, res) => {
  Likes.find({postId : req.params.postId}, (err, likes) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).json(likes)
  })

}
