import React, { useContext, useEffect, useState } from "react";
import "./AdminAuthenticate.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import AuthencationHeader from "../../../components/Headers/AuthencationHeader";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleLoginSubmit,
    loginIsLoading,
    userData,
    loginError,
    setloginError,
    isAdmin,
    isHeadTeacher,
    isWareHouser,
    isQA,
  } = useContext(AuthenticationContext);

  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!loginIsLoading && userData) {
      isQA()
        ? navigate("/QaDashboard", {
            state: { message: "Login successful!" },
          })
        : isHeadTeacher()
        ? navigate("/HeadTeacherDashboard", {
            state: { message: "Login successful!" },
          })
        : isAdmin()
        ? navigate("/AdminDashboard", {
            state: { message: "Login successful!" },
          })
        : navigate("/WareHouseDashboard", {
            state: { message: "Login successful!" },
          });
    }
  }, [loginIsLoading, userData, navigate]);

  useEffect(() => {
    if (!loginIsLoading && loginError) {
      handleComfirmationPopUps(loginError, "bg-danger");
      setButtonLoading(false);
      setloginError(null);
    }
  }, [loginIsLoading, loginError]);

  useEffect(() => {
    if (location.state?.message) {
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    if (loginIsLoading || (!loginIsLoading && !loginError && !userData)) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleSubmit = (e) => {
    handleLoginSubmit(e);
    handleLoadingClick();
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bgmodes"
    >
      <Row className="w-100 text-center">
        <AuthencationHeader text={"EdoSUBEB Inventory Management System"} />
        <Col md={{ span: 6, offset: 3 }}>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email Address / School ID"
                className="mb-3 inputField"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                className="mb-3 inputField"
                name="password"
                required
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mb-3 inputField">
              <Form.Check type="checkbox" label="Remember me" />
              <Link
                to={"/forgot-password"}
                className="text-decoration-none linkText"
              >
                Forgot Password?
              </Link>
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100 mb-3 mt-5 button rounded rounded-0"
            >
              {buttonLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              ) : (
                "Login"
              )}
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
