import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userAuthActions";
const Header = () => {
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { user, isAuthenticated } = auth;
  const logoutHandler = () => {
    console.log("Logout");
    dispatch(logoutUser());
  };
  if (isAuthenticated) {
    console.log("loggedin");
  } else {
    console.log("logged out");
  }
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to={!isAuthenticated ? "/" : "/profile"}>
              <Navbar.Brand>Mern Movies</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {!isAuthenticated ? (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link to="/login">
                        <i className="fas fa-user"></i> Sign In
                      </Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/register">
                      <Nav.Link>
                        <i className="fas fa-shopping-cart"></i> Register
                      </Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  // </LinkContainer>
                  <>
                    <button className="btn btn-primary" onClick={handleShow}>
                      Add
                    </button>
                    <NavDropdown title={user.name} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row>
            <h1>Hello</h1>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
