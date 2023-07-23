const router = require("express").Router();
const {
  getThoughts,
  getSinglethought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtsController.js");

// /api/Thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/Thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSinglethought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
