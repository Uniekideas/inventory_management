import React, { useContext, useEffect, useState } from "react";
import "./AdminAuthenticate.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import AuthencationHeader from "../../../components/Headers/AuthencationHeader";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const navigate = useNavigate();

  const {
    handleSigUpSubmit,
    signInIsLoading,
    sigUpResponse,
    sigUpError,
    setSigUpResponse,
    setSigUpError,
  } = useContext(AuthenticationContext);

  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!signInIsLoading && sigUpResponse) {
      navigate("/Login", {
        state: { message: "Signup successful, please login" },
      });
      setSigUpResponse(null);
    }
  }, [signInIsLoading, sigUpResponse, navigate]);

  useEffect(() => {
    if (!signInIsLoading && sigUpError) {
      handleComfirmationPopUps(sigUpError, "bg-danger");
      setButtonLoading(false);
      setSigUpError(null);
    }
  }, [signInIsLoading, sigUpError]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    if (
      signInIsLoading ||
      (!signInIsLoading && !sigUpError && !sigUpResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    if (!isValidEmail(email)) {
      handleComfirmationPopUps("Invalid email address", "bg-danger");
      return;
    }

    handleSigUpSubmit(e);
    handleLoadingClick();
  };

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
          {comfirmationAction && (
            <ComfirmationPop
              message={message}
              ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
            />
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Row>
                <Col md={7}>
                  <Form.Select
                    size="lg"
                    className="mb-3 inputSeleteField select-placeholder"
                    name="role"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Role
                    </option>
                    <option value="qa">QA</option>
                    <option value="head-teacher">HeadTeacher</option>
                    <option value="warehouse-staff">WareHouseStaff</option>
                  </Form.Select>
                </Col>
                <Col md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Admin-452X"
                    className="mb-3 inputField"
                    name=""
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="phone_number">
              <Form.Control
                type="text"
                placeholder="phone number"
                className="mb-3 inputField"
                name="phone_number"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Oracle ID or Email Address"
                className="mb-3 inputField"
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-3 inputField"
                autoComplete="new-password"
                name="password"
                required
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-3 inputField">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100 mb-3 mt-5 button rounded rounded-0"
            >
              {buttonLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <p>
              Are you a new user?{" "}
              <Link to={"/"} className="text-decoration-none">
                Login to your account
              </Link>
            </p>
          </Form>
          <Outlet />
        </Col>
      </Row>
      {/* <option value="admin">Admin</option> */}
    </Container>
  );
}

export default SignUp;
