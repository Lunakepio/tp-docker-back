module.exports = (server) => {
  const likesController = require("../controller/likesController");

  server
    .route("/likes/:postId")
    .post(likesController.likeAPost)
    .delete(likesController.unlikeAPost)
    .get(likesController.listAllLikes);
  
    server
      .route("/likes/comments/:commentId")
      .post(likesController.likeAComment)
      .delete(likesController.unlikeAComment)
      .get(likesController.listAllLikesComments);
    
};