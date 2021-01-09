import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";

import { registerUser } from "../../store/actions/userAuthActions";
const RegisterScreen = () => {
  const [email, setEmail] = useState("sbboyle94@gmail.com");
  const [password, setPassword] = useState("Seancal123");
  const [name, setName] = useState("sbboyle9");
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const { loading, error, isAuthenticated } = auth;
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [auth]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    console.log("You can register");
  };
  return (
    <FormContainer>
      <h1>Create Account</h1>
      {error && <Message variant="dark">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
          <Form.Label>Password</Form.Label>
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
          Already have an account? <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
