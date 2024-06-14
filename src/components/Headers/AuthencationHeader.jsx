import React from "react";
import "./Header.css";
import logo from "../../assets/logo/Logo-new2-1 1.jpg";
import { Container, Image } from "react-bootstrap";

function AuthencationHeader({text}) {
  return (
    <Container>
      <Image
        src={logo}
        alt="Logo"
        className="mb-4 authHeaderImage"
      />
      <h1 className="mb-4 welcomeText">{text}</h1>
    </Container>
  );
}

export default AuthencationHeader;
