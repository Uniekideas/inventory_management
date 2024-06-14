import React, { useState } from "react";
import "./Navigation.css";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faGooglePlay,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";

function SideNavComponent() {
  return (
    <div>

    </div>
  );
}
export default SideNavComponent;

export function SideNavButton({ icon, text, toggle, hoverStyle }) {
  return (
    <div className={`sideNavButtonContainer ${hoverStyle}`}>
      <FontAwesomeIcon icon={icon} className="sideNavButtonIcon" />
      <h6 className="sideNavButtonText">{text}</h6>
      {toggle}
    </div>
  );
}

export function ButtonToggle() {
  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={isOn}
        onChange={handleToggle}
        className="sideNavButtonToggle"
      />
    </Form>
  );
}

export function SideNavAppStore() {
  return (
    <div className="sideNavDownloadAppContainer">
      <div className="sideNavDownloadApp">
        <Button variant="outline-light">
          <FontAwesomeIcon icon={faMicrosoft} />
        </Button>
        <Button variant="outline-light">
          <FontAwesomeIcon icon={faApple} />
        </Button>
        <Button variant="outline-light">
          <FontAwesomeIcon icon={faGooglePlay} />
        </Button>
      </div>
      <span className="sideNavDownloadAppText">Download the Mobile App</span>
    </div>
  );
}
