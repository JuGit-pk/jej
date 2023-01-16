import { useState, useEffect } from "react";
import { GET_CATEGORIES } from "../gql/queries";
import { useQuery } from "./";

const useBreadcrumbs = (router) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { data } = useQuery("all-categories", GET_CATEGORIES);
  useEffect(() => {
    if (data && data.categories && router) {
      const mapDataToState = (data) => {
        return data.categories.data.map(({ attributes }) => {
          return {
            name: attributes.name,
            slug: attributes.slug,
            sub_categories: attributes.sub_categories.data.map(
              ({ attributes }) => {
                return {
                  name: attributes.name,
                  slug: attributes.slug,
                };
              }
            ),
          };
        });
      };
      const categories = mapDataToState(data);

      const category = categories.find(
        (category) => category.slug === router.query.category
      );
      const subCategory = category.sub_categories.find(
        (subCategory) => subCategory.slug === router.query.subCategory
      );
      setBreadcrumbs([category, subCategory]);
    }
  }, [data]);
  return breadcrumbs;
};

export default useBreadcrumbs;
