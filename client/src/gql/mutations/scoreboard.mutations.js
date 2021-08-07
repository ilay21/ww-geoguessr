import { gql } from "@apollo/client";

export const CREATE_SCOREBOARD = gql`
  mutation createScoreboard($title: String!, $emails: [String!]!) {
    createScoreboard(title: $title, emails: $emails) {
      status
    }
  }
`;
