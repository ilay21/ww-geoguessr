import { gql } from "@apollo/client";

export const CREATE_SCORE = gql`
  mutation createScore(
    $url: String!
    $scoreboardId: String!
    $scoreboardTitle: String!
    $email: String
    $password: String
  ) {
    createScore(
      url: $url
      scoreboardId: $scoreboardId
      scoreboardTitle: $scoreboardTitle
      email: $email
      password: $password
    ) {
      status
    }
  }
`;
