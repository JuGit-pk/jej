import { gql } from "graphql-request";
export const GET_CATEGORY_THUMBNAILS = gql`
  query {
    categories {
      data {
        attributes {
          name
          slug
          thumbnail {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
