import { gql } from "graphql-request";
export const GET_CATEGORIES = gql`
  query {
    categories {
      data {
        attributes {
          name
          slug
          sub_categories {
            data {
              attributes {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;
