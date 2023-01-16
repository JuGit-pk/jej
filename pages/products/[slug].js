import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import ProductDetails from "./productDetails";

const ProductDetail = () => {
  return (
    <CommonLayout parent="home" title="product">
      <ProductDetails />
    </CommonLayout>
  );
};

export default ProductDetail;
