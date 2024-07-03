import React from "react";
import "./AdminAuthenticate.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import AuthencationHeader from "../../../components/Headers/AuthencationHeader";


function Login() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100 text-center">
      < AuthencationHeader text={'EdoSUBEB Inventory Management System'}/>
        <Col md={{ span: 6, offset: 3 }} >
          <Form action={'/AdminDashboard'}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Oracle ID or Email Address"
                className="mb-3 inputField"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-3 inputField"
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-3 inputField">
              <Form.Check type="checkbox" label="Remember me" />
              <Link to={"/"} className="text-decoration-none linkText">
                Forgot Password?
              </Link>
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100 mb-3 mt-5 button"
            >
              Login
            </Button>
            <p>
              Are you a new user?{" "}
              <Link to={"/SignUp"} className="text-decoration-none">
                Create an account
              </Link>
            </p>
          </Form>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
