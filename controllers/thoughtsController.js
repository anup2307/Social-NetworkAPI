const { ObjectId } = require("mongoose").Types;
const { Users, Thoughts } = require("../models");

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single Thought by its ID
  async getSinglethought(req, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new thought and push it to the thoughts array in the user collection
  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);

      const user = await Users.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user found!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a Thought
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a Thought and remove them from the User
  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      // const user = await Users.findOneAndUpdate(
      //   { thoughts: req.params.thoughtId },
      //   { $pull: { thoughts: req.params.thoughtId } },
      //   { new: true }
      // );

      // if (!user) {
      //   return res.status(404).json({
      //     message: "Thought deleted, but no user data found",
      //   });
      // }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a Reaction
  async createReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought found " });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
