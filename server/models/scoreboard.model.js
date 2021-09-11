const mongoose = require("mongoose");
const {
  Schema,
  Model,
  Schema: {
    Types: { ObjectId },
  },
} = mongoose;

const scoreboardSchema = new Schema({
  title: String,
  owner: ObjectId,
  members: [ObjectId],
});

class ScoreboardClass extends Model {
  static createScoreboard(title, members, owner) {
    return this.create({ title, members, owner });
  }
  static getScoreboardByTitle(title) {
    return this.findOne({ title }).lean();
  }
  static getScoreboardsByUser(userId) {
    return this.aggregate().match({
      $or: [
        {
          members: userId,
        },
        {
          owner: userId,
        },
      ],
    });
  }
}
scoreboardSchema.loadClass(ScoreboardClass);

module.exports = mongoose.model("Scoreboard", scoreboardSchema, "scoreboards");
