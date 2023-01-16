import { useEffect } from "react";
import HeaderOne from "../components/headers/header-one";
import Paragraph from "../components/common/Paragraph";
import Helmet from "react-helmet";
import MasterFooter from "../components/footers/common/MasterFooter";
import HomeSlider from "../components/common/Home-Slider";
import Collections from "../components/common/Collections";
import ProductSection from "../components/common/Collections/Collection10";
import { useGlobalHeaderSettings } from "../hooks";
import LogoBlock from "../components/common/logo-block";

const Marketplace = () => {
  const { data, loading, error } = useGlobalHeaderSettings();
  let headerSettings = data?.globalSetting?.data.attributes;
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-deafult", "#3e5067");
  });
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/x-icon"
          href={"/assets/images/favicon/9.png"}
        />
      </Helmet>
      <HeaderOne
        logo={headerSettings?.logo?.data?.attributes?.url}
        contact={headerSettings?.contact}
        headerClass="marketplace"
        topClass="top-header"
      />
      <HomeSlider />
      <div className="section-b-space">
        <LogoBlock />
      </div>
      <Collections />
      <Paragraph
        title="title1 section-t-space"
        inner="title-inner1"
        line={false}
      />
      <ProductSection type="marketplace" />

      <MasterFooter
        footerClass={`footer-light`}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={false}
        logoName={"logo/18.png"}
      />
    </>
  );
};

export default Marketplace;
