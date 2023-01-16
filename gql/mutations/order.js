import { gql } from "graphql-request";
const ORDER = gql`
  mutation order($products: JSON) {
    createOrder(data: { products: $products }) {
      data {
        attributes {
          createdAt
        }
      }
    }
  }
`;
export default ORDER;
