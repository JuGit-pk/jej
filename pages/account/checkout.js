import React, { useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import CheckoutPage from "./common/checkout-page";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Checkout = () => {
  const { isUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isUser) {
      toast.error("Please login to continue");
      router.push("/account/login");
    }
  }, [isUser]);

  return (
    <>
      <CommonLayout parent="home" title="checkout">
        <CheckoutPage />
      </CommonLayout>
    </>
  );
};

export default Checkout;
