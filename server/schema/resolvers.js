const { dateScalar } = require("../schema/custom-scalars");
const ScoreModel = require("../models/score.model");
const UserModel = require("../models/user.model");

const LOGIN_RESPONSE = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

module.exports = {
  Date: dateScalar,
  Query: {
    async allScores(parent, args, context, info) {
      if (!context.user) return {};
      return ScoreModel.getAll();
    },
  },
  Mutation: {
    async login(parent, args, context, info) {
      if (!context.user) return LOGIN_RESPONSE.FAILURE;
      const dbUser = await UserModel.getUserByEmail(context.user.email);
      if (!dbUser) {
        await UserModel.addUser(context.user.email);
      }
      return {
        status: LOGIN_RESPONSE.SUCCESS,
      };
    },
  },
};
