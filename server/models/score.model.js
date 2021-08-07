const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

const scoreSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
}
scoreSchema.loadClass(ScoreClass);

module.exports = mongoose.model("Score", scoreSchema, "scores");
