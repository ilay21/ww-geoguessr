import { gql } from "@apollo/client";

export const GET_SCOREBOARDS = gql`
  query getScoreboards {
    getScoreboards {
      gameScores
      members
      title
      owner
    }
  }
`;
