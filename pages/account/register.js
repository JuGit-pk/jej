import React, { useState, useRef, useEffect, useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Form, Label, Col, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { REGISTER_USER } from "../../gql/mutations";
import { useMutation } from "react-query";
import request from "graphql-request";
import { GRAPHQL_API_URL } from "../../config/constants";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth/AuthContext";

const Register = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  // mutation function
  const mutationFn = async (data) => {
    const { username, email, password } = data;

    try {
      const { register } = await request(GRAPHQL_API_URL, REGISTER_USER, {
        username,
        email,
        password,
      });
      return register;
    } catch (error) {
      let data = JSON.stringify(error, undefined, 2); // error handling for graphql-request
      data = JSON.parse(data);
      const response = data.response;
      if (Array.isArray(response.error) && response.error.length > 0) {
        throw new Error(response.errors[0].message);
      } else {
        throw new Error("Email or Username are already taken");
      }
    }
  };

  const onSuccess = (data) => {
    toast.success("Registered successfully");
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
    <CommonLayout parent="home" title="register">
      <section className="register-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <h3>create account</h3>
              <div className="theme-card">
                <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        Username
                      </Label>
                      <input
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="First Name"
                        required
                        {...register("username", { required: true })}
                      />
                    </Col>
                    {/* <Col md="6">
                      <Label className="form-label" for="review">
                        Last Name
                      </Label>
                      <input
                        type="text"
                        className="form-control"
                        id="lname"
                        placeholder="Last Name"
                        required
                        {...register("lastName", { required: true })}
                      />
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        email
                      </Label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required
                        {...register("email", { required: true })}
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Password
                      </Label>
                      <input
                        type="password"
                        className="form-control"
                        id="review"
                        placeholder="Enter your password"
                        required
                        {...register("password", { required: true })}
                      />
                    </Col>
                    <Col md="12">
                      <Button type="submit" className="btn btn-solid w-auto">
                        create Account
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Register;
