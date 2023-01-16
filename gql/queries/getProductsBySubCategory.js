// import { gql } from "graphql-request";
// export const GET_PRODUCTS_BY_SUB_CATEGORY = gql`
//   query getProductsBySubCategory($slug: String!, $modelName: String!) {
//     findSlug(slug: $slug, modelName: $modelName) {
//       ... on SubCategoryEntityResponse {
//         data {
//           attributes {
//             name
//             products {
//               data {
//                 attributes {
//                   name
//                   image {
//                     data {
//                       attributes {
//                         url
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

import { gql } from "graphql-request";
export const GET_PRODUCTS_BY_SUB_CATEGORY = gql`
  query getProductsBySubCategory($subCategory: String!) {
    products(filters: { category: { slug: { contains: $subCategory } } }) {
      data {
        attributes {
          title
          slug
          price
          discount
          description
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
