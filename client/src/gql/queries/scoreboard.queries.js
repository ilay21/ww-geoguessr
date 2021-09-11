import { gql } from "@apollo/client";

export const GET_SCOREBOARDS = gql`
  query getScoreboards {
    getScoreboards {
      _id
      members
      title
      owner
    }
  }
`;

export const GET_SCOREBOARD_BY_TITLE = gql`
  query getScoreboardByTitle($scoreboardTitle: String!) {
    getScoreboardByTitle(scoreboardTitle: $scoreboardTitle) {
      _id
    }
  }
`;
