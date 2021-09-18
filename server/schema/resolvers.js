const { ApolloError, ForbiddenError } = require("apollo-server-express");
const { dateScalar } = require("../schema/custom-scalars");
const ScoreModel = require("../models/score.model");
const UserModel = require("../models/user.model");
const ScoreboardModel = require("../models/scoreboard.model");
const { getCredentials, getDataFromUrl } = require("../utils/ggScraper");

const MUTATION_RESPONSE = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

module.exports = {
  Date: dateScalar,
  Query: {
    async getUser(parent, args, context, info) {
      if (!context.user) throw new ApolloError("no user found on context");
      const dbUser = await UserModel.getUserByEmail(context.user.email);
      const gotGgCredentials = Boolean(
        dbUser.ggCredentials &&
          dbUser.ggCredentials.email &&
          dbUser.ggCredentials.password
      );
      delete dbUser.ggCredentials;
      return {
        ...dbUser,
        gotGgCredentials,
      };
    },
    async allScores(parent, args, context, info) {
      if (!context.user) throw new ApolloError("no user found on context");
      return ScoreModel.getAll();
    },
    async getScoreboards(parent, args, context, info) {
      if (!context.user) throw new ApolloError("no user found on context");

      const { _id } = await UserModel.getUserByEmail(context.user.email);
      return ScoreboardModel.getScoreboardsByUser(_id);
    },
    async getScoreboardByTitle(parent, { scoreboardTitle }, context, info) {
      if (!context.user) throw new ApolloError("no user found on context");

      return ScoreboardModel.getScoreboardByTitle(scoreboardTitle);
    },
  },
  Mutation: {
    async createScoreboard(parent, { title, emails }, context, info) {
      if (!context.user) {
        throw new ApolloError("no user found on context");
      }
      const scoreboard = await ScoreboardModel.getScoreboardByTitle(title);
      if (!scoreboard) {
        const users = await UserModel.getUsersByEmails(emails);
        const { _id } = await UserModel.getUserByEmail(context.user.email);
        if (users && users.length) {
          const members = users.map(({ _id }) => _id);
          await ScoreboardModel.createScoreboard(title, members, _id);
        }
      } else {
        throw new ApolloError("Scoreboard title already exists");
      }
      return {
        status: MUTATION_RESPONSE.SUCCESS,
      };
    },
    async login(parent, args, context, info) {
      if (!context.user) {
        throw new ApolloError("no user found on context");
      }
      const dbUser = await UserModel.getUserByEmail(context.user.email);
      if (!dbUser) {
        await UserModel.addUser(context.user.email);
      }
      return {
        status: MUTATION_RESPONSE.SUCCESS,
      };
    },
    async createScore(
      parent,
      {
        url,
        scoreboardId,
        scoreboardTitle,
        email: ggEmail,
        password: ggPassword,
      },
      context
    ) {
      if (!context.user) {
        throw new ApolloError("no user found on context");
      }
      let cred = await getCredentials(context, ggEmail, ggPassword);
      const scores = await getDataFromUrl(url, cred);
      const existingScore = await ScoreModel.getScoreByUrlAndScoreboard(
        url,
        scoreboardId
      );

      if (existingScore) {
        return new ForbiddenError(
          "Score with this URL already exists for this scoreboard"
        );
      }

      const scoresAsList = Object.keys(scores).map((name) => ({
        name,
        score: scores[name],
      }));

      await ScoreModel.createScore(
        scoresAsList,
        url,
        scoreboardId,
        scoreboardTitle
      );

      return { status: MUTATION_RESPONSE.SUCCESS };
    },
  },
};
