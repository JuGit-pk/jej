import { gql } from "graphql-request";
export const GET_PRODUCTS = gql`
  query {
    products {
      data {
        attributes {
          name
        }
      }
    }
  }
`;
