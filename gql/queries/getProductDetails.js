import { gql } from "graphql-request";
export const GET_PRODUCT_DETAILS = gql`
  query productDetail($slug: String!) {
    products(filters: { slug: { contains: $slug } }) {
      data {
        attributes {
          title
          slug
          description
          discount
          price
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
`;
