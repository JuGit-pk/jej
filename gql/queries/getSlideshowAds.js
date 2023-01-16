import { gql } from "graphql-request";
export const GET_SLIDESHOW_ADS = gql`
  query {
    slideshows {
      data {
        attributes {
          title
          description
          btn_text
          btn_link
          ad {
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
