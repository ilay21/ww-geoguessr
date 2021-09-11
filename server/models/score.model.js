const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

const scoreSchema = new Schema({
  scoreboardId: Schema.Types.ObjectId,
  url: String,
  category: String,
  date: Date,
  scores: [
    {
      name: String,
      score: Number,
    },
  ],
});

class ScoreClass extends Model {
  static getAll() {
    return this.find({}).lean();
  }

  static getScoreByUrlAndScoreboard(url, scoreboardId) {
    return this.findOne({ url, scoreboardId }).lean();
  }

  static createScore(scores, url, scoreboardId, category) {
    console.log("creating score with:", {
      scores,
      url,
      scoreboardId,
      category,
    });
    // return this.create({ scores, url, scoreboardId, category });
  }
}
scoreSchema.loadClass(ScoreClass);

module.exports = mongoose.model("Score", scoreSchema, "scores");
