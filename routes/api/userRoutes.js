const router = require("express").Router();
const {
  getUsers,
  getSingleuser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleuser).put(updateUser).delete(deleteUser);

// /api/users/:userID/friends/:friendID
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;
