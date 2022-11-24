const Likes = require("../models/likesModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

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

exports.likeAComment = (req, res) => {
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
          Comment.findOneAndUpdate(
            { _id: req.params.commentId },
            { $inc: { likes: 1 } },
            { new: true },
            (err, comment) => {
              if (err) {
                res.status(500).send
              }
            }
          );
      }
  })
};

exports.unlikeAComment = (req, res) => {
  Likes.findOneAndDelete(
    { commentId: req.body.commentId, userId: req.body.userId},
    (err, like) => {
      if (err) {
        res
          .status(500)
      }
      res.status(200).json({ message: "Like supprimé." });
      Comment.findOneAndUpdate(
        { _id: req.body.commentId },
        { $inc: { likes: -1 } },
        { new: true },
        (err, comment) => {
          if (err) {
            res.status(500).send
          }
        }
      );
    }
  );
};

exports.unlikeAPost = (req, res) => {
  Likes.deleteOne({ postId: req.params.postId, userId: req.body.userId}, (err, like) => {
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


exports.listAllLikesComments = (req, res) => {
  Likes.find({commentId : req.params.commentId}, (err, likes) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).json(likes)
  })

}

