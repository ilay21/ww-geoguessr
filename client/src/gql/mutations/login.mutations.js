import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login {
    login {
      status
    }
  }
`;
