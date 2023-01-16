import React, { Fragment } from "react";
import Slider from "react-slick";
import MasterBanner from "./MasterBanner";
import { GET_SLIDESHOW_ADS } from "../../gql/queries";
import { useQuery } from "../../hooks";
import { API_URL } from "../../config/constants";

const HomeSlider = () => {
  const { data, loading, error } = useQuery(
    "homepage-ads-slideshow",
    GET_SLIDESHOW_ADS
  );
  let ads = data?.slideshows?.data;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    cssEase: "linear",
  };

  return (
    <Fragment>
      <section className="p-0 layout-7">
        <Slider className="slide-1 home-slider" {...settings}>
          {ads &&
            ads.map(({ attributes }, i) => {
              return (
                <MasterBanner
                  key={i}
                  img={`${API_URL}${attributes.ad.data.attributes.url}`}
                  title={attributes.title}
                  desc={attributes.description}
                  btn={attributes.btn_text}
                  link={attributes.btn_link || "/"}
                />
              );
            })}
        </Slider>
      </section>
    </Fragment>
  );
};

export default HomeSlider;
