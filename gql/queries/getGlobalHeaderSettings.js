import { gql } from "graphql-request";
export const GET_GLOBAL_HEADER_SETTINGS = gql`
  query {
    globalSetting {
      data {
        attributes {
          contact
          logo {
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
