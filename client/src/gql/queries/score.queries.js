import { gql } from "@apollo/client";

export const GET_ALL_SCORES = gql`
  query GetAllScores($allScoresCategory: String!) {
    allScores(category: $allScoresCategory) {
      _id
      category
      date
      scores {
        name
        score
      }
    }
  }
`;
