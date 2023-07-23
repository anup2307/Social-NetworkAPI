const router = require("express").Router();
const {
  getThoughts,
  getSinglethought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController.js");

// /api/Thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/Thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSinglethought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtID/reactions
router.route("/:thoughtID/reactions").post(createReaction);

// /api/thoughts/:thoughtID/reactions/:reactionID
router.route("/:thoughtID/reactions/:reactionID").delete(deleteReaction);

module.exports = router;
