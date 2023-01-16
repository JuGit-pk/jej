import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Row, Col, Media, Modal, ModalBody } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import MasterProductDetail from "./MasterProductDetail";
import { API_URL } from "../../../config/constants";

const ProductItem = ({
  product,
  addCart,
  backImage,
  des,
  addWishlist,
  cartClass,
  productDetail,
  addCompare,
  title,
}) => {
  // eslint-disable-next-line
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const setQuantity = cartContext.setQuantity;

  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];

  const onClickHandle = (img) => {
    setImage(img);
  };

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = () => {
    router.push(`/products/${product.slug}`);
  };

  const variantChangeByColor = (imgId, product_images) => {
    product_images.map((data) => {
      if (data.image_id == imgId) {
        setImage(data.src);
      }
    });
  };
  return (
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="front" onClick={clickProductDetail}>
          <Media
            src={image || `${API_URL}${product.image.data[0].attributes.url}`}
            // style to maintain aspect ratio
            style={{
              objectFit: "cover",
              objectPosition: "center",
              height: "auto",
              width: "100%",
            }}
            alt=""
          />
        </div>
        {backImage ? (
          product.image.data[1].attributes.url === "undefined" ? (
            "false"
          ) : (
            <div className="back" onClick={clickProductDetail}>
              <Media
                src={`${API_URL}${product.image.data[1].attributes.url}`}
                className="img-fluid m-auto"
                alt=""
              />
            </div>
          )
        ) : (
          ""
        )}

        <div className={cartClass}>
          <button title="Add to cart" onClick={addCart}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
          <a href={null} title="Add to Wishlist" onClick={addWishlist}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </a>
          <a href={null} title="Quick View" onClick={toggle}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
          {/* <a href={null} title="Compare" onClick={toggleCompare}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </a>
          <Modal
            isOpen={modalCompare}
            toggle={toggleCompare}
            size="lg"
            centered
          >
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    <Media
                      src={`${
                        product.variants && image
                          ? image
                          : product.images[0].src
                      }`}
                      alt=""
                      className="img-fluid"
                    />
                    <div className="media-body align-self-center text-center">
                      <h5>
                        <i className="fa fa-check"></i>Item{" "}
                        <span>{product.title} </span>
                        <span> successfully added to your Compare list</span>
                      </h5>
                      <div className="buttons d-flex justify-content-center">
                        <Link href="/page/compare">
                          <a
                            href={null}
                            className="btn-sm btn-solid"
                            onClick={addCompare}
                          >
                            View Compare list
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal> */}
        </div>
        {product?.image?.data.length > 1 ? (
          <ul className="product-thumb-list">
            {product.image.data.map((img, i) => (
              <li
                className={`grid_thumb_img ${
                  `${API_URL}${img.attributes.url}` === image ? "active" : ""
                }`}
                key={i}
              >
                <a href={null} title="Add to Wishlist">
                  <Media
                    // src={`${img.src}`}
                    src={`${API_URL}${img.attributes.url}`}
                    alt="wishlist"
                    onClick={() =>
                      onClickHandle(`${API_URL}${img.attributes.url}`)
                    }
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <MasterProductDetail
        product={product}
        productDetail={productDetail}
        currency={currency}
        uniqueTags={uniqueTags}
        title={title}
        des={des}
        variantChangeByColor={variantChangeByColor}
      />
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-lg quickview-modal"
        centered
      >
        <ModalBody>
          <Row>
            <Col lg="6" xs="12">
              <div className="quick-view-img">
                <Media
                  // src={`${
                  //   product.variants && image ? image : product.images[0].src
                  // }`}
                  src={`${API_URL}${product.image.data[0].attributes.url}`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right">
                <h2> {product.title} </h2>
                <h3>
                  {/* {currency.symbol} */}
                  {(product.price * currency.value).toFixed(2)}
                </h3>
                {/* {product.variants ? (
                  <ul className="color-variant">
                    {uniqueTags ? (
                      <ul className="color-variant">
                        {product.type === "jewellery" ||
                        product.type === "nursery" ||
                        product.type === "beauty" ||
                        product.type === "electronics" ||
                        product.type === "goggles" ||
                        product.type === "watch" ||
                        product.type === "pets" ? (
                          ""
                        ) : (
                          <>
                            {uniqueTags.map((vari, i) => {
                              return (
                                <li
                                  className={vari.color}
                                  key={i}
                                  title={vari.color}
                                  onClick={() =>
                                    variantChangeByColor(
                                      vari.image_id,
                                      product.images
                                    )
                                  }
                                ></li>
                              );
                            })}
                          </>
                        )}
                      </ul>
                    ) : (
                      ""
                    )}
                  </ul>
                ) : (
                  ""
                )} */}
                <div className="border-product">
                  <h6 className="product-title">product details</h6>
                  <p>{product.description}</p>
                </div>
                <div className="product-description border-product">
                  {/* {product.size ? (
                    <div className="size-box">
                      <ul>
                        {product.size.map((size, i) => {
                          return (
                            <li key={i}>
                              <a href={null}>{size}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )} */}
                  <h6 className="product-title">quantity</h6>
                  <div className="qty-box">
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <button
                          type="button"
                          className="btn quantity-left-minus"
                          onClick={minusQty}
                          data-type="minus"
                          data-field=""
                        >
                          <i className="fa fa-angle-left"></i>
                        </button>
                      </span>
                      <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        onChange={changeQty}
                        className="form-control input-number"
                      />
                      <span className="input-group-prepend">
                        <button
                          type="button"
                          className="btn quantity-right-plus"
                          onClick={() => plusQty(product)}
                          data-type="plus"
                          data-field=""
                        >
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product-buttons">
                  <button
                    className="btn btn-solid"
                    onClick={() => addCart(product)}
                  >
                    add to cart
                  </button>
                  <button
                    className="btn btn-solid"
                    onClick={clickProductDetail}
                  >
                    View detail
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductItem;
