import React, { useContext, useState } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "react-query";
import { ORDER } from "../../../gql/mutations";
import { GRAPHQL_API_URL } from "../../../config/constants";
import { GraphQLClient } from "graphql-request";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("stripe");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // initialise the hook
  const router = useRouter();

  const checkhandle = (value) => {
    setPayment(value);
  };
  const { isUser, Cookies } = useContext(AuthContext);
  const stripePromise = loadStripe(
    "pk_test_51MPVLyKnQZ3NP7WyXDNXse91UhASYhw171nNbCip3ohd1h0u0BDu5yUJjXOnBsyp5zpLNP6bTb8jaznsRe2ozS4T00lUQowz3o"
  );

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };

  const client = new GraphQLClient(GRAPHQL_API_URL, {
    headers: {
      authorization: `Bearer ${isUser && Cookies.get("user")}`,
    },
  });

  //
  // mutation function
  const mutationFn = async (data) => {
    try {
      const { createOrder } = await client.request(ORDER, {
        products: JSON.stringify(data),
      });
      return createOrder;
    } catch (error) {
      let data = JSON.stringify(error, undefined, 2); // error handling for graphql-request
      data = JSON.parse(data);
      const response = data.response;
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        throw new Error(response.errors[0].message);
      } else {
        throw new Error("Error ordering");
      }
    }
  };

  const onSuccess = (data) => {
    toast.success("On Suxcess Called");
  };

  const onError = (error) => {
    toast.error(error.message);
  };
  const mutation = useMutation({ mutationFn, onSuccess, onError });

  const onSubmit = async (data) => {
    if (data !== "") {
      // console.log({ cartItems: JSON.stringify(cartItems) }, "FROM CART");
      const stripe = stripePromise;
      await mutation.mutate(cartItems);
      // await stripe.redirectToCheckout({
      //   sessionId: res.data.stripeSession.id,
      // });

      // alert("You submitted the form and stuff!");
      // router.push({
      //   pathname: "/order-success",
      //   state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
      // });
    } else {
      errors.showMessages();
    }
  };
  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                {!isUser && (
                  <Col lg="6" sm="12" xs="12">
                    <div className="checkout-title">
                      <h3>Billing Details</h3>
                    </div>
                    <div className="row check-out">
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">First Name</div>
                        <input
                          type="text"
                          className={`${
                            errors.firstName ? "error_border" : ""
                          }`}
                          name="first_name"
                          {...register("first_name", { required: true })}
                        />
                        <span className="error-message">
                          {errors.firstName && "First name is required"}
                        </span>
                      </div>
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">Last Name</div>
                        <input
                          type="text"
                          className={`${
                            errors.last_name ? "error_border" : ""
                          }`}
                          name="last_name"
                          {...register("last_name", { required: true })}
                        />
                        <span className="error-message">
                          {errors.last_name && "Last name is required"}
                        </span>
                      </div>
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">Phone</div>
                        <input
                          type="text"
                          name="phone"
                          className={`${errors.phone ? "error_border" : ""}`}
                          {...register("phone", { pattern: /\d+/ })}
                        />
                        <span className="error-message">
                          {errors.phone && "Please enter number for phone."}
                        </span>
                      </div>
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">Email Address</div>
                        <input
                          //className="form-control"
                          className={`${errors.email ? "error_border" : ""}`}
                          type="text"
                          name="email"
                          {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
                        <span className="error-message">
                          {errors.email &&
                            "Please enter proper email address ."}
                        </span>
                      </div>
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Country</div>
                        <select
                          name="country"
                          {...register("country", { required: true })}
                        >
                          <option>India</option>
                          <option>South Africa</option>
                          <option>United State</option>
                          <option>Australia</option>
                        </select>
                      </div>
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Address</div>
                        <input
                          //className="form-control"
                          className={`${errors.address ? "error_border" : ""}`}
                          type="text"
                          name="address"
                          {...register("address", {
                            required: true,
                            min: 20,
                            max: 120,
                          })}
                          placeholder="Street address"
                        />
                        <span className="error-message">
                          {errors.address && "Please right your address ."}
                        </span>
                      </div>
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Town/City</div>
                        <input
                          //className="form-control"
                          type="text"
                          className={`${errors.city ? "error_border" : ""}`}
                          name="city"
                          {...register("city", { required: true })}
                          onChange={setStateFromInput}
                        />
                        <span className="error-message">
                          {errors.city && "select one city"}
                        </span>
                      </div>
                      <div className="form-group col-md-12 col-sm-6 col-xs-12">
                        <div className="field-label">State / County</div>
                        <input
                          //className="form-control"
                          type="text"
                          className={`${errors.state ? "error_border" : ""}`}
                          name="state"
                          {...register("state", { required: true })}
                          onChange={setStateFromInput}
                        />
                        <span className="error-message">
                          {errors.state && "select one state"}
                        </span>
                      </div>
                      <div className="form-group col-md-12 col-sm-6 col-xs-12">
                        <div className="field-label">Postal Code</div>
                        <input
                          //className="form-control"
                          type="text"
                          name="pincode"
                          className={`${errors.pincode ? "error_border" : ""}`}
                          {...register("pincode", { pattern: /\d+/ })}
                        />
                        <span className="error-message">
                          {errors.pincode && "Required integer"}
                        </span>
                      </div>
                      <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input
                          type="checkbox"
                          name="create_account"
                          id="account-option"
                        />
                        &ensp;{" "}
                        <label htmlFor="account-option">
                          Create An Account?
                        </label>
                      </div>
                    </div>
                  </Col>
                )}
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Product <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item, index) => (
                            <li key={index}>
                              {item.title} × {item.qty}{" "}
                              <span>
                                {symbol}
                                {item.total}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="sub-total">
                          <li>
                            Subtotal{" "}
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                          <li>
                            Shipping
                            {/* <div className="shipping">
                              <div className="shopping-option">
                                <input
                                  type="checkbox"
                                  name="free-shipping"
                                  id="free-shipping"
                                />
                                <label htmlFor="free-shipping">
                                  Free Shipping
                                </label>
                              </div>
                              <div className="shopping-option">
                                <input
                                  type="checkbox"
                                  name="local-pickup"
                                  id="local-pickup"
                                />
                                <label htmlFor="local-pickup">
                                  Local Pickup
                                </label>
                              </div>
                            </div> */}
                          </li>
                        </ul>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <div className="upper-box">
                          <div className="payment-options">
                            <ul>
                              <li>
                                <div className="radio-option stripe">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-2"
                                    defaultChecked={true}
                                    onClick={() => checkhandle("stripe")}
                                  />
                                  <label htmlFor="payment-2">Stripe</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option paypal">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-1"
                                    onClick={() => checkhandle("paypal")}
                                  />
                                  <label htmlFor="payment-1">
                                    Cash on Delievry
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {cartTotal !== 0 && (
                          <div className="text-end">
                            <button type="submit" className="btn-solid btn">
                              Place Order
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
