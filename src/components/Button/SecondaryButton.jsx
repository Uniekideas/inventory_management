import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";

function SecondaryButton() {
  return (
    <Button variant="primary" className="p-2">
      <FontAwesomeIcon icon={faTrashCan} className="px-2" />
      Delete
    </Button>
  );
}

export default SecondaryButton;
