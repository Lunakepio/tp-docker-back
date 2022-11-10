module.exports = (server) => {

  const userController = require("../controller/userController");

  server
    .route("/users")
    .get(userController.listAllUsers)
    .post(userController.createAUser);

  server
    .route("/users/:userId")
    .get(userController.readAUser)
    .put(userController.updateAUser)
    .delete(userController.deleteAUser);

  server.route("/users/login").post(userController.logAUser);
}