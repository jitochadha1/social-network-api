const router = require("express").Router();
const {
  addThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts get all thoughts
router.route("/").get(getAllThoughts);

// /api/thoughts/<thoughtId>
router.route("/:thoughtId").get(getThoughtById);

// /api/thoughts/<userId> add a thought
router.route("/:userId").post(addThought);

// /api/thoughts/<thoughtId>
router.route("/:thoughtId").put(updateThought);

// /api/thoughts/<userId>/<thoughtId> add reaction, remove thought
router.route("/:userId/:thoughtId").put(addReaction).delete(removeThought);

// remove reaction to thought
router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
