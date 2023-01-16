import React from "react";
import HeaderOne from "../headers/header-one";
import Breadcrumbs from "../common/widgets/breadcrumbs";
import Helmet from "react-helmet";
import favicon from "../../public/assets/images/favicon/1.png";
import MasterFooter from "../footers/common/MasterFooter";
import { API_URL } from "../../config/constants";
import { useQuery } from "../../hooks";
import { GET_GLOBAL_HEADER_SETTINGS } from "../../gql/queries";

const CommonLayout = ({ children, title, subTitle }) => {
  const { data, loading, error } = useQuery(
    "header-global-header-settings",
    GET_GLOBAL_HEADER_SETTINGS
  );
  let headerSettings = data?.globalSetting?.data.attributes;
  console.log("common layur", { data });
  return (
    <>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={favicon ? favicon : ""} />
      </Helmet> */}
      <HeaderOne
        topClass="top-header"
        logo={headerSettings?.logo?.data?.attributes?.url}
        contact={headerSettings?.contact}
      />
      <Breadcrumbs title={title} subTitle={subTitle} />
      <>{children}</>
      <MasterFooter
        footerClass={`footer-light `}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={false}
      />
    </>
  );
};

export default CommonLayout;
