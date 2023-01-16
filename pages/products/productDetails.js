import React, { useState, useRef, useEffect } from "react";
import ProductTab from "./common/product-tab";
import Service from "./common/service";
import Slider from "react-slick";
import { gql } from "@apollo/client";
import DetailsWithPrice from "./common/detail-price";
import Filter from "./common/filter";
import { Row, Col, Container, Media } from "reactstrap";
import { GET_PRODUCT_DETAILS } from "../../gql/queries/getProductDetails";
import { useRouter } from "next/router";
import { useQuery } from "../../hooks";
import { API_URL } from "../../config/constants";

const ProductDetails = () => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useQuery("aa", GET_PRODUCT_DETAILS, {
    slug,
  });
  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);
  const { nav1, nav2 } = state;

  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col lg="9" sm="12" xs="12">
              <div className="container-fluid">
                <Row>
                  <Col xl="12" className="filter-col">
                    <div className="filter-main-btn mb-2">
                      <span onClick={filterClick} className="filter-btn">
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        filter
                      </span>
                    </div>
                  </Col>
                </Row>
                {data && data.products ? (
                  <Row>
                    <Col lg="6" className="product-thumbnail">
                      <Slider
                        {...products}
                        asNavFor={nav2}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slick"
                      >
                        {data.products.data[0]?.attributes.image.data.map(
                          (vari, index) => (
                            <div key={index}>
                              <Media
                                src={`${API_URL}${vari.attributes.url}`}
                                // alt={image.alt}
                                className="img-fluid image_zoom_cls-0"
                              />
                              {/* <ImageZoom
                                image={`${API_URL}${vari.attributes.url}`}
                              /> */}
                            </div>
                          )
                        )}
                      </Slider>
                      <Slider
                        className="slider-nav"
                        {...productsnav}
                        asNavFor={nav1}
                        ref={(slider) => (slider2.current = slider)}
                      >
                        {data.products.variants
                          ? data.products.data[0].attributes.image.data.map(
                              (vari, index) => (
                                <div key={index}>
                                  <Media
                                    src={`${API_URL}${vari.attributes.url}`}
                                    key={index}
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                              )
                            )
                          : ""}
                      </Slider>
                    </Col>
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        // changeColorVar={changeColorVar}
                        item={data.products.data[0]}
                      />
                    </Col>
                  </Row>
                ) : (
                  "loading"
                )}
              </div>
              <ProductTab />
            </Col>
            <Col sm="3" className="collection-filter" id="filter">
              {/* <Filter /> */}
              <Service />
              {/* <!-- side-bar single product slider start --> */}
              {/* <NewProduct /> */}
              {/* <!-- side-bar single product slider end --> */}
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default ProductDetails;
