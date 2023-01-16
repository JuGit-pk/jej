import React, { useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Form, Label, Input, Col, Button } from "reactstrap";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useForm } from "react-hook-form";
import { LOGIN_USER } from "../../gql/mutations";
import { useMutation } from "react-query";
import request from "graphql-request";
import { GRAPHQL_API_URL } from "../../config/constants";
import { toast } from "react-toastify";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  // mutation function
  const mutationFn = async (data) => {
    const { email: identifier, password } = data;

    try {
      const { login: loginResData } = await request(
        GRAPHQL_API_URL,
        LOGIN_USER,
        {
          identifier,
          password,
        }
      );
      console.log("loginResData", loginResData);
      return loginResData;
    } catch (error) {
      let data = JSON.stringify(error, undefined, 2); // error handling for graphql-request
      data = JSON.parse(data);
      const response = data.response;
      if (Array.isArray(response.errors) && response.errors.length > 0) {
        throw new Error(response.errors[0].message);
      } else {
        throw new Error("Error logging in");
      }
    }
  };

  const onSuccess = (data) => {
    toast.success("Logged in successfully");
    login(data);
  };

  const onError = (error) => {
    toast.error(error.message);
  };

  // MUTATION
  const mutation = useMutation({ mutationFn, onSuccess, onError });

  // FORM SUBMIT HANDLER

  const onSubmit = (data) => {
    if (data) {
      mutation.mutate(data);
    }
  };

  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required=""
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <Label className="form-label" for="review">
                      Password
                    </Label>
                    <input
                      type="password"
                      className="form-control"
                      id="review"
                      placeholder="Enter your password"
                      required=""
                      {...register("password", { required: true })}
                    />
                  </div>
                  <button type="submit" className="btn btn-solid">
                    Login
                  </button>
                </Form>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create A Account</h6>
                <p>
                  Sign up for a free account at our store. Registration is quick
                  and easy. It allows you to be able to order from our shop. To
                  start shopping click register.
                </p>
                <a href="/account/register" className="btn btn-solid">
                  Create an Account
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;
