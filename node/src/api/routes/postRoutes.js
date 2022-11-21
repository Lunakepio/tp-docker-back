module.exports = (server) => {
  const postController = require("../controller/postController");

  server
    .route("/posts")
    .get(postController.listAllPosts)
    .post(postController.createAPost);

  server
    .route("/posts/:postId")
    .get(postController.readAPost)
    .put(postController.updateAPost)
    .delete(postController.deleteAPost)
};
