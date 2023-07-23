const router = require("express").Router();
const {
  getUsers,
  getSingleuser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js");

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleuser).put(updateUser).delete(deleteUser);

module.exports = router;
