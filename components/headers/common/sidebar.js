import React, { useState, useEffect, Fragment } from "react";

import { useQuery } from "../../../hooks";
import { GET_CATEGORIES } from "../../../gql/queries";

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const { data } = useQuery("side-menu-categories", GET_CATEGORIES);
  console.log({ data }, "log");

  // setting categories
  useEffect(() => {
    if (data && data.categories) {
      // map data to state according to our needs
      const mapDataToState = (data) => {
        return data.map(({ attributes }) => {
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

      setCategories(mapDataToState(data.categories.data));
    }
  }, [data]);

  const closeNav = () => {
    var closemyslide = document.getElementById("mySidenav");
    if (closemyslide) closemyslide.classList.remove("open-side");
  };

  const handleSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) {
      return;
    }

    if (event.target.nextElementSibling.classList.contains("opensub1"))
      event.target.nextElementSibling.classList.remove("opensub1");
    else {
      document.querySelectorAll(".opensub1").forEach(function (value) {
        value.classList.remove("opensub1");
      });
      event.target.nextElementSibling.classList.add("opensub1");
    }
  };

  return (
    <Fragment>
      <div id="mySidenav" className="sidenav">
        <a href={null} className="sidebar-overlay" onClick={closeNav}></a>
        <nav>
          <a href={null} onClick={closeNav}>
            <div className="sidebar-back text-start">
              <i className="fa fa-angle-left pe-2" aria-hidden="true"></i> Back
            </div>
          </a>
          <ul id="sub-menu" className="sidebar-menu">
            {categories.map((category) => (
              <li>
                <a href={`/${category.slug}`} onClick={(e) => handleSubmenu(e)}>
                  {category.name}
                </a>
                <span className="sub-arrow"></span>
                <ul>
                  {category.sub_categories.map((sub_category) => (
                    <li>
                      <a href={`/${category.slug}/${sub_category.slug}`}>
                        {sub_category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideBar;
