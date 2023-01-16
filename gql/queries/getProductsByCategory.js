import { gql } from "graphql-request";
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query getProductsByCategory($slug: String!, $modelName: String!) {
    findSlug(slug: $slug, modelName: $modelName) {
      ... on SubCategoryEntityResponse {
        data {
          attributes {
            name
            products {
              data {
                attributes {
                  name
                  image {
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
        }
      }
    }
  }
`;
