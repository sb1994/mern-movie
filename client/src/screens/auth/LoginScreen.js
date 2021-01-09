import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { Form, Col, Row, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { loginAuth } from "../../store/actions/userAuthActions";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { loading, error, isAuthenticated } = auth;
  useEffect(() => {
    if (isAuthenticated || isAuthenticated === undefined) {
      history.push("/profile");
    }
  }, [auth]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginAuth(email, password));
    console.log("You can login");
  };
  return (
    <FormContainer>
      <h1>SignIn</h1>
      {error && <Message variant="dark">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>password Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
