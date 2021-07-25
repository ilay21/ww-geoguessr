const { dateScalar } = require("../schema/custom-scalars");
const ScoreModel = require("../models/score.model");

module.exports = {
  Date: dateScalar,
  Query: {
    async allScores(parent, args, context, info) {
      if (!context.user) return {};
      return ScoreModel.getAll();
    },
  },
};
