import { gql } from "graphql-request";
export const GET_SUBCAT_FROM_CAT = gql`
  query getProductsByCategory($slug: String!, $modelName: String!) {
    findSlug(slug: $slug, modelName: $modelName) {
      ... on CategoryEntityResponse {
        data {
          attributes {
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
  }
`;
