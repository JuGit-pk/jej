import React from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const ProfilePage = () => {
  const { handleSubmit, register } = useForm();

  //   // mutation function
  //   const mutationFn = async (data) => {
  //     console.log({ data }, "from");
  //     try {
  //       const { login: loginResData } = await request(
  //         GRAPHQL_API_URL,
  //         LOGIN_USER,
  //         {
  //           identifier,
  //           password,
  //         }
  //       );
  //       console.log("loginResData", loginResData);
  //       return loginResData;
  //     } catch (error) {
  //       let data = JSON.stringify(error, undefined, 2); // error handling for graphql-request
  //       data = JSON.parse(data);
  //       const response = data.response;
  //       if (Array.isArray(response.errors) && response.errors.length > 0) {
  //         throw new Error(response.errors[0].message);
  //       } else {
  //         throw new Error("Error logging in");
  //       }
  //     }
  //   };

  //   const onSuccess = (data) => {
  //     toast.success("Logged in successfully");
  //     login(data);
  //   };

  //   const onError = (error) => {
  //     toast.error(error.message);
  //   };

  //   // MUTATION
  //   const mutation = useMutation({ mutationFn, onSuccess, onError });

  //   // FORM SUBMIT HANDLER

  //   const onSubmit = (data) => {
  //     if (data) {
  //       mutation.mutate(data);
  //     }
  //   };
  return (
    <>
      <section className="contact-page register-page">
        <Container>
          <Row>
            <Col sm="12">
              <h3>PERSONAL DETAIL</h3>
              <Form className="theme-form">
                <Row>
                  <Col md="6">
                    <Label className="form-label" for="name">
                      First Name
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Your name"
                      required=""
                      {...register("first_name")}
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Last Name
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      id="last-name"
                      placeholder="Email"
                      required=""
                      {...register("last_name")}
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="review">
                      Phone number
                    </Label>
                    <input
                      type="number"
                      className="form-control"
                      id="review"
                      placeholder="Enter your number"
                      required=""
                      {...register("phone_no")}
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required=""
                      {...register("email")}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contact-page register-page section-b-space">
        <Container>
          <Row>
            <Col sm="12">
              <h3>SHIPPING ADDRESS</h3>
              <Form className="theme-form">
                <Row>
                  <Col md="6">
                    <Label className="form-label" for="name">
                      flat / plot
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="home-ploat"
                      placeholder="company name"
                      required=""
                      {...register("plot_no")}
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="name">
                      Address *
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="address-two"
                      placeholder="Address"
                      required=""
                      {...register("address")}
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Zip Code *
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      id="zip-code"
                      placeholder="zip-code"
                      required=""
                      {...register("zip_code")}
                    />
                  </Col>
                  <Col md="6" className="select_input">
                    <Label className="form-label" for="review">
                      Country *
                    </Label>
                    <select className="form-select py-2" size="1">
                      <option value="India">India</option>
                      <option value="UAE">UAE</option>
                      <option value="U.K">U.K</option>
                      <option value="US">US</option>
                    </select>
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="review">
                      City *
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="City"
                      required=""
                      {...register("city")}
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="review">
                      Region/State *
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="region-state"
                      placeholder="Region/state"
                      required=""
                      {...register("plot_no")}
                    />
                  </Col>
                  <div className="col-md-12">
                    <button className="btn btn-sm btn-solid" type="submit">
                      Save setting
                    </button>
                  </div>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
