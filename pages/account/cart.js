import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import CartPage from "./common/cart-page";

const Wishlist = () => {
  return (
    <CommonLayout parent="home" title="cart">
      <CartPage />
    </CommonLayout>
  );
};

export default Wishlist;
