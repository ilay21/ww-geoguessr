const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type PlayerSingleScore {
    name: String
    score: Int
  }

  enum MutationReponseStatuses {
    SUCCESS
    FAILURE
  }

  type MutationReponse {
    status: MutationReponseStatuses
    errors: [String]
  }

  type User {
    email: String!
    gotGgCredentials: Boolean
  }

  type GameScore {
    _id: ID
    url: String
    category: String
    date: Date
    scores: [PlayerSingleScore]
  }

  type Scoreboard {
    _id: ID
    title: String
    owner: ID
    members: [ID]
  }

  type Query {
    allScores(category: String!): [GameScore]
    getScoreboards: [Scoreboard!]
    getUser: User
    getScoreboardByTitle(scoreboardTitle: String!): Scoreboard
  }

  type Mutation {
    login: MutationReponse
    createScoreboard(title: String!, emails: [String!]!): MutationReponse
    createScore(
      url: String!
      scoreboardId: String!
      scoreboardTitle: String!
      email: String
      password: String
    ): MutationReponse
  }
`;
