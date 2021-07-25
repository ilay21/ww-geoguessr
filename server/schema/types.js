const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date

  type PlayerSingleScore {
    name: String
    score: Int
  }

  type GameScore {
    _id: ID
    url: String
    category: String
    date: Date
    scores: [PlayerSingleScore]
  }

  type Query {
    allScores(category: String): [GameScore]
  }
`;
