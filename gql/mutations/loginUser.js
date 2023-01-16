import { gql } from "graphql-request";
const LOGIN_USER = gql`
  mutation loginUser($identifier: String!, $password: String!) {
    login(
      input: { identifier: $identifier, password: $password, provider: "local" }
    ) {
      jwt
      user {
        id
        username
        email
        role {
          name
          type
        }
        confirmed
        blocked
      }
    }
  }
`;
export default LOGIN_USER;
