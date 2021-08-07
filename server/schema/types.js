const { gql } = require("apollo-server");

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
    gameScores: [ID]
    members: [ID]
  }

  type Query {
    allScores(category: String!): [GameScore]
    getScoreboards: [Scoreboard!]
  }

  type Mutation {
    login: MutationReponse
    createScoreboard(title: String!, emails: [String!]!): MutationReponse
  }
`;
