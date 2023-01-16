import React, { Fragment, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../helpers/cart";
import { Media } from "reactstrap";
import { API_URL } from "../../../config/constants";

const CartHeader = ({ item, symbol }) => {
  const context = useContext(CartContext);
  // let item = product.attributes;

  return (
    <Fragment>
      <li>
        <div className="media">
          <Link href={"/product/" + item.slug}>
            <a>
              <Media
                alt=""
                className="me-3"
                src={`${API_URL}${item.image?.data[0].attributes.url}`}
              />
            </a>
          </Link>
          <div className="media-body">
            <Link href={"/product/" + item.slug}>
              <a>
                <h6>{item.title}</h6>
              </a>
            </Link>

            <h4>
              <span>
                {item.qty} x {symbol}{" "}
                {(item.price - (item.price * item.discount) / 100).toFixed(2)}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => context.removeFromCart(item)}
          ></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;
