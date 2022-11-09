module.exports = (server) => {
  const commentController = require("../controller/commentController");

  server
    .route("/posts/:postId/comments")
    .get(commentController.listAllComments)
    .post(commentController.createAComment);

  server
    .route("/comments/:commentId")
    .get(commentController.readAComment)
    .put(commentController.updateAComment)
    .delete(commentController.deleteAComment);
};
