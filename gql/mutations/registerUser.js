import { gql } from "graphql-request";
const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: { username: $username, email: $email, password: $password }
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
export default REGISTER_USER;
