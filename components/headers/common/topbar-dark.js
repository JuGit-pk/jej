import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../../contexts/auth/AuthContext";

const TopBarDark = ({ topClass, fluid, contact }) => {
  const router = useRouter();
  const { logout, Cookies, user } = useContext(AuthContext);
  const isUser = Cookies.get("user") && user?.jwt;
  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>
                  <Link href={"/"} passHref>
                    <a>
                      Welcome to our store{" "}
                      {isUser && user && user.user.username}
                    </a>
                  </Link>
                </li>
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: {contact} {"  "}
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              {isUser && (
                <li className="mobile-wishlist">
                  <Link href="/account/wishlist">
                    <a>
                      <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                      wishlist
                    </a>
                  </Link>
                </li>
              )}
              <li
                className="onhover-dropdown mobile-account"
                onClick={() => router.push("/account/profile")}
              >
                <i className="fa fa-user" aria-hidden="true"></i>
                {isUser ? "My Account" : "Account"}
                <ul className="onhover-show-div">
                  {!isUser && (
                    <>
                      <li>
                        <Link href={`/account/login`}>
                          <a>Login</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/account/register`}>
                          <a>Register</a>
                        </Link>
                      </li>
                    </>
                  )}

                  {isUser && (
                    <li onClick={() => logout()}>
                      <a>Logout</a>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
