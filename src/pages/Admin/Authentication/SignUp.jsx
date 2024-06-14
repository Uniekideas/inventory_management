import React from "react";
import "./AdminAuthenticate.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import AuthencationHeader from "../../../components/Headers/AuthencationHeader";

function SignUp() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100 text-center">
        <AuthencationHeader
          text={"Welcome To EdoSUBEB Inventory Management System"}
        />
        <Col md={{ span: 6, offset: 3 }}>
          <Form action={'/AdminDashboard'}>
            <Form.Group controlId="formBasicEmail">
              <Row>
                <Col md={7}>
                  <Form.Select size="lg" className="mb-3 inputSeleteField">
                    <option>Role</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Admin-452X"
                    className="mb-3 inputField"
                  />
                </Col>
              </Row>
            </Form.Group>
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
                autoComplete="new-password"
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-3 inputField">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100 mb-3 mt-5 button"
            >
              Sign Up
            </Button>
            <p>
              Are you a new user?{" "}
              <Link to={"/Login"} className="text-decoration-none">
                Login to your account
              </Link>
            </p>
          </Form>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
export default SignUp;
