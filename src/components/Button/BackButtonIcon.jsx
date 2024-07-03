import React from 'react'
import "./Button.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

function BackButtonIcon() {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };

  return (
    <FontAwesomeIcon
    icon={faArrowLeft}
    className="mt-3 mx-3 fs-2 fw-5 backButtonIcon"
    onClick={() => handleBack()}
  />
  )
}

export default BackButtonIcon